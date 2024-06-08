import { Suspense } from "react";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!post) {
    notFound();
  }
  
  return (
    <main className="px-7 pt-24 text-center">
      <Suspense fallback="Loading...">
        <main className="text-center pt-28 px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">{post.title}</h1>
          <p className="max-w-[700px] mx-auto leading-8 border border-neutral-700">{post.body}</p>
        </main>
      </Suspense>
    </main>
  )
}
