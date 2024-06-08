
"use client";
import { useRef } from "react";
import { uploadFile } from "../actions/actions";

export default function UploadForm() {
  const fileInput = useRef(null);

  return (
    <form action={uploadFile} className="flex flex-col gap-4 max-w-[300px] mx-auto border border-black p-1 mt-4">
      <label className="flex flex-col">
        <span className="mb-1 text-sm">Upload an image </span>
        <input type="file" name="file" ref={fileInput} className="border p-1 w-full mt-1 text-sm" />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded w-full text-sm">
        Submit
      </button>
    </form>
  );
}
