import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <div className="flex m-auto my-30 w-52 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-gray-900 skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-900 skeleton h-4 w-20"></div>
          <div className="bg-gray-900 skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton bg-gray-900 h-32 w-full">
        <p className="my-12">Yapım Aşamasında ...</p>
      </div>
    </div>
  );
}
