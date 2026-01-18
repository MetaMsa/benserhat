'use server';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function bloglogin(formData: FormData) {
    if(formData.get('username') == process.env.USER_NAME && formData.get('password') == process.env.PASSWORD)
    {
        const cookieStore = await cookies();
        const username = formData.get('username');

        const token = jwt.sign({username}, SECRET_KEY!, {expiresIn: "1h"});

        cookieStore.set({
            name: 'token',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge:60*60,
            secure:process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        redirect("/blog" + "/" + process.env.URL + "/admin");
    }
    else
    {
    redirect("/blog" + "/" + process.env.URL + "?status=error");
    }
}
export async function bloglogout() {
    (await cookies()).delete("token");
    redirect("/blog/" + process.env.URL);
}
