import { Chat, Message, NoChatsTitle } from "./components";
import { RightColumnTemplate } from "./right-column";

export function createRightColumn(
  chatContent?: Record<string, string | number | boolean>[],
) {
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

  const rightColumn = new RightColumnTemplate({
    content: chatContent ? new Chat({ chats: chatContent }) : noChatsTitle,
    message,
  });

  return rightColumn;
}
