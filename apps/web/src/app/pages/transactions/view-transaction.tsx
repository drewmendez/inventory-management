import type { DataTableRowModalProps } from '@/types/data-table'
import type { Transaction } from '@/types/transaction'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default function ViewTransaction({ row, open, onOpenChange }: DataTableRowModalProps<Transaction>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,40rem)] gap-4 overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{row.reference_number}</DialogTitle>
          <DialogDescription>
            {row.type} · {row.transaction_items.length} line
            {row.transaction_items.length === 1 ? '' : 's'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <Field label="Remarks" value={row.remarks?.trim() ? row.remarks : '—'} />
          <Field label="Recorded by" value={`${row.user.full_name} (${row.user.email})`} />
          <Field label="Role" value={row.user.role.name} />
          <Field label="Created" value={row.created_at} />
          <Field label="Updated" value={row.updated_at} />
        </div>

        <div className="grid gap-2">
          <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Line items</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {row.transaction_items.map((line) => (
                <TableRow key={line.id}>
                  <TableCell className="font-mono text-xs">{line.item.sku}</TableCell>
                  <TableCell>{line.item.name}</TableCell>
                  <TableCell className="text-right tabular-nums">{line.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
