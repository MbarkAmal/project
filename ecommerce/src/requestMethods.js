import axios from "axios";

const BASE_URL = "http://localhost:4000/auth";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTBhZTYwNDM5MjhlYjk1MDRmYjViZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMzYwMjY4OCwiZXhwIjoxNzEzODYxODg4fQ.csef9wUFJ3iry_5iDo1hXZcArGnTQt3Oyq6w_hdElLM";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `${TOKEN}` },
});
