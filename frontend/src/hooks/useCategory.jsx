import axios from "axios";
import React, { useState, useEffect } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // create Axios instance with base URL from env
  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // get category
  const getCategories = async () => {
    try {
      const { data } = await API.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
