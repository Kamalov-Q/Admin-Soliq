import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { News, CreateNews, UpdateNews, PaginatedResponse } from '@/types'

export const useNews = (page: number = 1, limit: number = 9) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['news', page, limit],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<News>>(`/news?page=${page}&limit=${limit}`)
      return data
    },
  })

  const createNews = useMutation({
    mutationFn: async (newsItem: CreateNews) => {
      const { data } = await api.post('/news', newsItem)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      console.log(`Successfully created news!`);
    },
    onError: (error: any) => {
      console.error(`Error: ${error}`);
    },
  })

  const updateNews = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateNews }) => {
      const response = await api.patch(`/news/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      console.log(`Successfully updated news!`);
    },
    onError: (error: any) => {
      console.error(`Error: ${error}`);
    },
  })

  const deleteNews = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/news/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      console.log(`Successfully deleted news!`);
    },
    onError: (error: any) => {
      console.error(`Error: ${error}`);
    },
  })

  return {
    news: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    createNews,
    updateNews,
    deleteNews
  }
}