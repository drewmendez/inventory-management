export default function Dashboard() {
  return (
    <div className="grid h-full gap-4 md:grid-cols-5 md:grid-rows-3">
      <div className="size-full rounded-xl bg-muted/50" />
      <div className="size-full rounded-xl bg-muted/50 md:col-span-2" />
      <div className="size-full rounded-xl bg-muted/50 md:col-span-2 md:row-span-3" />
      <div className="size-full rounded-xl bg-muted/50 md:col-span-3 md:row-span-2" />
    </div>
  )
}
