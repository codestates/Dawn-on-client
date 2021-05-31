const initialState = {
  isLogin: false,
  isEditProfile: false,
  subject_label: [
    {
      subject: '국어',
      color: '#ecf0f1',
    },
    {
      subject: '수학',
      color: '#ecf0f1',
    },
  ],
  plannerDatas: {
    date: "2021-05-18",
    dday: 50,
    today_learning_time: 0,
    memo:"수능만점 받을거야아아앍",
    comment: "힘들어..",
    hour:"6h30m",
    back_color: "#fff",
    todos: [
      {
          id: '1',
          learning_time: 1,
          box_color: "#ecf0f1",
          todo_comment: '오늘 해야할 공부는 이거야',
          subject: '국어',
          start_time: "07:00",
          checked: false,
      },
      {
          id: '2',
          learning_time: 2,
          box_color: "#ecf0f1",
          todo_comment: '오늘 해야할 공부는 이거야',
          subject: '수학',
          start_time: "08:00",
          checked: true,
      },
    ],
    tags : [
      {
          "id": 1,
          "tag": "취준"
      },
      {
          "id": 2,
          "tag": "개발"
      },
      {
          "id": 3,
          "tag": "코딩"
      }
  ]
  }
};

export default initialState;
