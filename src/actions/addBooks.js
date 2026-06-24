"use server";

import { getDb } from "@/lib/db";

export async function addBook(bookData){
    const db = await getDb();

    const result = await db.collection("books").insertOne(bookData);

    return {
        success: true,
        insertedId: result.insertedId.toString(),
    };
}