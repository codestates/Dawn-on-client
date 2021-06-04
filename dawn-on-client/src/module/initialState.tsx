import moment from "moment";
const today = moment().format("YYYY-MM-DD");
const initialState = {
  isLogin: false,
  isEditProfile: false,
  subject: ["국어", "수학"],
  tags: ["취준", "개발", "코딩"],
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
  MyPostThumbsUpCount: Number,
  ExploreThumbsUpCount: Number,
  SearchValue: String,
};

export default initialState;
