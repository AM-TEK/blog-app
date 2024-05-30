import React from 'react'

export default async function PostDetails({params} : { params: { id: string } }) {
  const response = await fetch(`https://dummyjson.com/posts/${params.id}`);
  const post = await response.json();
  
  return (
    <div>
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto">{post.body}</p>
    </div>
  )
}
