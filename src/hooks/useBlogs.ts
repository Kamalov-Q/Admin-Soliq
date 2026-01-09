import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Blog, CreateBlog, UpdateBlog } from "../types";

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await api.get<Blog[]>(`/blogs`);
      return data;
    },
  });

  const createBlog = useMutation({
    mutationFn: async (blog: CreateBlog) => {
      const { data } = await api.post(`/blogs`, blog);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log(`Blog created successfully!`);
    },
    onError: (error: any) => {
      console.error(
        `${error?.response?.data?.message}` || "Failed while creating blog!"
      );
    },
  });

  const updateBlog = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBlog }) => {
      const response = await api.patch(`/blogs/${id}`, data);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log(`Blog successfully updated!`);
    },
    onError: (error: any) => {
      console.error(
        `${error?.response?.data?.message}` || "Failed while updating the post!"
      );
    },
  });

  const deleteBlog = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log(`Blog successfully deleted!`);
    },
    onError: (error: any) => {
      console.error(
        `${error?.response?.data?.message}` || "Failed while updating the post!"
      );
    },
  });

  return { blogs, isLoading, error, createBlog, updateBlog, deleteBlog };
};
