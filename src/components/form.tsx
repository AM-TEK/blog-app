// import { createPost } from "@/actions/actions";
// import React from "react";

// export default function Form() {
//   return (
//     <form
//       action={createPost}
//       className="flex flex-col max-w-[400px] mx-auto gap-2 my-10 text-stone-400"
//     >
//       <input
//         type="text"
//         name="title"
//         placeholder="Title for new post"
//         className="border rounded px-3 h-10 text-stone-600"
//         required
//       />
//       <textarea
//         name="body"
//         placeholder="Body content for new post"
//         className="border rounded px-3 py-2 text-stone-600"
//         rows={6}
//         required
//       />
//       {/* <input
//         type="string"
//         name="imageUrl"
//         placeholder="Image URL for new post"
//         accept="image/*"
//         className="border rounded px-3 h-10 text-stone-600"
//       /> */}
//       <button className="h-10 bg-blue-500 px-5 rounded text-white">
//         Submit
//       </button>
//     </form>
//   );
// }
"use client"
import { useRouter } from 'next/navigation';
import { createPost } from "@/actions/actions";
import React, { useState } from "react";

export default function Form() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    await createPost(formData);

    setIsSubmitting(false);
    router.push('/posts');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[400px] mx-auto gap-2 my-10 text-stone-400"
    >
      <input
        type="text"
        name="title"
        placeholder="Title for new post"
        className="border rounded px-3 h-10 text-stone-600"
        required
      />
      <textarea
        name="body"
        placeholder="Body content for new post"
        className="border rounded px-3 py-2 text-stone-600"
        rows={6}
        required
      />
      <button
        type="submit"
        className="h-10 bg-blue-500 px-5 rounded text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

