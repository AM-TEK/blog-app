export default function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="max-w-[900px] mx-auto bg-teal-400 min-h-screen flex flex-col border-l border-r">
      {children}
    </div>
  )
}
