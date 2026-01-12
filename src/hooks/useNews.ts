import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { News, CreateNews, UpdateNews, PaginatedResponse } from '@/types'
import { toast } from 'sonner'

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
      toast.success('News created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create news')
    },
  })

  const updateNews = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateNews }) => {
      const response = await api.patch(`/news/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      toast.success('News updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update news')
    },
  })

  const deleteNews = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/news/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      toast.success('News deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete news')
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