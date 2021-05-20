// Login Modal, Join Modal <-> Button: 검색,플래너 작성,모아보기,개인피드, 로그아웃 (조건부 랜더링)
import { useState } from "react";
import Login from "./Login";
import Join from "./Join";
import "../App.css";

function Nav() {
  // 로그인에 성공하면 조건부 렌더링을 이용하여 버튼들이 바뀐다
  const [isLogin, setisLogin] = useState<boolean>(false);

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

  return (
    <div id="nav-container">
      <h1 id="nav-logo">Dawn-on</h1>
      {isLogin ? (
        <div>
          <input
            className="main-nav"
            placeholder="아이디 혹은 테그를 검색하세요"
          />
          <button className="main-nav">플래너 작성</button>
          <button className="main-nav">모아보기</button>
          <button className="main-nav">개인피드</button>
          <button className="main-nav">로그아웃</button>
        </div>
      ) : (
        <div id="nav-btn-container">
          <button
            className="landing-btn"
            onClick={() => {
              openJoinModal();
              closeLoginModal();
            }}
          >
            회원가입
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
            로그인
          </button>
          {LoginModal && (
            <Login
              closeLoginModal={closeLoginModal}
              openJoinModal={openJoinModal}
              setisLogin={setisLogin}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Nav;
