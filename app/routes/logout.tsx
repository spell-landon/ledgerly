import { type ActionFunctionArgs } from "@remix-run/node";
import { signOut } from "~/lib/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return await signOut(request);
}

export async function loader() {
  return await signOut(new Request("http://localhost"));
}
