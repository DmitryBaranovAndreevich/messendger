import { ChatsAPI } from "../../chats-api";
import { TChats, TUser } from "../../chats-types";
import { Chat, Message, NoChatsTitle } from "./components";
import { RightColumnTemplate } from "./right-column";

const chatsApi = new ChatsAPI();

export async function createRightColumn(user: TUser, chatContent?: TChats) {
  const noChatsTitle = new NoChatsTitle({});

  const message = new Message({
    events: {
      submit: (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements[0] as HTMLInputElement;
        const inputMessage = input.value;
        if (!inputMessage || inputMessage.length === 0) {
          return;
        }

        console.log({ message: inputMessage });
        input.value = "";
      },
    },
  });

  if (chatContent) {
    const tokenResponse = await chatsApi.getChatToken(chatContent.id);
    if (tokenResponse.status !== 200) {
      throw new Error("не удалось получить доступ к чату");
    }
    const token: { token: string } = JSON.parse(tokenResponse.responseText);
    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatContent.id}/${token}`,
    );
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    });
    const chatContentResponse = chatsApi.getChat(chatContent?.id);
    const chats = JSON.parse((await chatContentResponse).responseText);
    return new RightColumnTemplate({
      content: new Chat({ chats }),
      message,
    });
  }

  return new RightColumnTemplate({
    content: noChatsTitle,
    message,
  });
}
