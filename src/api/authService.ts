import { API_URL } from "./index";

export const authService = {
  login: (email: string, password: string) => {
    return API_URL.post("auth/login", {
      email,
      password,
    })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  },
  register: (email: string, password: string) => {
    return API_URL.post("auth/register", {
      email,
      password,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.message };
      });
  },
};
