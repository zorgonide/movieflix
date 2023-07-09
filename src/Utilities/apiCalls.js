import axios from "axios";
// const backend = "http://127.0.0.1:3000/";
// const backend = "https://guanxinyumovieflix.me/";
const backend = "https://movieflix-wpa8.onrender.com/";

let cache = {};
export const fget = async ({ url }) => {
  if (cache[url]) {
    return cache[url];
  }
  const res = await axios.get(process.env.REACT_APP_BASE_URL + `${url}`, {});
  cache[url] = res;
  return res;
};

export const fpatch = async ({ url, data }) => {
  if (cache[url]) {
    return cache[url];
  }
  const res = await axios.patch(
    process.env.REACT_APP_BASE_URL + `${url}`,
    data,
    {}
  );
  cache[url] = res;

  return res;
};

export const fpost = async ({ url, data }) => {
  if (cache[url]) {
    return cache[url];
  }
  const res = await axios.post(
    process.env.REACT_APP_BASE_URL + `${url}`,
    data,
    {}
  );
  cache[url] = res;

  return res;
};

export const fdelete = async ({ url }) => {
  const res = await axios.delete(process.env.REACT_APP_BASE_URL + `${url}`, {});
  return res;
};
export const getBackend = async ({ url }) => {
  try {
    const res = await axios.get(backend + `${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const patchBackend = async ({ url, data }) => {
  try {
    const res = await axios.put(backend + `${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const postBackend = async ({ url, data }) => {
  try {
    let res = await axios.post(backend + `${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteBackend = async ({ url }) => {
  try {
    const res = await axios.delete(backend + `${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
