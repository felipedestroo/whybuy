export type Emotion = 
| 'feliz'
| 'neutro'
| 'ansioso'
| 'estressado'
| 'triste'

export type Expense = {
  id: string
  value: number
  category: string
  emotion: Emotion
  note?: string
  date: string
}