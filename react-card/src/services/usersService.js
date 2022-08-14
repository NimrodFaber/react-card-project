import httpService, { setCommonHeader } from "./httpService";
import jwtDecode from "jwt-decode";
const TOKEN_HEADER = "x-auth-token";
const TOKEN_KEY = "token";

setCommonHeader(TOKEN_HEADER, getToken());

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function createUser(user) {
  return httpService.post("/users", user);
}

export async function logInUser(credential) {
  const { data } = await httpService.post("auth", credential);
  localStorage.setItem(TOKEN_KEY, data.token);
  setCommonHeader(TOKEN_HEADER, getToken());
}

export function logOut() {
  localStorage.clear(TOKEN_KEY);
  setCommonHeader(TOKEN_HEADER);
}
export function getUser() {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch {
    return null;
  }
}
const usersService = { createUser, logInUser, getToken, getUser, logOut };

export default usersService;
