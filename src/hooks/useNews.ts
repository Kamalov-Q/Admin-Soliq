import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { News, CreateNews, UpdateNews } from "../types/index";
import { api } from "../lib/api";

export const useNews = () => {
  const queryClient = useQueryClient();

  const {
    data: news = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await api.get<News[]>("/news");
      return data;
    },
  });

  const createNews = useMutation({
    mutationFn: async (newsItem: CreateNews) => {
      const { data } = await api.post("/news", newsItem);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      console.log(`News created successfully!`);
    },
    onError: (error: any) => {
      console.error(
        `${error?.response?.data?.message}` || "Failed while creating news!"
      );
    },
  });

  const updateNews = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateNews }) => {
      const response = await api.patch(`/news/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      console.log(`News updated successfully!`);
    },
    onError: (error: any) => {
      console.error(
        `${error?.response?.data?.message}` || "Failed while updating blog!"
      );
    },
  });

  const deleteNews = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      console.log(`News deleted successfully!`);
    },
    onError: (error: any) => {
      console.error(
        `${error?.response?.data?.message}` || "Failed while deleting blog!"
      );
    },
  });

  return { news, isLoading, error, createNews, updateNews, deleteNews };
};
