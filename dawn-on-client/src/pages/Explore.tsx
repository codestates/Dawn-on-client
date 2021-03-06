import "../css/explore.css";
import ExploreSidebar from "../components/ExploreSidebar";
import ExploreList from "../components/ExploreList";
import ExplorePostView from "../components/ExplorePostView";
import axios from "axios";
import { getLoginState } from "../module/isLogin";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useEffect } from "react";
import {
  ExploreThumbsUp,
  getClickExploreView,
} from "../module/ClickExploreViewModule";
import { getExploreList } from "../module/ExplorePostListModule";
import { getRankingFirst } from "../module/ExploreRankingListModule";
import { getRankingSecond } from "../module/ExploreRankingListModule";
import { getRankingThird } from "../module/ExploreRankingListModule";
import { RootState } from "../store/store";
import { getSearchValue } from "../module/SearchModule";

function Explore() {
  const history = useHistory();
  const dispatch = useDispatch();

  const SearchValue = useSelector((status: RootState) => {
    return status.getSearchValueReducer.SearchValue;
  });

  const click_exploreview = useSelector((status: RootState) => {
    return status.getClickExploreViewReducer.click_exploreview;
  });

  // 현재 클릭한 게시물이 없다면(로그인하고 첫 main에 들어간 상태라면)
  // 첫번째 게시물을 보여준다
  const isChecked = function (firstPost: object) {
    if (Object.keys(click_exploreview).length === 0) {
      dispatch(getClickExploreView(firstPost));
    }
  };

  // 소셜 로그인 성공 후, explore 페이지로 리디랙션 된다.
  // 이후, 서버로부터 토큰을 받아온다
  const Social_Login_getToken = async function () {
    await axios
      .get(`${process.env.REACT_APP_URI}/auth/signin/check`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        //Token을 LocalStorge에 저장해서 다른 axios에서 필요할 때마다 사용한다
        window.localStorage.setItem("accessToken", res.data.accessToken);
        window.localStorage.setItem("refreshToken", res.data.refreshToken);

        // 로그인 상태값 true로 변경
        dispatch(getLoginState(true));
      })
      .catch((err) => {
        swal("token 가져오기 실패", "", "error");
        history.push("/");
        dispatch(getLoginState(false));
      });
  };

  // main feed 데이터 받아오는 함수
  const get_MainFeed_Data = async function () {
    await axios
      .get(`${process.env.REACT_APP_URI}/posts/mainfeed`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // 랭킹 데이터 저장(배열)
        dispatch(getRankingFirst(res.data.ranking[0] || {}));
        dispatch(getRankingSecond(res.data.ranking[1] || {}));
        dispatch(getRankingThird(res.data.ranking[2] || {}));

        // 모아보기 게시물 데이터 저장 (배열)
        dispatch(getExploreList(res.data.postDatas || []));
        return res;
      })
      .then((res) => {
        isChecked(res.data.postDatas[0]);
      })
      .catch((err) => {
        swal("main feed 데이터 가져오기 실패", "", "error");
      });
  };

  let click_PK: number;
  click_exploreview ? (click_PK = click_exploreview.id) : (click_PK = 0);
  const searchThumbsUpHandler = async function () {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-thumbsup`,
        { post_PK: click_PK },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        //해당 게시물 좋아요 유무 넘겨줌
        dispatch(ExploreThumbsUp(res.data));
        dispatch(getClickExploreView(click_exploreview));
      })
      .catch((err) => {
      });
  };

  //아이디 검색 함수
  const search_User_Handler = async function (nick_name: string) {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-user`,
        { user_nickname: nick_name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res: any) => {
        dispatch(getExploreList(res.data.postDatas));
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .then(() => {
        dispatch(getSearchValue(""));
      })
      .catch((err) => {
        swal("검색하신 결과가 없습니다", "", "warning");
        dispatch(getSearchValue(""));
      });
  };

  //태그 검색 함수
  const search_Tag_Handler = async function (tag: string) {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-tag`,
        { tag: tag },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(getExploreList(res.data.postDatas));
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .then(() => {
        dispatch(getSearchValue(""));
      })
      .catch((err) => {
        swal("검색하신 결과가 없습니다", "", "warning");
        dispatch(getSearchValue(""));
      });
  };

  const ExploreList_Handler = function () {
    if (SearchValue[0] === "#") {
      return search_Tag_Handler(SearchValue.substring(1));
    } else {
      return search_User_Handler(SearchValue);
    }
  };

  useEffect(() => {
    Social_Login_getToken();
  }, []);
  useEffect(() => {
    searchThumbsUpHandler();
  }, []);
  useEffect(() => {
    if (SearchValue && SearchValue.length > 0) {
      ExploreList_Handler();
    } else {
      get_MainFeed_Data();
    }
  }, []);

  return (
    <div id="Explore-container">
      <ExploreSidebar />
      <ExploreList />
      <ExplorePostView />
    </div>
  );
}

export default Explore;
