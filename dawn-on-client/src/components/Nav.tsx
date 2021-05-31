// Login Modal, Join Modal <-> Button: 검색,플래너 작성,모아보기,개인피드, 로그아웃 (조건부 랜더링)
import { useState } from "react";
import Login from "./Login";
import Join from "./Join";
import "../App.css";
import axios from "axios";
import swal from "sweetalert";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState } from "../module/isLogin";
import { useHistory } from "react-router-dom";

// 검색 기능 로직 구현하기
const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // 로그인에 성공하면 조건부 렌더링을 이용하여 버튼들이 바뀐다
  const isLogin = useSelector((status: RootState) => {
    return status.isLoginReducer.isLogin;
  });

  // 검색한 값을 임시 저장해두고 검색버튼 클릭 시, 해당 변수를 사용한다
  const [search, setsearch] = useState<string>("");
  // console.log("검색: ", search);

  // 로그인 , 회원가입 모달창을 boolean값을 사용하여 열고 닫는다
  const [JoinModal, setJoinModal] = useState<boolean>(false);
  const [LoginModal, setLoginModal] = useState<boolean>(false);

  const openLoginModal = function () {
    setLoginModal(true);
  };

  const closeLoginModal = function () {
    setLoginModal(false);
  };

  const openJoinModal = function () {
    setJoinModal(true);
  };

  const closeJoinModal = function () {
    setJoinModal(false);
  };

  // 로그아웃 함수 => 로컬 로그아웃은 성공돠나, 소셜 로그아웃은 실패됌
  const logoutRequestHandler = function () {
    const accessToken = window.localStorage.getItem("accessToken");

    axios
      .post(
        `http://localhost:4000/auth/signout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        swal("로그아웃되었습니다", "", "success");
        dispatch(getLoginState(false));
        history.push("/");
        window.localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
        swal("로그아웃 실패", "", "error");
      });
  };

  return (
    <div id="nav-container">
      <h1 id="nav-logo">Dawn-on</h1>
      {isLogin ? (
        <div id="nav-main-btn-container">
          <div>
            <input
              id="main-nav-search"
              placeholder="아이디 혹은 테그를 검색하세요"
              onChange={(e) => setsearch(e.target.value)}
            />
            <button>Search</button>
          </div>
          <button className="main-nav">Make a Planner</button>
          <button className="main-nav" onClick={() => history.push("/explore")}>
            Explore
          </button>
          <button className="main-nav" onClick={() => history.push("/myfeed")}>
            My Feed
          </button>
          <button
            className="main-nav"
            onClick={() => {
              logoutRequestHandler();
            }}
          >
            Log OUT
          </button>
        </div>
      ) : (
        <div id="nav-landing-btn-container">
          <button
            className="landing-btn"
            onClick={() => {
              openJoinModal();
              closeLoginModal();
            }}
          >
            JOIN
          </button>
          {JoinModal && (
            <Join
              closeJoinModal={closeJoinModal}
              openLoginModal={openLoginModal}
            />
          )}
          <button
            className="landing-btn"
            onClick={() => {
              openLoginModal();
              closeJoinModal();
            }}
          >
            LOGIN
          </button>
          {LoginModal && (
            <Login
              closeLoginModal={closeLoginModal}
              openJoinModal={openJoinModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
