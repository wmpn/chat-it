import Env from "./env";

export const BASE_URL = Env.SERVER_URL;
export const API_URL = BASE_URL + "/api";
export const LOGIN_URL = API_URL + "/auth/login";
export const CHAT_GROUP_URL = API_URL + "/chat-group";
