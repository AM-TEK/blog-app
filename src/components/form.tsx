"use client"
import { createPost } from "@/actions/actions";
import React, { useState } from "react";

export default function Form() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert the image data to base64
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    await createPost(formData);
  };

  return (
    <form
      action={createPost}
      className="flex flex-col max-w-[400px] mx-auto gap-2 my-10 text-stone-400"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Title for new post"
        className="border rounded px-3 h-10 text-stone-600"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        name="body"
        placeholder="Body content for new post"
        className="border rounded px-3 py-2 text-stone-600"
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <input
        type="file"
        name="imageUrl"
        accept="image/*"
        className="border rounded px-3 h-10 text-stone-600"
        onChange={handleFileChange}
      />
      <button className="h-10 bg-blue-500 px-5 rounded text-white">
        Submit
      </button>
    </form>
  );
}