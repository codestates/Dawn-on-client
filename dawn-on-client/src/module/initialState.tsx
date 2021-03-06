import moment from "moment";
const today = moment().format("YYYY-MM-DD");
const initialState = {
  isLogin: false,
  isEditProfile: false,
  subject: ["Korean", "Frontend"],
  tags: ["Dawn", "On", "Project"],
  plannerDatas: {
    date: today,
    sticker: "sticker01",
    memo: "오늘도 화이팅 : )",
    comment: "힘들어..",
    hour: "6h30m",
    selected_tags: [],
    back_color: "#fff",
    todos: [],
  },
  click_postview: {},
  click_exploreview: {},
  ExploreList: [],
  MyFeedList: [],
  MyFeedinfo: {
    user_nickname: "",
    user_img: "",
    user_job: "",
    profile_comment: "",
    total_learning_time: 0,
    total_posting: 0,
  },
  ranking_first: {
    user_img: "",
    user_nickname: "",
    total_thumbsup: 0,
  },
  ranking_second: {
    user_img: "",
    user_nickname: "",
    total_thumbsup: 0,
  },
  ranking_third: {
    user_img: "",
    user_nickname: "",
    total_thumbsup: 0,
  },
  MyPostThumbsUp: Boolean,
  ExploreThumbsUp: Boolean,
  SearchValue: String,
};

export default initialState;
