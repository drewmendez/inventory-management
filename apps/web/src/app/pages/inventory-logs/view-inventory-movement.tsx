import type { DataTableRowModalProps } from '@/types/data-table'
import type { InventoryMovement } from '@/types/inventory-movement'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default function ViewInventoryMovement({
  row,
  open,
  onOpenChange,
}: DataTableRowModalProps<InventoryMovement>) {
  const item = row.transaction_item.item
  const line = row.transaction_item

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>SKU {item.sku}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="From quantity" value={row.from_quantity} />
          <Field label="To quantity" value={row.to_quantity} />
          <Field label="Line quantity" value={line.quantity} />
          <Field label="Category" value={item.category.name} />
          <Field label="Unit" value={`${item.unit.name} (${item.unit.symbol})`} />
          <Field label="Logged at" value={row.created_at} />
          <Field label="Updated" value={row.updated_at} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
