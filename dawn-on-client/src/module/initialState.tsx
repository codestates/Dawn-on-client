const initialState = {
  isLogin: false,
  tasks: {
    'task-1': { id: 'task-1', subject:'국어', content: '6월 모의고사 풀이', hour: 2},
    'task-2': { id: 'task-2', subject:'영어', content: '9월 모의고사 오답노트', hour: 1 },
    'task-3': { id: 'task-3', subject:'국어', content: '비문학 공부', hour:2 },
    'task-4': { id: 'task-4', subject:'생명과학', content: '2019 수능 문제 풀이', hour:1 }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Time table',
      taskIds: ['task-1', 'task-2', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'To Do',
      taskIds: ['task-3']
    },
  },
};

export default initialState;
