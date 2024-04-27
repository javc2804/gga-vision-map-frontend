export const authService = {
  login: (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "user" && password === "password") {
          resolve({ username });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },
  register: (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          resolve({ username });
        } else {
          reject(new Error("Invalid data"));
        }
      }, 1000);
    });
  },
};
