import { Book } from '../types/book'

interface BookListProps {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (book: Book) => void
}

export function BookList({ books, onEdit, onDelete }: BookListProps) {
  if (books.length === 0) {
    return <p className="empty">Nenhum livro cadastrado ainda.</p>
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book._id} className="book-card">
          <div className="book-card__info">
            <strong>{book.title}</strong>
            <p>{book.author}</p>
            <small>
              {book.pages} páginas
              {book.publisher ? ` • ${book.publisher}` : ''}
            </small>
          </div>

          <div className="book-card__actions">
            <button onClick={() => onEdit(book)}>Editar</button>
            <button className="btn-danger" onClick={() => onDelete(book)}>
              Remover
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
