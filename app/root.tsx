import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&display=swap" },
  { rel: "stylesheet", href: stylesheet },
  // Favicons
  { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return {
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Figurely" />
        {/* Open Graph / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Figurely" />
        <meta property="og:title" content="Figurely - Invoice & Expense Management Made Simple" />
        <meta property="og:description" content="Professional invoicing, expense tracking, and financial reporting for freelancers and small businesses." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Figurely - Invoice & Expense Management Made Simple" />
        <meta name="twitter:description" content="Professional invoicing, expense tracking, and financial reporting for freelancers and small businesses." />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again later.";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (error.status === 404) {
      title = "Page not found";
      message = "Sorry, we couldn't find the page you're looking for.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You need to be logged in to view this page.";
    } else if (error.status === 403) {
      title = "Forbidden";
      message = "You don't have permission to view this page.";
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-2 text-9xl font-bold text-neutral-200">{status}</h1>
        <h2 className="mb-4 text-2xl font-bold text-neutral-900">{title}</h2>
        <p className="mb-8 max-w-md text-neutral-600">{message}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Go to homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
