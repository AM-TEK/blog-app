import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PostDetails({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <main className="text-center pt-28 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">{post.title}</h1>
      <p className="max-w-[700px] mx-auto leading-8 border border-neutral-700">{post.body}</p>
      {post.imageUrl && (
        <div className="mx-auto mb-5 max-w-[700px]">
          <Image src={post.imageUrl} alt="Post Image" width={700} height={475} />
        </div>
      )}
    </main>
  );
}