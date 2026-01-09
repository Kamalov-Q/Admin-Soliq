export interface Blog {
  id: string;
  videoUrl: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descriptionUz: string;
  descriptionRu: string;
  descriptionEn: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateBlog = Omit<Blog, "id" | "createdAt" | "updatedAt">;
export type UpdateBlog = Partial<CreateBlog>;
export type CreateNews = Omit<News, "id" | "createdAt" | "updatedAt">;
export type UpdateNews = Partial<CreateNews>;
