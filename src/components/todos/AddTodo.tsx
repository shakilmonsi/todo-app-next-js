"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  try {
    const title = formData.get("title") as string;

    if (!title || title.trim() === "") return;

    await prisma.todo.create({
      data: {
        title,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("❌ Error in addTodo:", error);
    throw new Error("Something went wrong on the server.");
  }
}
