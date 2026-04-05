import type { DataTableModalProps } from '@/types/data-table'
import type { Item } from '@/types/item'
import type { CreateTransactionFormData } from '@/types/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useGetItems } from '@/hooks/models/use-item'
import { useCreateTransaction } from '@/hooks/models/use-transaction'
import { TransactionFormSchema } from '@/types/transaction'

const defaultLine = (): CreateTransactionFormData['transaction_items'][number] => ({
  item_id: 0,
  quantity: 0,
})

export default function CreateTransaction({ open, onOpenChange }: DataTableModalProps) {
  const { mutate, isPending, error, reset: resetMutation } = useCreateTransaction()
  const { data: itemsResult, isPending: itemsPending } = useGetItems()
  const items = itemsResult?.data ?? []

  const { control, handleSubmit, reset } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      type: 0,
      remarks: '',
      transaction_items: [defaultLine()],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'transaction_items',
  })

  const watchedLines = useWatch({ control, name: 'transaction_items' })

  const onSubmit = (data: CreateTransactionFormData) => {
    mutate(data, {
      onSuccess: () => {
        onOpenChange(false)
        reset({
          type: 0,
          remarks: '',
          transaction_items: [defaultLine()],
        })
      },
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        resetMutation()
        if (!next) {
          reset({
            type: 0,
            remarks: '',
            transaction_items: [defaultLine()],
          })
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="gap-4 overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription>
            Add one or more items and quantities. Reference number is assigned when you save.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Could not create</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {itemsPending && items.length === 0 ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <FieldGroup className="gap-4">
              <Controller
                name="type"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Type</FieldLabel>
                    <Select
                      value={field.value === 0 ? undefined : String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v) as 1 | 2)}
                    >
                      <SelectTrigger className="w-full max-w-xs" aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Stock In</SelectItem>
                        <SelectItem value="2">Stock Out</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="remarks"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-transaction-remarks">Remarks (optional)</FieldLabel>
                    <Textarea
                      id="create-transaction-remarks"
                      rows={3}
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="grid gap-2">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <FieldLabel className="text-sm font-medium">Line items</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-1"
                  onClick={() => append(defaultLine())}
                >
                  <PlusIcon className="size-4" />
                  Add line
                </Button>
              </div>

              <div className="max-h-[250px]">
                <Table>
                  <TableHeader>
                    <TableRow className="sticky top-0 z-10">
                      <TableHead className="h-11 min-w-56 bg-primary text-primary-foreground">Item</TableHead>
                      <TableHead className="h-11 w-32 bg-primary text-primary-foreground">Quantity</TableHead>
                      <TableHead className="h-11 w-12 bg-primary text-center text-primary-foreground"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((fieldRow, index) => (
                      <TableRow key={fieldRow.id}>
                        <TableCell className="align-top">
                          <Controller
                            name={`transaction_items.${index}.item_id`}
                            control={control}
                            render={({ field, fieldState }) => {
                              const takenElsewhere = new Set<number>()
                              watchedLines?.forEach((line, i) => {
                                if (i !== index && line && line.item_id > 0) {
                                  takenElsewhere.add(line.item_id)
                                }
                              })
                              const lineItems = items.filter(
                                (item) => !takenElsewhere.has(item.id) || item.id === field.value,
                              )
                              const selected = lineItems.find((i) => i.id === field.value) ?? null
                              return (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                  <Combobox
                                    items={lineItems}
                                    value={selected}
                                    onValueChange={(item: Item | null) => field.onChange(item?.id ?? 0)}
                                    itemToStringLabel={(i) => (i ? `${i.sku} — ${i.name}` : '')}
                                  >
                                    <ComboboxInput
                                      placeholder="Search item"
                                      className="h-9 py-1"
                                      showClear
                                      disabled={items.length === 0}
                                    />
                                    <ComboboxContent>
                                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                                      <ComboboxList>
                                        {(item) => (
                                          <ComboboxItem key={item.id} value={item}>
                                            <span className="font-mono text-xs">{item.sku}</span>
                                            <span className="text-muted-foreground"> — {item.name}</span>
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
                        </TableCell>
                        <TableCell className="align-top">
                          <Controller
                            name={`transaction_items.${index}.quantity`}
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid} className="gap-1">
                                <Input
                                  type="number"
                                  inputMode="decimal"
                                  autoComplete="off"
                                  className="h-9"
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
                        </TableCell>
                        <TableCell className="text-center align-top">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 text-muted-foreground hover:text-destructive"
                            aria-label="Remove line"
                            disabled={fields.length <= 1}
                            onClick={() => remove(index)}
                          >
                            <Trash2Icon className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <DialogFooter className="gap-2">
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
                  'Create transaction'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
