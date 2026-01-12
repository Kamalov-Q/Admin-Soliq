export interface Blog {
  id: string
  videoUrl: string
  titleUz: string
  titleRu: string
  titleEn: string
  releasedAt: string
  createdAt: string
  updatedAt: string
}

export interface News {
  id: string
  titleUz: string
  titleRu: string
  titleEn: string
  descriptionUz: string
  descriptionRu: string
  descriptionEn: string
  imageUrl: string
  author: string
  releasedAt: string
  createdAt: string
  updatedAt: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export type CreateBlog = Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateBlog = Partial<CreateBlog>
export type CreateNews = Omit<News, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateNews = Partial<CreateNews>
