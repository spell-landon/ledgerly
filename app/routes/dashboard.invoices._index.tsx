import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Plus, Search, Eye, Edit, Printer } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { requireAuth } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Invoices - Ledgerly" },
    { name: "description", content: "Manage your invoices" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { session, supabase, headers } = await requireAuth(request);

  const { data: invoices, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load invoices");
  }

  return json({ invoices: invoices || [] }, { headers });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return <Badge variant="success">Paid</Badge>;
    case "sent":
      return <Badge variant="default">Sent</Badge>;
    case "draft":
      return <Badge variant="secondary">Draft</Badge>;
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function InvoicesIndex() {
  const { invoices } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            Create and manage your invoices
          </p>
        </div>
        <Link to="/dashboard/invoices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">All Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      {invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No invoices yet</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Get started by creating your first invoice
            </p>
            <Link to="/dashboard/invoices/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="flex flex-col gap-4 md:hidden">
            {invoices.map((invoice) => (
              <Link
                key={invoice.id}
                to={`/dashboard/invoices/${invoice.id}`}
                className="block"
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-lg text-primary">
                          {invoice.invoice_number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.bill_to_name || "No client"}
                        </p>
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="text-lg font-bold">${invoice.total.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm">{new Date(invoice.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/dashboard/invoices/${invoice.id}`;
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/dashboard/invoices/${invoice.id}/edit`;
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(`/dashboard/invoices/${invoice.id}/pdf`, '_blank');
                        }}
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Desktop Table View */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <Link
                            to={`/dashboard/invoices/${invoice.id}`}
                            className="font-medium text-primary hover:underline"
                          >
                            {invoice.invoice_number}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {invoice.bill_to_name || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          ${invoice.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/dashboard/invoices/${invoice.id}`}>
                              <Button variant="ghost" size="icon" title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/dashboard/invoices/${invoice.id}/edit`}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/dashboard/invoices/${invoice.id}/pdf`} target="_blank" reloadDocument>
                              <Button variant="ghost" size="icon" title="Download PDF">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
