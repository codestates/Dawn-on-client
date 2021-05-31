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
[ Explore 기능 관련 정리]
검색 버튼 클릭 시, 무적권 explore 페이지로 리디랙션해야함
모아보기 게시물 목록의 경우 Redux로 저장하고 useSelector로 가져온다
useEffect를 사용하여 useSelector로 가져온 값이 변동되면 리스트를 랜더링 하는 함수가 작동되도록 로직 구현

1) (서버 해결방법) axios 요청 : [ 검색, 아이디 클릭, 직업군 정렬 각각의 요청처리로 사용 ]
해당 검색어 혹은 회원 아이디를 포함하고 있는 게시물들을 배열형태로 받아와서 Redux에 저장한다
axios요청으로 구현한다면 값만 보내주면 받아와서 랜더링하면 끝이기 때문에 가장 간편함

2) (클라이언트 해결방법) 게시물 탐색/정렬 로직 구현 : 전체 데이터를 다 받아온 후 redux에 저장
검색 값, 아이디 값, 정렬하는 값에 따른 액션을 분기하고 reducer내에서  switch-case에 맞춰 값을 바꿔준다 
해당 요건을 만족하는 값(검색,아이디,정렬 순)들만 findAll로 찾아 값을 변경 시켜준다
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
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { useEffect } from "react";

function Explore() {
  const history = useHistory();
  const dispatch = useDispatch();

  const Social_Login_getToken = function () {
    axios
      .get("http://localhost:4000/auth/signin/check", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("소셜 로그인 성공");
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

  useEffect(() => Social_Login_getToken(), []);

  return (
    <div id="Explore-container">
      <ExploreSidebar />
      <ExploreList />
      <ExplorePostView />
    </div>
  );
}

export default Explore;
