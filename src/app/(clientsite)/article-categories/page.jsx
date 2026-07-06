import ArticleClient from "@/components/articles/ArticleClient";
import { getArticleCategories } from "../../../../services/getArticleCategories";

export default async function ArticleCategory() {
  const categories = await getArticleCategories();

  return (
    <section className="px-4 sm:px-6 md:px-10 lg:px-14 my-8 lg:my-10">
      <div className="max-w-3xl">
        <h1 className="font-bold text-3xl md:text-4xl">
          লেখালোক
        </h1>

        <p className="mt-3 text-sm md:text-base leading-7">
          চিন্তার মানচিত্রে শব্দ যখন রেখা হয়ে ধরা দেয়...
        </p>
      </div>

      <ArticleClient categories={categories} />
    </section>
  );
}