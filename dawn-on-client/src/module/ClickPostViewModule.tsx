import initialState from "./initialState";
import moment from "moment";
const today = moment().format('YYYY-MM-DD');


const ADD_NEW_SUBJECT = "ADD_NEW_SUBJECT";
const DELETE_SUBJECT = "DELETE_SUBJECT";
const ADD_A_TODO = "ADD_TO_TODO";
const ADD_MEMO_DATA = "ADD_MEMO_DATA";
const ADD_THE_STICKER = "ADD_THE_STICKER";
const CHANGE_TOTAL_HOUR = "CHANGE_TOTAL_HOUR";
const DELETE_A_TASK = "DELETE_A_TASK";
const CHANGE_BACK_COLOR = "CHANGE_BACK_COLOR";
const ADD_TO_TAGLIST = "ADD_TO_TAGLIST";
const ADD_SELECTED_TAGS = "ADD_SELECTED_TAGS";
const DELETE_A_TAG = "DELETE_A_TAG";
const ADD_COMMENT_DATA = "ADD_COMMENT_DATA";
const EDIT_TODO_DATA = "EDIT_TODO_DATA";
const RESET_AFTER_UPLOAD = "RESET_AFTER_UPLOAD";

const GET_CLICK_POST_VIEW = "GET_CLICK_POST_VIEW";

const MYPOST_THUMBS_UP = "MYPOST_THUMBS_UP";

const CHANGE_CHECKED_STATE = "CHANGE_CHECKED_STATE";


export const getClickPostView = (post: object) => ({
  type: GET_CLICK_POST_VIEW,
  payload: post,
});

export const MyPostThumbsUp = (isThumbsUp: boolean) => ({
  type: MYPOST_THUMBS_UP,
  payload: isThumbsUp,
});
export const addNewSubject = (subject: String) => ({
  type: ADD_NEW_SUBJECT,
  payload: subject,
});

export const fetchState = () => {
  return {type: 'FETCH_STATE'}
}

// 과목 label 삭제 액션
export const deleteSubject = (subject: String) => ({
  type: DELETE_SUBJECT,
  payload: subject,
});

// memo 데이터 추가 액션
export const addMyfeedMemoData = (memo: string) => ({
  type: ADD_MEMO_DATA,
  payload: {
    memo: memo,
  },
});

// sticker 데이터 추가 액션
export const addTheSticker = (sticker: string) => ({
  type: ADD_THE_STICKER,
  payload: sticker,
});

// todo 데이터 추가 액션
export const addToTimetable = (
  todo_PK: string,
  subject: string,
  todo_comment: string,
  start_time: string,
  learning_time: number,
  box_color: any
) => ({
  type: ADD_A_TODO,
  payload: {
    todo_PK: todo_PK,
    subject: subject,
    todo_comment: todo_comment,
    learning_time: learning_time,
    start_time: start_time,
    box_color: box_color,
  },
});

// total hour 저장 액션.
export const changeMyFeedTotalHour = (hour: string) => ({
  type: CHANGE_TOTAL_HOUR,
  payload: hour,
});

// todos 삭제 액션
export const deleteTodo = (todo_PK: number) => ({
  type: DELETE_A_TASK,
  payload: todo_PK,
});

// 배경 변경 액션
export const changeBackColor = (back_color: String) => ({
  type: CHANGE_BACK_COLOR,
  payload: back_color,
});

// 유저 태그 리스트 추가 액션
export const addToTaglist = (tagId: string) => ({
  type: ADD_TO_TAGLIST,
  payload: tagId,
});


// tag 삭제 액션
export const deleteAtag = (tagId: string) => ({
  type: DELETE_A_TAG,
  payload: tagId,
});

// comment 변경 액션
export const addCommentData = (comment: string) => ({
  type: ADD_COMMENT_DATA,
  payload: comment,
});

// edit data patch
export const editTodoData = (editData: any) => ({
  type: EDIT_TODO_DATA,
  payload: editData,
});

export const resetAfterUpload = () => ({
  type: RESET_AFTER_UPLOAD,
});

export const changeCheckedState = (todo_PK: string, checked: boolean) => ({
  type: CHANGE_CHECKED_STATE,
  payload: {
    todo_PK: todo_PK,
    checked: checked,
  },
});

// myfeed에서 클릭한 게시물에 대한 데이터를 저장하는 Reducer
export default function getClickPostViewReducer(
  state: any = initialState,
  action: any
) {
  switch (action.type) {
    case GET_CLICK_POST_VIEW:
      console.log('데이터: ', action.payload);
      return {
        ...state,
        click_postview: { ...action.payload },
      };
    case MYPOST_THUMBS_UP:
      return {
        ...state,
        MyPostThumbsUp: action.payload,
      };
    case ADD_MEMO_DATA:
    return {
      ...state,
      click_postview: {
        ...state.click_postview,
        memo: action.payload.memo,
      },
    };
    case CHANGE_CHECKED_STATE:
      return {
        ...state,
        click_postview: {
          ...state.click_postview,
          todos: state.click_postview.todos.map((todo: any) => {
            console.log(todo.todo_PK);
            console.log(action.payload.todo_PK);
            return todo.todo_PK === action.payload.todo_PK
              ? { ...todo, checked: action.payload.checked }
              : todo;
          }),
        }
      }
      case 'FETCH_STATE': 
      return {
        ...state,
      }

    case ADD_THE_STICKER:
      console.log("스티커데이터: ", action.payload);
      return {
        ...state,
        click_postview: {
          ...state.click_postview,
          sticker: action.payload,
        },
      };
    case CHANGE_BACK_COLOR:
      return {
        ...state,
        click_postview: {
          ...state.click_postview,
          back_color: action.payload,
        },
      };
    case ADD_NEW_SUBJECT:
      return {
        ...state,
        subject: [...state.subject, action.payload],
      };
    case CHANGE_TOTAL_HOUR:
      return {
        ...state,
        click_postview: {
          ...state.click_postview,
          total_learning_time: action.payload,
        },
      };
    case DELETE_SUBJECT:
      const delSubject = state.subject.filter(
        (el: any) => el !== action.payload
      );
      return {
        ...state,
        subject: [...delSubject],
      };
    case ADD_TO_TAGLIST:
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };

    case DELETE_A_TAG:
      const delTag = state.tags.filter((el: any) => el !== action.payload);
      return {
        ...state,
        tags: [...delTag],
      };
    case ADD_COMMENT_DATA:
      return {
        ...state,
        click_postview: {
          ...state.click_postview,
          comment: action.payload,
        },
      };
    case EDIT_TODO_DATA:
      console.log("넘어온 데이터: ", action.payload);
      console.log("모듈: ", state);
      return {
        ...state,
        click_postview: {
          ...state.click_postview,
          todos: state.click_postview.todos.map((todo: any) => {
            console.log(todo);
            return todo.todo_PK === action.payload.todo_PK
              ? action.payload
              : todo;
          })
        },
      };
      case RESET_AFTER_UPLOAD:
      return {
        ...state,
        subject: ["국어", "수학"],
        tags : ["취준", "개발", "코딩"],
        click_postview: {
          ...state.click_postview,
          date: today,
          sticker: "",
          memo: "오늘도 화이팅 : )",
          comment: "",
          hour:"",
          selected_tags : [],
          back_color: "#fff",
          todos: [],   
        }
      };
      default:
        return state;
  }
}
