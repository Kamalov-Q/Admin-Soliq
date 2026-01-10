import { api } from "./api";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(
    `${API_URL}/api/uploadthing/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(data, "From image upload");
  return data?.data?.url;
};

export const uploadVideo = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(
    `${API_URL}/api/uploadthing/video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(data, "From video upload");
  return data?.data?.url;
};
