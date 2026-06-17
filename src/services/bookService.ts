import { Book, BookInput } from '../types/book'
import { request, ApiError } from './api'

export interface BookFilter {
  field: 'title' | 'author' | 'publisher'
  value: string
}

export const bookService = {
  async getAll(filter?: BookFilter): Promise<Book[]> {
    let path = '/books'
    if (filter && filter.value) {
      path += `?${filter.field}=${encodeURIComponent(filter.value)}`
    }

    try {
      const body = await request<Book[]>(path)
      return body.data ?? []
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return []
      }
      throw error
    }
  },

  async create(input: BookInput): Promise<Book> {
    const body = await request<Book>('/books', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return body.data as Book
  },

  async update(id: string, input: BookInput): Promise<Book> {
    const body = await request<Book>(`/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
    return body.data as Book
  },

  async remove(id: string): Promise<void> {
    await request(`/books/${id}`, { method: 'DELETE' })
  },
}
