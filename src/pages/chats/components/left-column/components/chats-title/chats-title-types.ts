export type TChatsTitle = {
  chats: {
    id: string;
    title: string;
    url: string;
    comment: { text: string; owner: boolean; time: string };
    count: number;
  }[];
};
