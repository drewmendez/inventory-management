import type { Item } from './item'
import type { User } from './user'
import { z } from 'zod'

export interface TransactionItemLine {
  id: number
  quantity: string
  item: Item
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: number
  reference_number: string
  type: 'Stock In' | 'Stock Out' | 'Unknown'
  remarks: string | null
  user: User
  transaction_items: TransactionItemLine[]
  created_at: string
  updated_at: string
}

const TRANSACTION_LINE_QTY_PATTERN = /^\d+(?:\.\d{1,2})?$/

const transactionLineFormSchema = z.object({
  item_id: z
    .number()
    .int()
    .min(0)
    .refine((n) => n > 0, { message: 'Select an item' }),
  quantity: z
    .string()
    .trim()
    .superRefine((raw, ctx) => {
      if (raw === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Quantity is required' })
        return
      }
      if (!TRANSACTION_LINE_QTY_PATTERN.test(raw)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Use up to 2 decimal places' })
        return
      }
      const n = Number(raw)
      if (Number.isNaN(n) || n < 0.01) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Minimum quantity is 0.01' })
      }
    })
    .transform((s) => Number(s.trim())),
})

/** Matches `StoreTransactionRequest` after parse. */
export const StoreTransactionSchema = z
  .object({
    type: z.union([z.literal(1), z.literal(2)]),
    remarks: z.string().max(1000),
    transaction_items: z.array(transactionLineFormSchema).min(1, 'Add at least one line'),
  })
  .transform((data) => ({
    type: data.type,
    remarks: data.remarks.trim() === '' ? undefined : data.remarks.trim(),
    transaction_items: data.transaction_items,
  }))
  .superRefine((data, ctx) => {
    const ids = data.transaction_items.map((l) => l.item_id)
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Each item can only appear once',
        path: ['transaction_items'],
      })
    }
  })

export type StoreTransactionFormInput = z.input<typeof StoreTransactionSchema>

export type StoreTransactionPayload = z.output<typeof StoreTransactionSchema>
