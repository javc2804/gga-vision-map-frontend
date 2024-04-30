import { API_URL } from "./index";

export const authService = {
  login: (email: string, password: string) => {
    return API_URL.post("auth/login", {
      email,
      password,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
  register: (
    email: string,
    password: string,
    name: string,
    lastName: string,
    role: string
  ) => {
    return API_URL.post("auth/register", {
      email,
      password,
      name,
      lastName,
      role,
    })
      .then((response) => {
        return { ok: true, response: response.data };
      })
      .catch((error) => {
        return { ok: false, response: error.response.data.msg };
      });
  },
};
