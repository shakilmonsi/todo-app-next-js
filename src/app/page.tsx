export const dynamic = "force-dynamic";

import AddTodo from "@/components/todos/AddTodo";
import Todo from "@/components/todos/Todo";
import { prisma } from "@/utils/prisma";

async function getData() {
  try {
    const data = await prisma.todo.findMany({
      select: { title: true, id: true, isCompleted: true },
      orderBy: { createdAt: "desc" },
    });
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-4xl font-extrabold uppercase">Todo App</span>
      <h1 className="text-5xl font-extrabold uppercase mb-5 text-center">
        <span className="lowercase">w/</span>Server Actions
      </h1>

      <div className="flex justify-center flex-col items-center">
        <AddTodo />

        <div className="flex flex-col gap-5 items-center justify-center mt-10 w-screen">
          {data.map((todo) => (
            <div className="w-full" key={todo.id}>
              <Todo todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
