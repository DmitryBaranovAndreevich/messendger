import { BASE_URL, BaseAPI, HTTPTransport } from "../../services";

const chatsApiInstance = new HTTPTransport(BASE_URL);

export class ChatsAPI extends BaseAPI {
  create(title: string) {
    return chatsApiInstance.post("/chats", { data: { title } });
  }

  delete(id: string) {
    return chatsApiInstance.delete("/chats", { data: { chatId: id } });
  }

  request(data?: { offset: number; limit: number; title: string }) {
    return chatsApiInstance.get("/chats", { data });
  }

  getUser() {
    return chatsApiInstance.get("/auth/user");
  }

  getChat(id: string) {
    return chatsApiInstance.get(`/chats/new/${id}`);
  }

  getChatUser(id: string) {
    return chatsApiInstance.get(`/chats/${id}/users`);
  }

  removeUserFromChat(chatId: string, userId: string) {
    return chatsApiInstance.delete(`/chats/users`, {
      data: { users: [userId], chatId },
    });
  }

  addUserToChat(chatId: string, userLogin: string) {
    return chatsApiInstance.put(`/chats/users`, {
      data: { users: [userLogin], chatId },
    });
  }

  userSearch(login: string) {
    return chatsApiInstance.post(`/user/search`, {
      data: { login },
    });
  }

  getChatToken(chatId: string) {
    return chatsApiInstance.post(`/chats/token/${chatId}`);
  }
}
