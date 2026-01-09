import axios from "axios";

export interface FileType {
  message: string;
  filename: string;
  url: string;
  size: number;
  mimetype: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<FileType>(`/upload/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(data, "Coming from image upload");
  return data?.url;
};

export const uploadVideo = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<FileType>(`/upload/video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(data, "Coming from video upload");
  return data?.url;
};
