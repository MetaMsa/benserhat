import { redirect } from "next/navigation";
import {_Blog} from "@/Model/Blog";
import { connectDb } from "@/lib/connectDb";

export async function POST(req: Request) {
    const blogData = await req.formData();

    await connectDb();

    const blogText = new _Blog({
        title: blogData.get('title'),
        content: blogData.get('content')
    });

    await blogText.save();

    return redirect("/blog/" + process.env.URL + "/admin");
}