import { escapeSymbols } from "../../chat-utils";
import { ChatsAPI } from "../../chats-api";
import { getDataStr } from "../../chats-constants";
import { TChats, TUser } from "../../chats-types";
import { Chat, Message, NoChatsTitle } from "./components";
import { TChat } from "./components/chat/chat-types";
import { RightColumnTemplate } from "./right-column";

const chatsApi = new ChatsAPI();

export async function createRightColumn(user: TUser, chatContent?: TChats) {
  try {
    const noChatsTitle = new NoChatsTitle({});
    const state: { messages: TChat["chats"] } = { messages: [] };
    if (chatContent) {
      const tokenResponse = await chatsApi.getChatToken(chatContent.id);
      if (tokenResponse.status !== 200) {
        throw new Error("не удалось получить доступ к чату");
      }
      const { token }: { token: string } = JSON.parse(
        tokenResponse.responseText,
      );
      const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatContent.id}/${token}`,
      );
      socket.addEventListener("open", () => {
        socket.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          }),
        );
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

            const escapeInput = escapeSymbols(inputMessage);

            socket.send(
              JSON.stringify({
                content: escapeInput,
                type: "message",
              }),
            );
            input.value = "";
          },
        },
      });
      socket.addEventListener("message", (event) => {
        const mes = JSON.parse(event.data);
        const messages = Array.isArray(mes)
          ? mes
              .filter((el) => el.type === "message")
              .map((mes) => ({
                ...mes,
                owner: mes.user_id === user.id,
                time: getDataStr(mes.time),
              }))
          : mes.type === "message"
            ? [
                {
                  ...mes,
                  owner: mes.user_id === user.id,
                  time: getDataStr(mes.time),
                },
              ]
            : [];
        state.messages.push(...messages.reverse());
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
  } catch (e) {
    throw new Error("Не получается установить соединение");
  }
}
