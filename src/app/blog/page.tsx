import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1>BLOG</h1>
      </div>
      <div className="grid grid-flow-col grid-rows-3 gap-4 border border-amber-50">
        <div className="row-span-3 border border-amber-50">1</div>
        <div className="col-span-2 border border-amber-50">2</div>
        <div className="col-span-2 border border-amber-50">3</div>
        <div className="col-span-2 border border-amber-50">4</div>
      </div>
    </div>
  );
}
