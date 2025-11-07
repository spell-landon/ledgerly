import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Plus, Search, Eye, Trash2, Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { requireAuth } from "~/lib/auth.server";
import { formatCurrency } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Expenses - Ledgerly" },
    { name: "description", content: "Manage your expenses" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { session, supabase, headers } = await requireAuth(request);

  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false });

  if (error) {
    throw new Error("Failed to load expenses");
  }

  return json({ expenses: expenses || [] }, { headers });
}

function getCategoryBadge(category: string) {
  const colors: Record<string, string> = {
    travel: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    meals: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    office: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    equipment: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    software: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  const color = colors[category?.toLowerCase()] || colors.other;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>
      {category || "Other"}
    </span>
  );
}

export default function ExpensesIndex() {
  const { expenses } = useLoaderData<typeof loader>();

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

  return (
    <div className="container mx-auto space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Expenses</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Track and manage your business expenses
          </p>
        </div>
        <Link to="/dashboard/expenses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Expense
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm font-medium text-muted-foreground">Total Expenses</div>
            <div className="text-2xl font-bold md:text-3xl">${formatCurrency(totalExpenses)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm font-medium text-muted-foreground">This Month</div>
            <div className="text-2xl font-bold md:text-3xl">
              ${formatCurrency(expenses
                .filter(e => {
                  const expenseDate = new Date(e.date);
                  const now = new Date();
                  return expenseDate.getMonth() === now.getMonth() &&
                         expenseDate.getFullYear() === now.getFullYear();
                })
                .reduce((sum, e) => sum + (e.amount || 0), 0))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="text-sm font-medium text-muted-foreground">Total Count</div>
            <div className="text-2xl font-bold md:text-3xl">{expenses.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 md:pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="w-full md:w-auto">All Categories</Button>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      {expenses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No expenses yet</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Get started by tracking your first expense
            </p>
            <Link to="/dashboard/expenses/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium md:px-6 md:text-sm">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium md:px-6 md:text-sm">
                      Description
                    </th>
                    <th className="hidden px-6 py-3 text-left text-sm font-medium md:table-cell">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium md:px-6 md:text-sm">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium md:px-6 md:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="transition-colors hover:bg-muted/50"
                    >
                      <td className="px-4 py-3 text-xs md:px-6 md:py-4 md:text-sm">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <Link
                          to={`/dashboard/expenses/${expense.id}`}
                          className="text-xs font-medium text-primary hover:underline md:text-sm"
                        >
                          {expense.description}
                        </Link>
                        <div className="mt-1 md:hidden">
                          {getCategoryBadge(expense.category)}
                        </div>
                      </td>
                      <td className="hidden px-6 py-4 md:table-cell">
                        {getCategoryBadge(expense.category)}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium md:px-6 md:py-4 md:text-sm">
                        ${formatCurrency(expense.amount)}
                      </td>
                      <td className="px-4 py-3 text-right md:px-6 md:py-4">
                        <div className="flex items-center justify-end gap-1 md:gap-2">
                          <Link to={`/dashboard/expenses/${expense.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </Link>
                          {expense.receipt_url && (
                            <a href={expense.receipt_url} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
