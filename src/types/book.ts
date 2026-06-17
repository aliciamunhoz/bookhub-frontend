export interface Book {
  _id: string
  title: string
  author: string
  publisher?: string
  pages: number
}

export interface BookInput {
  title: string
  author: string
  publisher?: string
  pages: number
}
