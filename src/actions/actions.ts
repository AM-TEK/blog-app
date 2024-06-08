"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const imageUrl = formData.get("imageUrl") as string;
  console.log(title, body);
  
  await prisma.post.create({
    data: {
      title,
      body,
      imageUrl,
    },
  });

  revalidatePath("/posts");
}