import type { Resolver } from 'react-hook-form'
import type { Category } from '@/types/category'
import type { DataTableModalProps } from '@/types/data-table'
import type { CreateItemPayload, ItemFormValues } from '@/types/item'
import type { Unit } from '@/types/unit'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useGetCategories } from '@/hooks/use-category'
import { useCreateItem } from '@/hooks/use-item'
import { useGetUnits } from '@/hooks/use-unit'
import { CreateItemSchema } from '@/types/item'

function CreateItemForm({
  categories,
  units,
  isPending,
  onClose,
  onSubmitPayload,
}: {
  categories: Category[]
  units: Unit[]
  isPending: boolean
  onClose: () => void
  onSubmitPayload: (payload: CreateItemPayload) => void
}) {
  const { control, handleSubmit } = useForm<ItemFormValues, unknown, CreateItemPayload>({
    resolver: zodResolver(CreateItemSchema as never) as Resolver<ItemFormValues, unknown, CreateItemPayload>,
    defaultValues: {
      name: '',
      quantity: '0',
      reorder_level: '0',
      category_id: categories[0]!.id,
      unit_id: units[0]!.id,
    },
  })

  const onSubmit = (data: CreateItemPayload) => {
    onSubmitPayload(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <FieldGroup className="gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-item-name">Name</FieldLabel>
              <Input id="create-item-name" {...field} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="quantity"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-item-quantity">Quantity</FieldLabel>
              <Input
                id="create-item-quantity"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="reorder_level"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-item-reorder">Reorder level</FieldLabel>
              <Input
                id="create-item-reorder"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="category_id"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Category</FieldLabel>
              <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="unit_id"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Unit</FieldLabel>
              <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.name} ({u.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="inline-flex items-center gap-2">
          {isPending ? (
            <>
              <Spinner />
              Creating…
            </>
          ) : (
            'Create item'
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}

export default function CreateItem({ open, onOpenChange }: DataTableModalProps) {
  const { mutate, isPending, error, reset: resetMutation } = useCreateItem()
  const { data: categoriesResult, isPending: categoriesPending } = useGetCategories()
  const { data: unitsResult, isPending: unitsPending } = useGetUnits()
  const categories = categoriesResult?.data ?? []
  const units = unitsResult?.data ?? []
  const optionsReady = categories.length > 0 && units.length > 0

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
          <DialogTitle>Add item</DialogTitle>
          <DialogDescription>SKU is assigned automatically from the category.</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Could not create</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {open &&
          (!optionsReady && (categoriesPending || unitsPending) ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : !optionsReady ? (
            <p className="text-sm text-muted-foreground">
              Add at least one category and unit before creating items.
            </p>
          ) : (
            <CreateItemForm
              categories={categories}
              units={units}
              isPending={isPending}
              onClose={() => onOpenChange(false)}
              onSubmitPayload={(payload) => {
                mutate(payload, {
                  onSuccess: () => onOpenChange(false),
                })
              }}
            />
          ))}
      </DialogContent>
    </Dialog>
  )
}
