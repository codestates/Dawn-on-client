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

  // 소셜 로그인 성공 후, explore 페이지로 리디랙션 된다.
  // 이후, 서버로부터 토큰을 받아온다
  const Social_Login_getToken = async function () {
    await axios
      .get("http://localhost:4000/auth/signin/check", {
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
        console.log(err);
        swal("token 가져오기 실패", "", "error");
        history.push("/");
        dispatch(getLoginState(false));
      });
  };

  // main feed 데이터 받아오는 함수
  const get_MainFeed_Data = async function () {
    await axios
      .get("http://localhost:4000/posts/mainfeed", {
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

        console.log("모아보기 게시물 목록 데이터", res.data.postDatas);
        console.log("Ranking 데이터", res.data.ranking);
        console.log("현재보여지는 데이터", click_exploreview);
      })
      .catch((err) => {
        console.log(err);
        swal("main feed 데이터 가져오기 실패", "", "error");
      });
  };

  let click_PK: number;
  click_exploreview ? click_PK = click_exploreview.id : click_PK = 0;
  const searchThumbsUpHandler = async function () {
    await axios
      .post(
        "http://localhost:4000/posts/search-thumbsup",
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
        console.log("explore 가리키는 페이지", click_exploreview);
        dispatch(getClickExploreView(click_exploreview));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //아이디 검색 함수
  const search_User_Handler = async function (nick_name: string) {
    await axios
      .post(
        "http://localhost:4000/posts/search-user",
        { user_nickname: nick_name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res: any) => {
        console.log("아이디 검색 데이터", res);
        console.log("검색한 아이디값", res.data.postings);
        dispatch(getExploreList(res.data.postings));
        dispatch(getClickExploreView(res.data.postings[0]));
      })
      .then(() => {
        // dispatch(getSearchValue(""));
      })
      .catch((err) => {
        console.log(err);
        swal("검색하신 결과가 없습니다", "", "warning");
      });
  };

  //태그 검색 함수
  const search_Tag_Handler = async function (tag: string) {
    await axios
      .post(
        "http://localhost:4000/posts/search-tag",
        { tag: tag },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("태그 검색 데이터", res);
        console.log("검색한 태그값", res.data.postDatas);
        dispatch(getExploreList(res.data.postDatas));
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .then(() => {
        // dispatch(getSearchValue(""));
      })
      .catch((err) => {
        console.log(err);
        swal("검색하신 결과가 없습니다", "", "warning");
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
    console.log('SearchValue: ' ,SearchValue);
    if (SearchValue) {
      ExploreList_Handler();
      dispatch(getSearchValue(""));
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
