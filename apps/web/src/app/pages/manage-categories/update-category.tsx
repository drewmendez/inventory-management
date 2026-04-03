import type { Resolver } from 'react-hook-form'
import type { Category, CategoryFormInput, CategoryPayload } from '@/types/category'
import type { DataTableRowModalProps } from '@/types/data-table'
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
import { useUpdateCategory } from '@/hooks/use-category'
import { UpdateCategorySchema } from '@/types/category'

export default function UpdateCategory({ row, open, onOpenChange }: DataTableRowModalProps<Category>) {
  const { mutate, isPending, error, reset: resetMutation } = useUpdateCategory()

  const { control, handleSubmit } = useForm<CategoryFormInput, unknown, CategoryPayload>({
    resolver: zodResolver(UpdateCategorySchema as never) as Resolver<
      CategoryFormInput,
      unknown,
      CategoryPayload
    >,
    defaultValues: {
      name: row.name,
      prefix: row.prefix,
    },
  })

  const onSubmit = (data: CategoryPayload) => {
    mutate(
      { categoryId: row.id, data },
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
          <DialogTitle>Update category</DialogTitle>
          <DialogDescription>Edit name or SKU prefix. Changes apply immediately.</DialogDescription>
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
                  <FieldLabel htmlFor="update-category-name">Name</FieldLabel>
                  <Input id="update-category-name" {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="prefix"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="update-category-prefix">Prefix</FieldLabel>
                  <Input
                    id="update-category-prefix"
                    {...field}
                    maxLength={3}
                    autoComplete="off"
                    className="font-mono uppercase"
                    aria-invalid={fieldState.invalid}
                  />
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
