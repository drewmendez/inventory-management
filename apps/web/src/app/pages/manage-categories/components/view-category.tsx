import type { Category } from '@/types/category'
import type { DataTableRowModalProps } from '@/types/data-table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default function ViewCategory({ row, open, onOpenChange }: DataTableRowModalProps<Category>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{row.name}</DialogTitle>
          <DialogDescription>Prefix {row.prefix}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Name" value={row.name} />
          <Field label="Prefix" value={row.prefix} />
          <Field label="Created" value={row.created_at} />
          <Field label="Updated" value={row.updated_at} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
