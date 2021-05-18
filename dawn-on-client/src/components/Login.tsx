import React from "react";
import "../App.css";

type LoginProps = {
  LoginModal: boolean;
  closeModal: any;
};

function Login({ LoginModal, closeModal }: LoginProps) {
  return (
    <>
      {LoginModal ? (
        <div>
          <div id="login-modal">
            로그인 모달창 들어올 곳
            <button onClick={() => closeModal()}>닫기</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Login;
