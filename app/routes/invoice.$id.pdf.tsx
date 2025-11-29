import { type LoaderFunctionArgs } from "@remix-run/node";
import { renderToBuffer } from "@react-pdf/renderer";
import { InvoicePDF } from "~/components/InvoicePDF";
import { createSupabaseServiceClient } from "~/lib/supabase.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const supabase = createSupabaseServiceClient();
  const { id } = params;

  if (!id) {
    throw new Response("Invoice ID required", { status: 400 });
  }

  // Fetch invoice data using service role (bypasses RLS for public access)
  // Only allow access if invoice has a share_token (publicly shared)
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .not("share_token", "is", null)
    .single();

  if (error || !invoice) {
    throw new Response("Invoice not found", { status: 404 });
  }

  // Generate PDF
  const pdfBuffer = await renderToBuffer(<InvoicePDF invoice={invoice} />);

  // Return PDF as downloadable file
  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.invoice_number}.pdf"`,
    },
  });
}
