import { Suspense } from "react";
import PostDetails from "./post-details";

export default async function Page({ params }: { params: { id: string } }) {
  
  return (
    <main className="px-7 pt-24 text-center">
      <Suspense fallback="Loading...">
        <PostDetails params={params} />
      </Suspense>
    </main>
  )
}
