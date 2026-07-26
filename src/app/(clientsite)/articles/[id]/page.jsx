import Image from "next/image";
import { getArticles } from "../../../../../services/getArticle";
import CommentSection from "@/components/comments/CommentSection";
import ArticleViewTracker from "@/components/viewsTracker/ArticleViewTracker";

export default async function ArticleDetails({ params }) {
  const { id } = await params;

  const article = await getArticles({ id });

  if (!article) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>

        <p className="mt-4 text-gray-500">
          The requested article does not exist.
        </p>
      </section>
    );
  }


  return (
    <section className="py-10 lg:py-16">
      <ArticleViewTracker articleId={id}/>
      <div className="mx-auto max-w-6xl px-4">
        {/* Article Info */}
        <div className="mx-auto max-w-5xl">
          {/* Banner */}
          <div className="relative mb-8 aspect-16/6 overflow-hidden rounded-xl shadow-xl">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          <div>
            {/* Category */}
            <span className="inline-flex rounded-full bg-bgprimary/10 px-4 py-2 text-sm font-medium text-bgprimary">
              {article.category.title}
            </span>

            {/* Title */}
            <h1 className="mt-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-gray-500">
              <span className="font-medium">✍️ সুমন সুবহান</span>

              <span className="hidden md:block">•</span>

              <span>
                {new Date(article.createdAt).toLocaleDateString("bn-BD", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>Views: {article.views}</span>
            </div>
          </div>
        </div>

        {/* Reading Area */}
        <article className="mx-auto mt-16 max-w-4xl rounded-3xl border border-[#e7dfcf] bg-[#f8f6f1] px-6 py-10 shadow-sm md:px-10 lg:px-16 lg:py-14">
          <div
            className="
      no-select
      book-content
      prose
      prose-lg
      max-w-none

      text-[18px]
      leading-8
      text-justify

      prose-headings:mb-8
      prose-headings:font-bold

      prose-p:mb-7
      prose-p:text-gray-800

      prose-img:mx-auto
      prose-img:rounded-xl
      prose-img:shadow-lg

      prose-blockquote:border-l-4
      prose-blockquote:border-bgprimary
      prose-blockquote:pl-6
    "
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </article>
      </div>

      <CommentSection
        contentId={article._id}
        contentType="article"
        contentTitle={article.title}
        path={`/articles/${article._id}`}
      />
    </section>
  );
}
