import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { ArrowLeft, Phone, Smartphone } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { FieldLabel } from "~/components/ui/field-label";
import { getSession, signInWithPhone, verifyPhoneOtp } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign in with Phone - Figurely" },
    { name: "description", content: "Sign in to Figurely with your phone number" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getSession(request);

  if (session) {
    return redirect("/dashboard");
  }

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;
  const phone = formData.get("phone") as string;

  if (intent === "send-otp") {
    if (!phone) {
      return json(
        { error: "Phone number is required", step: "phone" },
        { status: 400 }
      );
    }

    const { error, headers } = await signInWithPhone(request, phone);

    if (error) {
      return json({ error, step: "phone" }, { status: 400, headers });
    }

    return json({ step: "verify", phone }, { headers });
  }

  if (intent === "verify-otp") {
    const token = formData.get("token") as string;

    if (!phone || !token) {
      return json(
        { error: "Phone and verification code are required", step: "verify", phone },
        { status: 400 }
      );
    }

    const { error, headers } = await verifyPhoneOtp(request, phone, token);

    if (error) {
      return json({ error, step: "verify", phone }, { status: 400, headers });
    }

    return redirect("/dashboard", { headers });
  }

  return json({ error: "Invalid action", step: "phone" }, { status: 400 });
}

export default function LoginPhone() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [phone, setPhone] = useState(actionData?.phone || "");

  const step = actionData?.step || "phone";

  if (step === "verify") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl font-bold">Enter verification code</CardTitle>
            <CardDescription className="text-center">
              We sent a 6-digit code to {actionData?.phone || phone}
            </CardDescription>
          </CardHeader>
          <Form method="post">
            <input type="hidden" name="phone" value={actionData?.phone || phone} />
            <input type="hidden" name="intent" value="verify-otp" />
            <CardContent className="space-y-4">
              {actionData?.error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {actionData.error}
                </div>
              )}
              <div className="space-y-2">
                <FieldLabel htmlFor="token" label="Verification Code" required />
                <Input
                  id="token"
                  name="token"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="000000"
                  required
                  disabled={isSubmitting}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
              <Form method="post" className="w-full">
                <input type="hidden" name="phone" value={actionData?.phone || phone} />
                <input type="hidden" name="intent" value="send-otp" />
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Resend code
                </Button>
              </Form>
            </CardFooter>
          </Form>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">Sign in with phone</CardTitle>
          <CardDescription className="text-center">
            Enter your phone number and we'll send you a verification code.
          </CardDescription>
        </CardHeader>
        <Form method="post">
          <input type="hidden" name="intent" value="send-otp" />
          <CardContent className="space-y-4">
            {actionData?.error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {actionData.error}
              </div>
            )}
            <div className="space-y-2">
              <FieldLabel htmlFor="phone" label="Phone Number" required />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                required
                disabled={isSubmitting}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Include country code (e.g., +1 for US)
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending code..." : "Send verification code"}
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Sign in with email
              </Button>
            </Link>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
