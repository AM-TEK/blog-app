export default function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-[1000px] mx-auto bg-stone-400 min-h-screen flex flex-col border-l border-r">
      {children}
    </div>
  )
}
