'use client'

import { useState } from 'react'

export default function AddExpense() {
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [emotion, setEmotion] = useState('neutro')
  const [note, setNote] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const expense = {
      value,
      category,
      emotion,
      note,
    }

    console.log('Novo gasto:', expense)
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Novo Gasto
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Valor */}
        <div>
          <label className="block text-sm font-medium">
            Valor
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 w-full rounded border p-2"
            required
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium">
            Categoria
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded border p-2"
            required
          />
        </div>

        {/* Emoção */}
        <div>
          <label className="block text-sm font-medium">
            Emoção no momento
          </label>
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="mt-1 w-full rounded border p-2"
          >
            <option value="feliz">😄 Feliz</option>
            <option value="neutro">😐 Neutro</option>
            <option value="ansioso">😰 Ansioso</option>
            <option value="estressado">😡 Estressado</option>
            <option value="triste">😔 Triste</option>
          </select>
        </div>

        {/* Observação */}
        <div>
          <label className="block text-sm font-medium">
            Observação (opcional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded border bg-black text-white py-2"
        >
          Salvar gasto
        </button>
      </form>
    </main>
  )
}
