// Login Modal, Join Modal <-> Button: 검색,플래너 작성,모아보기,개인피드, 로그아웃 (조건부 랜더링)
import React, { useState } from "react";
import Login from "./Login";
import "../App.css";

function Nav() {
  // 로그인에 성공하면 조건부 렌더링을 이용하여 버튼들이 바뀐다
  const [isLogin, setisLogin] = useState<boolean>(false);

  // 로그인 , 회원가입 모달창을 boolean값을 사용하여 열고 닫는다
  const [JoinModal, setJoinModal] = useState<boolean>(false);
  const [LoginModal, setLoginModal] = useState<boolean>(false);

  const openModal = function () {
    setLoginModal(true); 
  };

  const closeModal = function () {
    setLoginModal(false);
  };

  return (
    <div id="nav-container">
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
        <div>
          <Login LoginModal={LoginModal} closeModal={closeModal} />
          <button className="landing-btn">회원가입</button>
          <button
            className="landing-btn"
            onClick={() => {
              openModal();
            }}
          >
            로그인
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;
