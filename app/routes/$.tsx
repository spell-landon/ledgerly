import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Page Not Found - Figurely" },
    { name: "description", content: "The page you're looking for doesn't exist." },
  ];
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-2 text-9xl font-bold text-neutral-200">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-neutral-900">Page not found</h2>
        <p className="mb-8 max-w-md text-neutral-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Go to homepage
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
