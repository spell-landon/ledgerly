import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import { CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { FieldLabel } from "~/components/ui/field-label";
import { updatePassword } from "~/lib/auth.server";
import { createSupabaseServerClient } from "~/lib/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password - Figurely" },
    { name: "description", content: "Set a new password for your Figurely account" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // If there's a code, exchange it for a session
  if (code) {
    const { supabase, headers } = createSupabaseServerClient(request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
    }

    // Redirect without the code to clean up the URL
    return redirect("/reset-password", { headers });
  }

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return json(
      { error: "All fields are required", success: false },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return json(
      { error: "Password must be at least 6 characters", success: false },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return json(
      { error: "Passwords do not match", success: false },
      { status: 400 }
    );
  }

  const { error, headers } = await updatePassword(request, password);

  if (error) {
    return json({ error, success: false }, { status: 400, headers });
  }

  return json({ success: true, error: null }, { headers });
}

export default function ResetPassword() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigation.state === "submitting";
  const urlError = searchParams.get("error");

  if (actionData?.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Password updated</CardTitle>
            <CardDescription>
              Your password has been successfully updated. You can now log in with your new password.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Link to="/login" className="w-full">
              <Button className="w-full">
                Continue to login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
          <CardDescription>
            Enter a new password for your account.
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <CardContent className="space-y-4">
            {(actionData?.error || urlError) && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {actionData?.error || urlError}
              </div>
            )}
            <div className="space-y-2">
              <FieldLabel htmlFor="password" label="New Password" required />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                required
                minLength={6}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="confirmPassword" label="Confirm Password" required />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update password"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
