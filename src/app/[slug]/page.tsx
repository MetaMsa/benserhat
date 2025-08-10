import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function AdminLogin({ params }: PageProps) {
  const resolvedParams = await params;  

  const secretSlug = process.env.URL;

  if (resolvedParams.slug !== secretSlug) {
    return notFound();
  }

  return <div>Admin Paneline Hoşgeldin</div>;
}