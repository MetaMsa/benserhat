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

  return (
    <div className="flex flex-col justify-center items-center my-50">
      <form action="">
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="input input-ghost text-center"
        />
        <input
          type="text"
          placeholder="Şifre"
          className="input input-ghost text-center"
        />  <br />
        <button type="submit" className="btn">
            Giriş Yap <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      </form>
    </div>
  );
}
