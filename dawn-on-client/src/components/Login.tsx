import styled from "@emotion/styled";
import swal from "sweetalert";
import "../css/login.css";
import "../App.css";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLoginState } from "../module/isLogin";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";

const googleClientID =
  "89393125923-mkfjgjjtfd75qt39snddv1po0lfca2l0.apps.googleusercontent.com";

const kakaoJSkeys = "91e640cbb9c3ec3d5acef0ef3f7fdc28";

type LoginProps = {
  closeLoginModal: any;
  openJoinModal: any;
};

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 0.2fr;
  background-color: #faee9d;
  border-radius: 5px;
  width: 500px;
  height: 350px;
  margin: -175px 0 0 -250px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
`;
const CloseButton = styled.button`
  outline: none;
  border: none;
  background-color: #faee9d;
  justify-self: right;
  font-size: 1.5rem;
  margin-top: 10px;
  color: #2b3390;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
`;

function Login({ closeLoginModal, openJoinModal }: LoginProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
    user_id: "",
    user_password: "",
  });
  const { user_id, user_password } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Google Login
  // 소셜 로그인을 위한 axios 요청를 따로 사용해야함
  const responseGoogle = (res: any) => {
    console.log("구글: 전체 데이터", res);
    console.log("구글: 사용자 프로필 데이터", res.profileObj);
    dispatch(getLoginState(true));
    closeLoginModal();
    history.push("/explore");
  };

  //Kakao Login
  const responseKaKao = (res: any) => {
    console.log("카카오톡 로그인 성공:", res);
    dispatch(getLoginState(true));
    closeLoginModal();
    history.push("/explore");
  };

  // Login Fail
  const responseFail = (err: any) => {
    console.error(err);
    swal("로그인 실패", "", "warning");
  };

  const loginRequestHandler = function () {
    console.log("입력한 사용자 정보", form);
    axios
      .post(
        `https://localhost:4000/signin`,
        { user_id: user_id, user_password: user_password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        swal("로그인되었습니다", "", "success");
        // Explore 페이지로 리디렉션.
        dispatch(getLoginState(true));
        history.push("/explore");
      })
      .catch((err) => {
        console.log(err);
        swal("ID와 Password가 일치하지 않습니다", "", "error");
      });
  };

  return (
    <>
      <div>
        <LoginContainer>
          <CloseButton className="close-btn" onClick={() => closeLoginModal()}>
            <i className="far fa-times-circle"></i>
          </CloseButton>
          <div id="login-title">LOG IN</div>
          <div id="login-input-container">
            <input
              className="login-input-id"
              name="user_id"
              value={user_id}
              placeholder="ID"
              onChange={onChange}
            />
            <input
              className="login-input-pw"
              name="user_password"
              value={user_password}
              placeholder="비밀번호"
              type="password"
              onChange={onChange}
            />
            <button
              id="login-to-join"
              onClick={() => {
                openJoinModal();
                closeLoginModal();
              }}
            >
              아직 계정이 없으신가요?
            </button>
            <button
              id="login-btn"
              onClick={() => {
                loginRequestHandler();
              }}
            >
              LOG IN
            </button>
          </div>
          <div id="login-btn-container">
            <GoogleLogin
              clientId={googleClientID}
              buttonText="Google로 로그인하기"
              onSuccess={responseGoogle}
              onFailure={responseFail}
              // render={(props: any) => (
              //   <button onClick={props.onClick}>구글 로그인</button>
              // )}
            />
            <KakaoLogin
              token={kakaoJSkeys}
              onSuccess={responseKaKao}
              onFail={responseFail}
              onLogout={console.info}
              useLoginForm
            />
          </div>
        </LoginContainer>
      </div>
    </>
  );
}

export default Login;
