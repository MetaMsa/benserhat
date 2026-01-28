import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import Form from "./form";

const SECRET_KEY = process.env.JWT_SECRET;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: "Admin Paneli",
    alternates: {
      canonical: `https://benserhat.com/${slug}/admin`,
    },
  };
}

export default async function Admin() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) {
    redirect("/blog/" + process.env.URL);
  }

  try {
    jwt.verify(token, SECRET_KEY!);

    return (
      <Form></Form>
    );
  } catch {
    redirect("/blog/" + process.env.URL);
  }
}
