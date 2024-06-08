"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs/promises";

export async function createPost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const file = formData.get("file") as File;

  let image = null;
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    image = Buffer.from(arrayBuffer);
  }
  
  await prisma.post.create({
    data: {
      title,
      body,
      imageUrl,
      image,
    },
  });

  revalidatePath("/posts");
}

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await fs.writeFile(`./public/uploads/${file.name}`, buffer);

  revalidatePath("/");
}