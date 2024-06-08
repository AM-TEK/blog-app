// import { Suspense } from "react";
// import prisma from "@/lib/db";
// import { notFound } from "next/navigation";
// import UploadForm from "@/components/upload-form";
// import Image from "next/image";
// import fs from "node:fs/promises"; 

// export default async function Page({ params }: { params: { id: string } }) {
//   const post = await prisma.post.findUnique({
//     where: {
//       id: parseInt(params.id),
//     },
//   });
//   if (!post) {
//     notFound();
//   }

//    // Ensure the public/uploads directory exists
//   const publicDir = "./public";
//   const uploadsDir = "./public/uploads";
//   try {
//     await fs.access(publicDir);
//   } catch (error) {
//     await fs.mkdir(publicDir);
//   }

//   try {
//     await fs.access(uploadsDir);
//   } catch (error) {
//     await fs.mkdir(uploadsDir);
//   }

//   const files = await fs.readdir("./public/uploads");
//   const images = files
//     .filter((file) => file.endsWith(".jpg"))
//     .map((file) => `/uploads/${file}`);
  
//   return (
//     <main className="text-center pt-16 px-5">
//       <Suspense fallback="Loading...">
//           <h1 className="text-4xl md:text-5xl font-bold mb-5">{post.title}</h1>
//           <p className="max-w-[700px] mx-auto leading-8 border border-neutral-700">{post.body}</p>
        
//         <div className="flex flex-wrap justify-center mt-3">
//           {images.map((image) => (
//             <div key={image} className="px-2 h-auto w-2/3">
//               <Image
//                 key={image}
//                 src={image}
//                 width={600}
//                 height={600}
//                 alt={image}
//                 className="object-cover w-full"
//               />
//             </div>
//           ))}
//         </div>
//         <UploadForm />
//       </Suspense>
//     </main>
//   )
// }
import { Suspense } from "react";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import UploadForm from "@/components/upload-form";
import Image from "next/image";

// This function converts the image buffer to a base64 string
const bufferToBase64 = (buffer: ArrayBuffer) => {
  return Buffer.from(buffer).toString('base64');
}

interface Params {
  id: string;
}

interface PageProps {
  params: Params;
}

export default async function Page({ params }: PageProps) {
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
        <div className="text-center pt-28 px-5">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">{post.title}</h1>
          <p className="max-w-[700px] mx-auto leading-8 border border-neutral-700">{post.body}</p>
          {post.image && (
            <img 
              src={`data:image/jpeg;base64,${bufferToBase64(post.image)}`} 
              alt={post.title} 
              className="max-w-full h-auto mx-auto mt-5" 
            />
          )}
        </div>
        <UploadForm />
      </Suspense>
    </main>
  );
}
