import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Blog, CreateBlog, UpdateBlog, PaginatedResponse } from '@/types'

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
      console.log(`Successfully created blog!`);

    },
    onError: (error: any) => {
      console.error(`Error: ${error}`);
    },
  })

  const updateBlog = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBlog }) => {
      const response = await api.patch(`/blogs/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      console.log(`Successfully updated blog!`);

    },
    onError: (error: any) => {
      console.error(`Error: ${error}`);
    },
  })

  const deleteBlog = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/blogs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      console.log(`Succesfully deleted blog!`);

    },
    onError: (error: any) => {
      console.error(`Error: ${error}`);
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