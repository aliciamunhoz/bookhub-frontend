import { FormEvent, useEffect, useState } from 'react'
import { Book, BookInput } from '../types/book'

interface BookFormProps {
  editingBook: Book | null
  saving: boolean
  onSubmit: (input: BookInput) => void
  onCancel: () => void
}

export function BookForm({
  editingBook,
  saving,
  onSubmit,
  onCancel,
}: BookFormProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [pages, setPages] = useState('')

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title)
      setAuthor(editingBook.author)
      setPublisher(editingBook.publisher ?? '')
      setPages(String(editingBook.pages))
    } else {
      setTitle('')
      setAuthor('')
      setPublisher('')
      setPages('')
    }
  }, [editingBook])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit({
      title,
      author,
      publisher: publisher || undefined,
      pages: Number(pages),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingBook ? 'Editar livro' : 'Adicionar livro'}</h2>

      <label>
        Título
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Autor
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </label>

      <label>
        Editora
        <input
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
        />
      </label>

      <label>
        Páginas
        <input
          type="number"
          min="1"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
      </label>

      <div className="form__actions">
        <button type="submit" disabled={saving}>
          {saving
            ? 'Salvando...'
            : editingBook
              ? 'Salvar alterações'
              : 'Adicionar'}
        </button>

        {editingBook && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
