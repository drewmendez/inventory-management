import type { DataTableRowModalProps } from '@/types/data-table'
import type { User } from '@/types/user'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default function ViewUser({ row, open, onOpenChange }: DataTableRowModalProps<User>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{row.full_name}</DialogTitle>
          <DialogDescription>User profile details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Email" value={row.email} />
          <Field label="First name" value={row.first_name} />
          <Field label="Middle name" value={row.middle_name ?? '—'} />
          <Field label="Last name" value={row.last_name} />
          <Field label="Role" value={row.role.name} />
          <Field label="Created" value={row.created_at} />
          <Field label="Updated" value={row.updated_at} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
