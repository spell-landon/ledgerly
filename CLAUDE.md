# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Run TypeScript type checking
npm run typecheck
```

## Tech Stack

- **Framework**: Remix v2 (React Router) with Vite
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with shadcn/ui and Aceternity UI components
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Auth**: Supabase Auth with SSR
- **Email**: Resend for invoice emails
- **PDF Generation**: @react-pdf/renderer
- **File Storage**: Supabase Storage (for receipts and logos)

## Architecture Overview

### Authentication & Session Management

**Server-Side**:
- `app/lib/auth.server.ts`: Contains authentication utilities (`requireAuth`, `getSession`, `signUp`, `signIn`, `signOut`)
- `app/lib/supabase.server.ts`: Creates server-side Supabase clients using SSR package
  - `createSupabaseServerClient()`: Returns user-scoped client with RLS (respects cookies)
  - `createSupabaseServiceClient()`: Returns service role client that bypasses RLS (for public invoice access)

**Client-Side**:
- `app/lib/supabase.client.ts`: Browser client singleton accessed via `getSupabaseBrowserClient()`
- Environment variables are exposed to the browser via `window.ENV` object in root.tsx

**Important**: Always return headers from auth functions to persist session cookies. The pattern is:
```typescript
const { session, supabase, headers } = await requireAuth(request);
return json(data, { headers });
```

### Route Structure

Remix uses file-based routing in `app/routes/`:
- `dashboard.tsx`: Layout route with sidebar navigation (renders `<Outlet />` for nested routes)
- `dashboard._index.tsx`: Dashboard home (the underscore creates an index route)
- `dashboard.invoices.$id.tsx`: Dynamic route for viewing an invoice
- `dashboard.invoices.$id_.edit.tsx`: Editing route (underscore after `$id_` prevents layout nesting)
- `invoice.$id.tsx`: Public invoice view (outside dashboard, no auth required)

### Database Architecture

**Type Safety**: All database types are defined in `app/lib/database.types.ts` (TypeScript types for Supabase tables)

**Core Tables**:
- `profiles`: User profiles (extends auth.users)
- `business_settings`: Business info, logo, default invoice notes (one per user)
- `invoices`: Invoice data with status tracking, line items stored as JSONB
- `expenses`: Expense tracking with categories and receipt URLs
- `line_item_templates`: Reusable line items for quick invoice creation
- `clients`: Client contact information
- `mileage`: Mileage tracking for tax purposes
- `household_settings`: Household expense tracking settings

**Row Level Security (RLS)**: All tables have RLS policies that scope data to `auth.uid()`. Users can only access their own data.

**Migrations**: SQL migration files are in `supabase-migrations/`. Apply them in Supabase SQL Editor in numerical order (003, 004, 005, 006).

### Key Patterns

**Invoice Sharing**: Invoices have a `share_token` field for public access. Public routes use the service role client to bypass RLS.

**PDF Generation**: PDFs are generated using @react-pdf/renderer in dedicated `.pdf.tsx` route files. These routes return a Response with `application/pdf` content type.

**Email**: The `app/lib/email.server.ts` module sends invoice emails via Resend with HTML templates.

**File Uploads**: Receipt images and business logos are stored in Supabase Storage buckets (`receipts` and `logos`).

**Pagination & Search**: Utility functions in `app/lib/pagination.ts` and `app/lib/search.ts` handle list views with filtering.

### UI Components

- Located in `app/components/ui/`
- Built with shadcn/ui primitives (Radix UI + Tailwind)
- Custom components: `animated-counter.tsx`, `field-label.tsx`
- Sidebar navigation uses Aceternity UI's sidebar component with responsive mobile menu

### Path Aliases

The project uses `~/*` alias for `./app/*` (configured in tsconfig.json and vite-tsconfig-paths plugin).

Example:
```typescript
import { Button } from '~/components/ui/button';
import { requireAuth } from '~/lib/auth.server';
```

## Common Patterns

### Protected Route Loader
```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const { session, supabase, headers } = await requireAuth(request);

  // Query data using supabase client
  const { data } = await supabase.from('invoices').select('*');

  return json({ data }, { headers });
}
```

### Form Action with Validation
```typescript
export async function action({ request }: ActionFunctionArgs) {
  const { session, supabase, headers } = await requireAuth(request);
  const formData = await request.formData();

  // Process form data
  const result = await supabase.from('table').insert(data);

  return redirect('/success', { headers });
}
```

### Public Invoice Access
For routes that need to access invoices without authentication, use `createSupabaseServiceClient()` instead of `requireAuth()`.

## Environment Variables

Required environment variables (see `.env.example`):
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key (public)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (bypasses RLS, keep secret)
- `RESEND_API_KEY`: Resend API key for sending emails
- `RESEND_FROM_EMAIL`: Verified sender email (use `onboarding@resend.dev` for testing)

## Database Setup

Follow the comprehensive instructions in `SUPABASE_SETUP.md` for:
1. Creating database tables and enabling RLS
2. Setting up storage buckets for receipts and logos
3. Running migration files
4. Configuring authentication providers

## Deployment

The app is configured for Vercel deployment. Environment variables must be set in the Vercel dashboard. See README.md for detailed deployment instructions.
