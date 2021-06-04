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
  // const isChecked = function (firstPost: object) {
  //   if (Object.keys(click_exploreview).length === 0) {
  //     dispatch(getClickExploreView(firstPost));
  //   }
  // };

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
        dispatch(getClickExploreView(click_exploreview));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Social_Login_getToken();
    get_MainFeed_Data();
    window.setTimeout(() => {
      // isChecked(exploreList[0]);
      searchThumbsUpHandler();
    }, 200);
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
