/*
모아보기
1. ExploreSidebar (  왼쪽 : 랭킹 및 잡다한거 보여는  사이드 바)
2. ExploreList ( 중앙 : 다른 사용자들의 플래너 박스의 썸네일들이 보여지는 리스트 )
    1. Select Box 존재 ( 리스트 내 게시물 필터링 기능)
    2. ExplorePost ( 중앙 : 썸네일 리스트에 담겨있는 각각의 플래너 박스) 👉 [ ExploreList ]
        1. Delete 버튼 X
3. ExplorePostView ( 오른쪽 : 플래너 박스 클릭 시,  보여주는 상세 페이지)
    1. Edit 버튼 X
*/

/* 
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
아이디 검색 기능과 아이디 클릭 기능은 같은 요청 처리로 해결 가능
검색창에서 해시태그를 검색할 경우, 조건문으로 분기
*/

// 모아보기 게시물 초기값은 최신순, 전체 게시물

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

function Explore() {
  const history = useHistory();
  const dispatch = useDispatch();

  const click_exploreview = useSelector((status: RootState) => {
    return status.getClickExploreViewReducer.click_exploreview;
  });

  const exploreList = useSelector((status: RootState) => {
    return status.getExploreListReducer.ExploreList;
  });

  //현재 클릭한 게시물이 없다면(로그인하고 첫 main에 들어간 상태라면)
  //첫번째 게시물을 보여준다
  const isChecked = function (firstPost: object) {
    if (Object.keys(click_exploreview).length === 0) {
      dispatch(getClickExploreView(firstPost));
    }
  };

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

        // 첫번째 게시물 데이터 저장 (객체)
        window.setTimeout(() => {
          isChecked(exploreList[0]);
          searchThumbsUpHandler();
        }, 200);
        // isChecked(exploreList[0]);
        // searchThumbsUpHandler();

        console.log("모아보기 게시물 목록 데이터", res.data.postDatas);
        console.log("Ranking 데이터", res.data.ranking);
        console.log("현재보여지는 데이터", click_exploreview);
      })
      .catch((err) => {
        console.log(err);
        swal("main feed 데이터 가져오기 실패", "", "error");
      });
  };

  const searchThumbsUpHandler = async function () {
    await axios
      .post(
        "http://localhost:4000/posts/search-thumbsup",
        { post_PK: click_exploreview.id },
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Social_Login_getToken();
    get_MainFeed_Data();
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
