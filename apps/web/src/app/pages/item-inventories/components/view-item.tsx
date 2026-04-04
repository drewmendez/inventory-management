import type { DataTableRowModalProps } from '@/types/data-table'
import type { Item } from '@/types/item'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default function ViewItem({ row, open, onOpenChange }: DataTableRowModalProps<Item>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{row.name}</DialogTitle>
          <DialogDescription>SKU {row.sku}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Quantity" value={row.quantity} />
          <Field label="Reorder level" value={row.reorder_level} />
          <Field label="Status" value={row.status} />
          <Field label="Category" value={row.category.name} />
          <Field label="Unit" value={`${row.unit.name} (${row.unit.symbol})`} />
          <Field label="Created" value={row.created_at} />
          <Field label="Updated" value={row.updated_at} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
