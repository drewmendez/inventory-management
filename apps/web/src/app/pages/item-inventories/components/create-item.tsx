import type { Category } from '@/types/category'
import type { DataTableModalProps } from '@/types/data-table'
import type { CreateItemFormData } from '@/types/item'
import type { Unit } from '@/types/unit'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
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
import { useGetCategories } from '@/hooks/models/use-category'
import { useCreateItem } from '@/hooks/models/use-item'
import { useGetUnits } from '@/hooks/models/use-unit'
import { CreateItemFormSchema } from '@/types/item'

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
  onSubmitPayload: (payload: CreateItemFormData) => void
}) {
  const { control, handleSubmit } = useForm<CreateItemFormData>({
    resolver: zodResolver(CreateItemFormSchema),
    defaultValues: {
      name: '',
      quantity: 0,
      reorder_level: 0,
      category_id: 0,
      unit_id: 0,
    },
  })

  const onSubmit = (data: CreateItemFormData) => {
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
                type="number"
                inputMode="decimal"
                autoComplete="off"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={Number.isFinite(field.value) ? String(field.value) : ''}
                onChange={(e) => {
                  const v = e.target.value
                  field.onChange(v === '' ? 0 : Number.parseFloat(v))
                }}
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
                type="number"
                inputMode="decimal"
                autoComplete="off"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={Number.isFinite(field.value) ? String(field.value) : ''}
                onChange={(e) => {
                  const v = e.target.value
                  field.onChange(v === '' ? 0 : Number.parseFloat(v))
                }}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="category_id"
          control={control}
          render={({ field, fieldState }) => {
            const selected = categories.find((c) => c.id === field.value) ?? null
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Category</FieldLabel>
                <Combobox
                  items={categories}
                  value={selected}
                  onValueChange={(c: Category | null) => field.onChange(c?.id ?? 0)}
                  itemToStringLabel={(c) => (c ? c.name : '')}
                >
                  <ComboboxInput
                    placeholder="Select category"
                    className="h-9 w-full py-1"
                    showClear
                    disabled={categories.length === 0}
                    aria-invalid={fieldState.invalid}
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No categories found.</ComboboxEmpty>
                    <ComboboxList>
                      {(c) => (
                        <ComboboxItem key={c.id} value={c}>
                          {c.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
        />
        <Controller
          name="unit_id"
          control={control}
          render={({ field, fieldState }) => {
            const selected = units.find((u) => u.id === field.value) ?? null
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Unit</FieldLabel>
                <Combobox
                  items={units}
                  value={selected}
                  onValueChange={(u: Unit | null) => field.onChange(u?.id ?? 0)}
                  itemToStringLabel={(u) => (u ? `${u.name} (${u.symbol})` : '')}
                >
                  <ComboboxInput
                    placeholder="Select unit"
                    className="h-9 w-full py-1"
                    showClear
                    disabled={units.length === 0}
                    aria-invalid={fieldState.invalid}
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No units found.</ComboboxEmpty>
                    <ComboboxList>
                      {(u) => (
                        <ComboboxItem key={u.id} value={u}>
                          {u.name} <span className="text-muted-foreground">({u.symbol})</span>
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )
          }}
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
