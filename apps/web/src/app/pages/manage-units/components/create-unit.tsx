import type { Resolver } from 'react-hook-form'
import type { DataTableModalProps } from '@/types/data-table'
import type { UnitFormInput, UnitPayload } from '@/types/unit'
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
import { useCreateUnit } from '@/hooks/models/use-unit'
import { CreateUnitSchema } from '@/types/unit'

export default function CreateUnit({ open, onOpenChange }: DataTableModalProps) {
  const { mutate, isPending, error, reset: resetMutation } = useCreateUnit()

  const { control, handleSubmit, reset } = useForm<UnitFormInput, unknown, UnitPayload>({
    resolver: zodResolver(CreateUnitSchema as never) as Resolver<UnitFormInput, unknown, UnitPayload>,
    defaultValues: {
      name: '',
      symbol: '',
    },
  })

  const onSubmit = (data: UnitPayload) => {
    mutate(data, {
      onSuccess: () => {
        onOpenChange(false)
        reset({ name: '', symbol: '' })
      },
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) {
          resetMutation()
        }
        if (!next) {
          reset({ name: '', symbol: '' })
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add unit</DialogTitle>
          <DialogDescription>Symbol must be unique (e.g. kg, pcs).</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Could not create</AlertTitle>
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
                  <FieldLabel htmlFor="create-unit-name">Name</FieldLabel>
                  <Input id="create-unit-name" {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="symbol"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-unit-symbol">Symbol</FieldLabel>
                  <Input id="create-unit-symbol" {...field} aria-invalid={fieldState.invalid} />
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
                  Creating…
                </>
              ) : (
                'Create unit'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
