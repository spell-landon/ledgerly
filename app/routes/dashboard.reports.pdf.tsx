import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { renderToBuffer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { requireAuth } from "~/lib/auth.server";
import { formatDate } from "~/lib/utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    borderBottom: "1 solid #ccc",
    paddingBottom: 5,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  summaryBox: {
    width: "50%",
    paddingVertical: 8,
    paddingRight: 10,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottom: "1 solid #eee",
  },
  tableFooter: {
    flexDirection: "row",
    paddingVertical: 6,
    borderTop: "2 solid #000",
    marginTop: 5,
  },
  colMonth: {
    width: "40%",
    fontSize: 10,
  },
  colNumber: {
    width: "20%",
    fontSize: 10,
    textAlign: "right",
  },
  colHeaderMonth: {
    width: "40%",
    fontSize: 10,
    fontWeight: "bold",
  },
  colHeaderNumber: {
    width: "20%",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 3,
  },
  rowLabel: {
    fontSize: 11,
    color: "#333",
  },
  rowValue: {
    fontSize: 11,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#999",
    fontSize: 9,
    borderTop: "1 solid #ccc",
    paddingTop: 10,
  },
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    advertising: "Advertising",
    bank_fees: "Bank Fees",
    contract_labor: "Contract Labor",
    education: "Education & Training",
    equipment: "Equipment",
    insurance: "Insurance",
    meals: "Meals",
    office_supplies: "Office Supplies",
    professional_services: "Professional Services",
    rent: "Rent",
    software: "Software",
    supplies: "Supplies",
    taxes: "Taxes",
    travel: "Travel",
    utilities: "Utilities",
    other: "Other",
  };
  return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
}

function formatPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    check: "Check",
    cash: "Cash",
    direct_deposit: "Direct Deposit",
    paypal: "PayPal",
    venmo: "Venmo",
    zelle: "Zelle",
    wire_transfer: "Wire Transfer",
    other: "Other",
    unknown: "Unknown",
  };
  return methodMap[method] || method;
}

interface ReportData {
  stats: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    totalPending: number;
    invoiceCount: number;
    expenseCount: number;
  };
  invoicesByStatus: {
    draft: number;
    sent: number;
    paid: number;
    overdue: number;
  };
  expensesByCategory: Record<string, { count: number; total: number }>;
  paymentMethods: Record<string, { count: number; total: number }>;
  monthlyData: Array<{ month: string; income: number; expenses: number; profit: number }>;
  startDate: string;
  endDate: string;
}

function ReportsPDF({ data }: { data: ReportData }) {
  const { stats, invoicesByStatus, expensesByCategory, paymentMethods, monthlyData, startDate, endDate } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Financial Report</Text>
          <Text style={styles.subtitle}>
            Period: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </Text>
          <Text style={styles.subtitle}>
            Generated: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Summary Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total Income</Text>
              <Text style={[styles.summaryValue, { color: "#059669" }]}>${formatCurrency(stats.totalIncome)}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Total Expenses</Text>
              <Text style={[styles.summaryValue, { color: "#DC2626" }]}>${formatCurrency(stats.totalExpenses)}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Net Profit</Text>
              <Text style={[styles.summaryValue, { color: stats.netProfit >= 0 ? "#059669" : "#DC2626" }]}>
                ${formatCurrency(stats.netProfit)}
              </Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>Pending (Unpaid)</Text>
              <Text style={[styles.summaryValue, { color: "#EA580C" }]}>${formatCurrency(stats.totalPending)}</Text>
            </View>
          </View>
        </View>

        {/* Monthly Breakdown */}
        {monthlyData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.colHeaderMonth}>Month</Text>
                <Text style={styles.colHeaderNumber}>Income</Text>
                <Text style={styles.colHeaderNumber}>Expenses</Text>
                <Text style={styles.colHeaderNumber}>Profit</Text>
              </View>
              {monthlyData.map((month) => (
                <View key={month.month} style={styles.tableRow}>
                  <Text style={styles.colMonth}>{month.month}</Text>
                  <Text style={styles.colNumber}>${formatCurrency(month.income)}</Text>
                  <Text style={styles.colNumber}>${formatCurrency(month.expenses)}</Text>
                  <Text style={[styles.colNumber, { color: month.profit >= 0 ? "#059669" : "#DC2626" }]}>
                    ${formatCurrency(month.profit)}
                  </Text>
                </View>
              ))}
              <View style={styles.tableFooter}>
                <Text style={[styles.colMonth, { fontWeight: "bold" }]}>Total</Text>
                <Text style={[styles.colNumber, { fontWeight: "bold" }]}>${formatCurrency(stats.totalIncome)}</Text>
                <Text style={[styles.colNumber, { fontWeight: "bold" }]}>${formatCurrency(stats.totalExpenses)}</Text>
                <Text style={[styles.colNumber, { fontWeight: "bold", color: stats.netProfit >= 0 ? "#059669" : "#DC2626" }]}>
                  ${formatCurrency(stats.netProfit)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Invoice Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Status</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Paid ({invoicesByStatus.paid})</Text>
            <Text style={[styles.rowValue, { color: "#059669" }]}>Completed</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Sent ({invoicesByStatus.sent})</Text>
            <Text style={[styles.rowValue, { color: "#2563EB" }]}>Awaiting Payment</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Draft ({invoicesByStatus.draft})</Text>
            <Text style={[styles.rowValue, { color: "#6B7280" }]}>Not Sent</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Overdue ({invoicesByStatus.overdue})</Text>
            <Text style={[styles.rowValue, { color: "#DC2626" }]}>Past Due</Text>
          </View>
        </View>

        {/* Expense Categories */}
        {Object.keys(expensesByCategory).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expense Categories</Text>
            {Object.entries(expensesByCategory)
              .sort((a, b) => b[1].total - a[1].total)
              .slice(0, 10)
              .map(([category, data]) => (
                <View key={category} style={styles.row}>
                  <Text style={styles.rowLabel}>{formatCategory(category)} ({data.count})</Text>
                  <Text style={styles.rowValue}>${formatCurrency(data.total)}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Payment Methods */}
        {Object.keys(paymentMethods).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            {Object.entries(paymentMethods)
              .sort((a, b) => b[1].total - a[1].total)
              .map(([method, data]) => (
                <View key={method} style={styles.row}>
                  <Text style={styles.rowLabel}>{formatPaymentMethod(method)} ({data.count})</Text>
                  <Text style={styles.rowValue}>${formatCurrency(data.total)}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by Figurely - Financial Report</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { session, supabase, headers } = await requireAuth(request);

    const url = new URL(request.url);
    const startDate = url.searchParams.get("startDate") || new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
    const endDate = url.searchParams.get("endDate") || new Date().toISOString().split('T')[0];

    // Fetch all data in date range
    const [invoicesResult, expensesResult] = await Promise.all([
      supabase
        .from("invoices")
        .select("*")
        .eq("user_id", session.user.id)
        .gte("date", startDate)
        .lte("date", endDate)
        .order("date", { ascending: true }),
      supabase
        .from("expenses")
        .select("*")
        .eq("user_id", session.user.id)
        .gte("date", startDate)
        .lte("date", endDate)
        .order("date", { ascending: true }),
    ]);

    const invoices = invoicesResult.data || [];
    const expenses = expensesResult.data || [];

    // Calculate invoice stats by status
    const invoicesByStatus = {
      draft: invoices.filter((inv) => inv.status === "draft").length,
      sent: invoices.filter((inv) => inv.status === "sent").length,
      paid: invoices.filter((inv) => inv.status === "paid").length,
      overdue: invoices.filter((inv) => inv.status === "overdue").length,
    };

    // Calculate expense stats by category
    const expensesByCategory: Record<string, { count: number; total: number }> = {};
    expenses.forEach((exp) => {
      const category = exp.category || "other";
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = { count: 0, total: 0 };
      }
      expensesByCategory[category].count++;
      expensesByCategory[category].total += exp.total;
    });

    // Calculate payment method breakdown
    const paymentMethods: Record<string, { count: number; total: number }> = {};
    invoices
      .filter((inv) => inv.status === "paid" && inv.payment_method)
      .forEach((inv) => {
        const method = inv.payment_method || "unknown";
        if (!paymentMethods[method]) {
          paymentMethods[method] = { count: 0, total: 0 };
        }
        paymentMethods[method].count++;
        paymentMethods[method].total += inv.total;
      });

    // Calculate monthly breakdown
    const monthlyData: Record<string, { income: number; expenses: number }> = {};

    invoices.forEach((inv) => {
      if (inv.status === "paid") {
        const date = new Date(inv.date);
        const month = date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        if (!monthlyData[month]) {
          monthlyData[month] = { income: 0, expenses: 0 };
        }
        monthlyData[month].income += inv.total;
      }
    });

    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const month = date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }
      monthlyData[month].expenses += exp.total;
    });

    // Calculate totals
    const totalIncome = invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.total, 0);

    const totalPending = invoices
      .filter((inv) => inv.status !== "paid")
      .reduce((sum, inv) => sum + inv.total, 0);

    const data: ReportData = {
      stats: {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        totalPending,
        invoiceCount: invoices.length,
        expenseCount: expenses.length,
      },
      invoicesByStatus,
      expensesByCategory,
      paymentMethods,
      monthlyData: Object.entries(monthlyData).map(([month, d]) => ({
        month,
        income: d.income,
        expenses: d.expenses,
        profit: d.income - d.expenses,
      })),
      startDate,
      endDate,
    };

    // Generate PDF
    const pdfBuffer = await renderToBuffer(<ReportsPDF data={data} />);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="financial-report-${startDate}-to-${endDate}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Reports PDF Error:", error);
    return json(
      { error: error instanceof Error ? error.message : "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
