import { useEffect, useState } from 'react'
import { Book, BookInput } from '../types/book'
import { bookService, BookFilter } from '../services/bookService'
import { BookForm } from '../components/BookForm'
import { BookList } from '../components/BookList'
import { SearchBar } from '../components/SearchBar'
import { Message } from '../components/Message'

type Tab = 'list' | 'form'

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('list')
  const [filter, setFilter] = useState<BookFilter | null>(null)
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  async function loadBooks(activeFilter = filter) {
    setLoading(true)
    try {
      const data = await bookService.getAll(activeFilter ?? undefined)
      setBooks(data)
    } catch (error) {
      setFeedback({ type: 'error', text: getErrorMessage(error) })
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(newFilter: BookFilter) {
    setFilter(newFilter)
    loadBooks(newFilter)
  }

  function handleClearSearch() {
    setFilter(null)
    loadBooks(null)
  }

  useEffect(() => {
    loadBooks()
  }, [])

  function openListTab() {
    setFeedback(null)
    setActiveTab('list')
  }

  function openAddTab() {
    setEditingBook(null)
    setFeedback(null)
    setActiveTab('form')
  }

  function openEditTab(book: Book) {
    setEditingBook(book)
    setFeedback(null)
    setActiveTab('form')
  }

  async function handleSubmit(input: BookInput) {
    setSaving(true)
    setFeedback(null)
    try {
      if (editingBook) {
        await bookService.update(editingBook._id, input)
        setFeedback({ type: 'success', text: 'Livro atualizado com sucesso!' })
      } else {
        await bookService.create(input)
        setFeedback({ type: 'success', text: 'Livro adicionado com sucesso!' })
      }
      setEditingBook(null)
      await loadBooks()
      setActiveTab('list')
    } catch (error) {
      setFeedback({ type: 'error', text: getErrorMessage(error) })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(book: Book) {
    const confirmed = window.confirm(`Remover "${book.title}"?`)
    if (!confirmed) return

    setFeedback(null)
    try {
      await bookService.remove(book._id)
      setFeedback({ type: 'success', text: 'Livro removido com sucesso!' })
      if (editingBook?._id === book._id) setEditingBook(null)
      await loadBooks()
    } catch (error) {
      setFeedback({ type: 'error', text: getErrorMessage(error) })
    }
  }

  return (
    <main className="container">
      <h1>📚 Meus Livros</h1>

      {/* Navegação por abas */}
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'list' ? 'tab--active' : ''}`}
          onClick={openListTab}
        >
          📋 Cadastrados
        </button>
        <button
          className={`tab ${activeTab === 'form' ? 'tab--active' : ''}`}
          onClick={openAddTab}
        >
          ➕ Adicionar
        </button>
      </nav>

      {feedback && <Message type={feedback.type} text={feedback.text} />}

      {/* Conteúdo da aba ativa */}
      {activeTab === 'list' ? (
        <>
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          {loading ? (
            <p className="loading">Carregando livros...</p>
          ) : (
            <BookList
              books={books}
              onEdit={openEditTab}
              onDelete={handleDelete}
            />
          )}
        </>
      ) : (
        <BookForm
          editingBook={editingBook}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={openListTab}
        />
      )}
    </main>
  )
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return 'Algo deu errado. Tente novamente.'
}
