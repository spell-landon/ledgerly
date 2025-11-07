import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Form, useNavigation, useActionData } from "@remix-run/react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { requireAuth } from "~/lib/auth.server";
import { formatCurrency } from "~/lib/utils";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Line Item Templates - Ledgerly" },
    { name: "description", content: "Manage your line item templates" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { session, supabase, headers } = await requireAuth(request);

  const { data: templates, error } = await supabase
    .from("line_item_templates")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading templates:", error);
  }

  return json({ templates: templates || [] }, { headers });
}

export async function action({ request }: ActionFunctionArgs) {
  const { session, supabase, headers } = await requireAuth(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  // Create new template
  if (intent === "create") {
    const templateData = {
      user_id: session.user.id,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      rate: parseFloat(formData.get("rate") as string || "0"),
      quantity: parseFloat(formData.get("quantity") as string || "1"),
    };

    const { error } = await supabase
      .from("line_item_templates")
      .insert(templateData);

    if (error) {
      return json({ error: error.message }, { status: 400, headers });
    }

    return json({ success: true, message: "Template created successfully" }, { headers });
  }

  // Update template
  if (intent === "update") {
    const id = formData.get("id") as string;
    const templateData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      rate: parseFloat(formData.get("rate") as string || "0"),
      quantity: parseFloat(formData.get("quantity") as string || "1"),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("line_item_templates")
      .update(templateData)
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      return json({ error: error.message }, { status: 400, headers });
    }

    return json({ success: true, message: "Template updated successfully" }, { headers });
  }

  // Delete template
  if (intent === "delete") {
    const id = formData.get("id") as string;

    const { error } = await supabase
      .from("line_item_templates")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      return json({ error: error.message }, { status: 400, headers });
    }

    return json({ success: true, message: "Template deleted successfully" }, { headers });
  }

  return json({ error: "Invalid action" }, { status: 400, headers });
}

export default function Templates() {
  const { templates } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className="container mx-auto space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Line Item Templates</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Save commonly used line items for quick invoice creation
          </p>
        </div>
        <Button onClick={() => setShowNewForm(!showNewForm)}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      {/* Success/Error Messages */}
      {actionData?.success && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300">
          {actionData.message}
        </div>
      )}
      {actionData?.error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {actionData.error}
        </div>
      )}

      {/* New Template Form */}
      {showNewForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Create New Template</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              <input type="hidden" name="intent" value="create" />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="new-name">Template Name *</Label>
                  <Input
                    id="new-name"
                    name="name"
                    placeholder="e.g., Consulting Services, Web Development"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="new-description">Description *</Label>
                  <Input
                    id="new-description"
                    name="description"
                    placeholder="e.g., Hourly consulting rate, Website maintenance"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-rate">Rate ($/unit) *</Label>
                  <Input
                    id="new-rate"
                    name="rate"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-quantity">Default Quantity *</Label>
                  <Input
                    id="new-quantity"
                    name="quantity"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue="1"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Creating..." : "Create Template"}
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Templates List */}
      {templates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No templates yet</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Create your first line item template to speed up invoice creation
            </p>
            <Button className="mt-4" onClick={() => setShowNewForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id}>
              {editingId === template.id ? (
                // Edit Form
                <Form method="post">
                  <input type="hidden" name="intent" value="update" />
                  <input type="hidden" name="id" value={template.id} />
                  <CardHeader>
                    <CardTitle className="text-base">Edit Template</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor={`name-${template.id}`} className="text-xs">Name</Label>
                      <Input
                        id={`name-${template.id}`}
                        name="name"
                        defaultValue={template.name}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`description-${template.id}`} className="text-xs">Description</Label>
                      <Input
                        id={`description-${template.id}`}
                        name="description"
                        defaultValue={template.description}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor={`rate-${template.id}`} className="text-xs">Rate</Label>
                        <Input
                          id={`rate-${template.id}`}
                          name="rate"
                          type="number"
                          step="0.01"
                          defaultValue={template.rate}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`quantity-${template.id}`} className="text-xs">Quantity</Label>
                        <Input
                          id={`quantity-${template.id}`}
                          name="quantity"
                          type="number"
                          step="0.01"
                          defaultValue={template.quantity}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        type="submit"
                        size="sm"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        <Save className="mr-1 h-3 w-3" />
                        Save
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Form>
              ) : (
                // View Mode
                <>
                  <CardHeader>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="font-semibold">${formatCurrency(parseFloat(template.rate))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span className="font-semibold">{parseFloat(template.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-bold text-primary">
                        ${formatCurrency((parseFloat(template.rate) * parseFloat(template.quantity)))}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setEditingId(template.id)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Form method="post" className="flex-1">
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="id" value={template.id} />
                        <Button
                          type="submit"
                          size="sm"
                          variant="outline"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </Form>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
