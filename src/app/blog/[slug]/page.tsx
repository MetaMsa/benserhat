import { notFound } from "next/navigation";
import { bloglogin } from "@/app/actions/auth"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLogin({ params }) {
  const resolvedParams = await params;
  const secretSlug = process.env.URL;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (resolvedParams.slug !== secretSlug) {
    return notFound();
  }

  if(token){
    redirect("/blog/" + process.env.URL + "/admin");
  }

  return (
    <div className="flex flex-col justify-center items-center my-50">
      <form action={ bloglogin }>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="input input-ghost text-center"
          name="username"
          required
        />
        <input
          type="text"
          placeholder="Şifre"
          className="input input-ghost text-center"
          name="password"
          required
        />  <br />
        <button type="submit" className="btn">
            Giriş Yap <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      </form>
    </div>
  );
}
