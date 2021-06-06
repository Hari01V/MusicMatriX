import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/'
})

export const addMusic = (musicData) => {
  api.post("/music", musicData);
}

export const getAllMusic = () => {
  const data = api.get("/music/all");
  return data;
}

export const getMusic = (id) => {
  return api.get(`/music/${id}`);
}

const apis = {
  addMusic,
  getAllMusic,
  getMusic
}

export default apis;