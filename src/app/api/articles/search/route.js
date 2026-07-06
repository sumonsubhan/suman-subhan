import { searchArticles } from "../../../../../services/searchArticles";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get("q") || "";

  const articles = await searchArticles(keyword);

  return Response.json(articles);
}