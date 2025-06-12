"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

// ✅ Create Todo
export async function createTodo(formData: FormData) {
  try {
    const input = formData.get("input") as string;

    if (!input || !input.trim()) {
      console.warn("⚠️ Empty input submitted.");
      return;
    }

    await prisma.todo.create({
      data: {
        title: input,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("❌ Error in createTodo:", error);
    throw new Error("Failed to create todo");
  }
}

// ✅ Change Status
export async function changeStatus(formData: FormData) {
  try {
    const inputId = formData.get("inputId") as string;

    const todo = await prisma.todo.findUnique({
      where: { id: inputId },
    });

    const updateStatus = !todo?.isCompleted;

    await prisma.todo.update({
      where: { id: inputId },
      data: { isCompleted: updateStatus },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("❌ Error in changeStatus:", error);
    throw new Error("Failed to change status");
  }
}

// ✅ Edit Todo
export async function editTodo(formData: FormData) {
  try {
    const newTitle = formData.get("newTitle") as string;
    const inputId = formData.get("inputId") as string;

    await prisma.todo.update({
      where: { id: inputId },
      data: { title: newTitle },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("❌ Error in editTodo:", error);
    throw new Error("Failed to edit todo");
  }
}

// ✅ Delete Todo
export async function deleteTodo(formData: FormData) {
  try {
    const inputId = formData.get("inputId") as string;

    await prisma.todo.delete({
      where: { id: inputId },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("❌ Error in deleteTodo:", error);
    throw new Error("Failed to delete todo");
  }
}
