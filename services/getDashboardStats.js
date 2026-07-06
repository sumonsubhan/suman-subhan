
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function getDashboardStats() {

  await requireAdmin();
  const db = await getDb();

  const [
    totalBooks,
    totalArticles,
    totalSongs,
    totalPoems,
    totalEvents,
    totalPhotos,
    trendingBooks
  ] = await Promise.all([
    db.collection("books").estimatedDocumentCount(),
    db.collection("articles").estimatedDocumentCount(),
    db.collection("songs").estimatedDocumentCount(),
    db.collection("poems").estimatedDocumentCount(),
    db.collection("events").estimatedDocumentCount(),
    db.collection("photos").estimatedDocumentCount(),
    db.collection("trendingBooks").estimatedDocumentCount(),
  ]);

  return {
    totalBooks,
    totalArticles,
    totalSongs,
    totalPoems,
    totalEvents,
    totalPhotos,
    trendingBooks,
  };
}
