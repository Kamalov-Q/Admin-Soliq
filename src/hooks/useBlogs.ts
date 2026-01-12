import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Blog, CreateBlog, UpdateBlog, PaginatedResponse } from '@/types'
import { toast } from 'sonner'

export const useBlogs = (page: number = 1, limit: number = 9) => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs', page, limit],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Blog>>(`/blogs?page=${page}&limit=${limit}`)
      return data
    },
  })

  const createBlog = useMutation({
    mutationFn: async (blog: CreateBlog) => {
      const { data } = await api.post('/blogs', blog)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success('Blog created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create blog')
    },
  })

  const updateBlog = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBlog }) => {
      const response = await api.patch(`/blogs/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success('Blog updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update blog')
    },
  })

  const deleteBlog = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/blogs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      toast.success('Blog deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete blog')
    },
  })

  return {
    blogs: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    createBlog,
    updateBlog,
    deleteBlog
  }
}