import type { Resolver } from 'react-hook-form'
import type { CategoryFormInput, CategoryPayload } from '@/types/category'
import type { DataTableModalProps } from '@/types/data-table'
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
import { useCreateCategory } from '@/hooks/use-category'
import { CreateCategorySchema } from '@/types/category'

export default function CreateCategory({ open, onOpenChange }: DataTableModalProps) {
  const { mutate, isPending, error, reset: resetMutation } = useCreateCategory()

  const { control, handleSubmit, reset } = useForm<CategoryFormInput, unknown, CategoryPayload>({
    resolver: zodResolver(CreateCategorySchema as never) as Resolver<
      CategoryFormInput,
      unknown,
      CategoryPayload
    >,
    defaultValues: {
      name: '',
      prefix: '',
    },
  })

  const onSubmit = (data: CategoryPayload) => {
    mutate(data, {
      onSuccess: () => {
        onOpenChange(false)
        reset({ name: '', prefix: '' })
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
          reset({ name: '', prefix: '' })
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>
            Prefix must be 3 characters (letters or digits) and is used for item SKUs.
          </DialogDescription>
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
                  <FieldLabel htmlFor="create-category-name">Name</FieldLabel>
                  <Input id="create-category-name" {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="prefix"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-category-prefix">Prefix</FieldLabel>
                  <Input
                    id="create-category-prefix"
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
                  Creating…
                </>
              ) : (
                'Create category'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
