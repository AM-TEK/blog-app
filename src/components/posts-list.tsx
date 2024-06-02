import prisma from "@/lib/db";
import Link from "next/link";

export default async function PostsList() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = await prisma.post.findMany();

  return (
    <ul className="flex flex-col items-center">
      {posts.map((post) => (
        <li key={post.id} className="mb-3 border border-neutral-700 rounded p-2 max-w-xs w-full">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}