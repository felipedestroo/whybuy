import { Expense } from '@/types/expense'

const STORAGE_KEY = 'expenses'

export function getExpenses(): Expense[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveExpense(expense: Expense) {
  const current = getExpenses()
  const updated = [...current, expense]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )
}
