import logo from "../../icons/imgLoader.svg";

function getDataStr(d = Date.now()) {
  const date = new Date(d);
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const m =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${h} : ${m}`;
}

export const CHATS_LIST = [
  {
    id: "01",
    title: "Поиграть",
    url: logo,
    comment: [
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
      { text: "Мой коммент", owner: false,  time: getDataStr(), },
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: true,
        time: getDataStr(),
      },
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: false,
        time: getDataStr(),
      },
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
      { text: "Мой коммент", owner: false,  time: getDataStr(), },
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: true,
        time: getDataStr(),
      },
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: false,
        time: getDataStr(),
      },
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: true,
        time: getDataStr(),
      },
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: false,
        time: getDataStr(),
      },
    ],
    count: 2,
  },
  {
    id: "02",
    title: "Поиграть",
    url: logo,
    comment: [
      { text: "Надоела эта верстка", owner: false , time: getDataStr(),},
      { text: "Мой коммент", owner: false,  time: getDataStr(), },
      { text: "Мой коммент", owner: true ,  time: getDataStr(),},
    ],
    count: 2,
  },
  {
    id: "03",
    title: "Поиграть",
    url: logo,
    comment: [
      {
        text: "Мой коммент очень очень много раз коммент коммент коммент коммент",
        owner: true,
        time: getDataStr(),
      },
      { text: "Мой коммент", owner: false ,  time: getDataStr(),},
      { text: "Мой коммент", owner: true,  time: getDataStr(), },
    ],
    count: 2,
  },
];
