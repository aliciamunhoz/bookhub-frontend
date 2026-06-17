import { FormEvent, useState } from 'react'
import { BookFilter } from '../services/bookService'

interface SearchBarProps {
  onSearch: (filter: BookFilter) => void
  onClear: () => void
}

export function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [field, setField] = useState<BookFilter['field']>('title')
  const [value, setValue] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSearch({ field, value: value.trim() })
  }

  function handleClear() {
    setValue('')
    onClear()
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <select
        value={field}
        onChange={(e) => setField(e.target.value as BookFilter['field'])}
      >
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="publisher">Editora</option>
      </select>

      <input
        placeholder="Buscar..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Buscar</button>
      <button type="button" className="btn-secondary" onClick={handleClear}>
        Limpar
      </button>
    </form>
  )
}
