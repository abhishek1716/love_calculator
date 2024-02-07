"use server";
import { cookies } from "next/headers";

const cookieStore = cookies();

export const getCookies = (name) => {
  return cookieStore.get(name);
};

export const setCookies = (name, value) => {
  cookieStore.set("loveCalUserId", uuidv4);
};
