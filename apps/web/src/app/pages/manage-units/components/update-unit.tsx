import type { DataTableRowModalProps } from '@/types/data-table'
import type { Unit, UpdateUnitFormData } from '@/types/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useUpdateUnit } from '@/hooks/models/use-unit'
import { UpdateUnitSchema } from '@/types/unit'

export default function UpdateUnit({ row, open, onOpenChange }: DataTableRowModalProps<Unit>) {
  const { mutate, isPending, error, reset: resetMutation } = useUpdateUnit()

  const { control, handleSubmit } = useForm<UpdateUnitFormData>({
    resolver: zodResolver(UpdateUnitSchema),
    defaultValues: {
      name: row.name,
      symbol: row.symbol,
    },
  })

  const onSubmit = (data: UpdateUnitFormData) => {
    mutate(
      { unitId: row.id, data },
      {
        onSuccess: () => onOpenChange(false),
      },
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          resetMutation()
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update unit</DialogTitle>
          <DialogDescription>Edit name or symbol. Changes apply immediately.</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Could not save</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-unit-name">Name</FieldLabel>
                  <Input id="update-unit-name" {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="symbol"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-unit-symbol">Symbol</FieldLabel>
                  <Input id="update-unit-symbol" {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="inline-flex items-center gap-2">
              {isPending ? (
                <>
                  <Spinner />
                  Saving…
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
