import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { FileText, Receipt, BarChart3, Settings, User, Layers, Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { requireAuth } from "~/lib/auth.server";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session, headers } = await requireAuth(request);

  return json(
    {
      user: session.user,
    },
    { headers }
  );
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Ledgerly</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard/invoices"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="h-4 w-4" />
              Invoices
            </Link>
            <Link
              to="/dashboard/expenses"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Receipt className="h-4 w-4" />
              Expenses
            </Link>
            <Link
              to="/dashboard/templates"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Layers className="h-4 w-4" />
              Templates
            </Link>
            <Link
              to="/dashboard/reports"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{user.email}</span>
            </div>
            <Form method="post" action="/logout">
              <Button variant="outline" size="sm" type="submit">
                Logout
              </Button>
            </Form>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-white md:hidden">
            <nav className="flex flex-col px-4 py-2">
              <Link
                to="/dashboard/invoices"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                Invoices
              </Link>
              <Link
                to="/dashboard/expenses"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Receipt className="h-5 w-5" />
                Expenses
              </Link>
              <Link
                to="/dashboard/templates"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Layers className="h-5 w-5" />
                Templates
              </Link>
              <Link
                to="/dashboard/reports"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart3 className="h-5 w-5" />
                Reports
              </Link>
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>

              {/* Mobile User Info & Logout */}
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center gap-2 px-3 py-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium truncate">{user.email}</span>
                </div>
                <Form method="post" action="/logout" className="px-3 py-2">
                  <Button variant="outline" size="sm" type="submit" className="w-full">
                    Logout
                  </Button>
                </Form>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
