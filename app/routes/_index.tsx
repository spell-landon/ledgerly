import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FileText, Receipt, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Ledgerly - Invoice & Expense Management" },
    { name: "description", content: "Create invoices, track expenses, and generate reports with Ledgerly." },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ledgerly</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-20">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Invoice & Expense Management{" "}
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Create professional invoices, track expenses, and generate reports
            all in one place. Perfect for freelancers and small businesses.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything you need to manage your finances
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <FileText className="mb-2 h-12 w-12 text-primary" />
                <CardTitle>Professional Invoices</CardTitle>
                <CardDescription>
                  Create and send beautiful, professional invoices in minutes.
                  Track payment status and send reminders.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Receipt className="mb-2 h-12 w-12 text-primary" />
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>
                  Upload receipts and track expenses effortlessly. Categorize
                  spending and stay organized.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="mb-2 h-12 w-12 text-primary" />
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>
                  Generate detailed reports to understand your business
                  finances. Export to PDF or Excel.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why choose Ledgerly?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Easy to use</h3>
                  <p className="text-muted-foreground">
                    Intuitive interface designed for non-accountants
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Secure & reliable</h3>
                  <p className="text-muted-foreground">
                    Your data is encrypted and backed up automatically
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Always accessible</h3>
                  <p className="text-muted-foreground">
                    Access your invoices and expenses from anywhere
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">No subscription required</h3>
                  <p className="text-muted-foreground">
                    Pay only for what you need, when you need it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-20 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-lg">
            Join hundreds of businesses managing their finances with Ledgerly
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2024 Ledgerly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
