import type { Category } from '@/types/category'
import type { DataTableRowModalProps } from '@/types/data-table'
import type { Item, UpdateItemFormData } from '@/types/item'
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
import { useUpdateItem } from '@/hooks/models/use-item'
import { useGetUnits } from '@/hooks/models/use-unit'
import { UpdateItemFormSchema } from '@/types/item'

export default function UpdateItem({ row, open, onOpenChange }: DataTableRowModalProps<Item>) {
  const { mutate, isPending, error, reset: resetMutation } = useUpdateItem()
  const { data: categoriesResult, isPending: categoriesPending } = useGetCategories()
  const { data: unitsResult, isPending: unitsPending } = useGetUnits()
  const categories = categoriesResult?.data ?? []
  const units = unitsResult?.data ?? []
  const optionsReady = categories.length > 0 && units.length > 0

  const { control, handleSubmit } = useForm<UpdateItemFormData>({
    resolver: zodResolver(UpdateItemFormSchema),
    defaultValues: {
      name: row.name,
      reorder_level: row.reorder_level,
      category_id: row.category.id,
      unit_id: row.unit.id,
    },
  })

  const onSubmit = (data: UpdateItemFormData) => {
    mutate(
      { itemId: row.id, data },
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
          <DialogTitle>Update item</DialogTitle>
          <DialogDescription>SKU {row.sku}. Changes apply immediately.</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Could not save</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {!optionsReady && (categoriesPending || unitsPending) ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FieldGroup className="gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-item-name">Name</FieldLabel>
                    <Input id="update-item-name" {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="reorder_level"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-item-reorder">Reorder level</FieldLabel>
                    <Input
                      id="update-item-reorder"
                      type="number"
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
                          placeholder="Search category"
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
                          placeholder="Search unit"
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
        )}
      </DialogContent>
    </Dialog>
  )
}
