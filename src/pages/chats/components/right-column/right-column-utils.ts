import { ChatsAPI } from "../../chats-api";
import { TChats, TUser } from "../../chats-types";
import { Chat, Message, NoChatsTitle } from "./components";
import { TChat } from "./components/chat/chat-types";
import { RightColumnTemplate } from "./right-column";

const chatsApi = new ChatsAPI();

export async function createRightColumn(user: TUser, chatContent?: TChats) {
  const noChatsTitle = new NoChatsTitle({});
  const state: { messages: TChat["chats"] } = { messages: [] };
  if (chatContent) {
    const tokenResponse = await chatsApi.getChatToken(chatContent.id);
    if (tokenResponse.status !== 200) {
      throw new Error("не удалось получить доступ к чату");
    }
    const { token }: { token: string } = JSON.parse(tokenResponse.responseText);
    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatContent.id}/${token}`,
    );
    socket.addEventListener("open", () => {
      console.log("Соединение установлено");
    });
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

          socket.send(
            JSON.stringify({
              content: inputMessage,
              type: "message",
            }),
          );
          input.value = "";
        },
      },
    });
    socket.addEventListener("message", (event) => {
      const mes = JSON.parse(event.data);
      state.messages.push(mes);
      renderChat();
    });
    const rightColumn = new RightColumnTemplate({
      content: new Chat({ chats: state.messages }),
      message,
    });

    function renderChat() {
      rightColumn.setProps({ content: new Chat({ chats: state.messages }) });
    }

    return rightColumn;
  }

  return new RightColumnTemplate({
    content: noChatsTitle,
  });
}
