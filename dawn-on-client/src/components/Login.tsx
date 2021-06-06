// import styled from "@emotion/styled";
import swal from "sweetalert";
import "../css/login.css";
import "../App.css";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLoginState } from "../module/isLogin";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

type LoginProps = {
  closeLoginModal: Function;
  openJoinModal: Function;
};

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  grid-template-rows: 0.2fr 1fr 1fr 1fr 1fr 0.2fr;
  background-color: #f5eded;
  background-image: linear-gradient(217deg, #f5eded 0%, #ffffff 100%);
  opacity: 0.96;
  border-radius: 20px;
  width: 500px;
  height: 450px;
  margin: -225px 0 0 -225px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  animation-duration: 0.47s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;
const CloseButton = styled.button`
  outline: none;
  border: none;
  background:none
  justify-self: right;
  font-size: 1.5rem;
  margin-top: 10px;
  color: #2b3390;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
`;

// 로그인 성공 시, Redux-persist에 해당 사용자의 정보, 로그인 상태값, accessToken을 저장시켜줘야한다
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

  // 로그인 성공 시, 서버로부터 token을 받아온다
  async function Local_Login_getToken() {
    await axios
      .get(`${process.env.REACT_APP_URI}/auth/signin/check`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        //Token을 LocalStorge에 저장해서 다른 axios에서 필요할 때마다 사용한다
        //추가적으로 로그인한 사용자의 고유 Primary key를 저장해줘야한다
        window.localStorage.setItem("accessToken", res.data.accessToken);
        window.localStorage.setItem("refreshToken", res.data.refreshToken);

        // 로그인 모달창 닫기
        closeLoginModal();
        // 로그인 상태값 true로 변경
        dispatch(getLoginState(true));
      })
      .catch((err) => {
        console.log(err);
        swal("token 가져오기 실패", "", "error");
        history.push("/");
        dispatch(getLoginState(false));
      });
  }

  //구글 로그인
  const googleLogins = () => {
    window.open(`${process.env.REACT_APP_URI}/auth/google`, "_self");
    closeLoginModal();
  };

  //카카오톡 로그인
  const kakakoLogins = () => {
    window.open(`${process.env.REACT_APP_URI}/auth/kakao`, "_self");
    closeLoginModal();
  };

  //로컬 로그인 함수
  const Local_loginRequestHandler = async function () {
    console.log("로그인한 사용자 정보", form);
    await axios
      .post(
        `${process.env.REACT_APP_URI}/auth/signin`,
        { user_id: user_id, user_password: user_password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {
        Local_Login_getToken();
      })
      .then(() => {
        closeLoginModal();
        dispatch(getLoginState(true));
        history.push("/explore");
      })
      .catch((err) => {
        console.log(err);
        swal("ID와 Password가 일치하지 않습니다", "", "error");
        /*         Swal.fire({
          title: "ID와 Password가 일치하지 않습니다",
          width: 600,
          padding: "3em",
          background: "",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
        }); */
      });
  };

  return (
    <>
      <div>
        <LoginContainer id="a">
          <CloseButton className="close-btn" onClick={() => closeLoginModal()}>
            <i className="far fa-times-circle"></i>
          </CloseButton>
          <div id="login-title">LOG IN</div>
          <div id="login-input-container">
            <span id="login-input">ID</span>

            <input
              className="login-input-id"
              name="user_id"
              value={user_id}
              placeholder="your ID"
              onChange={onChange}
            />
            <span id="login-input">PASSWORD</span>

            <input
              className="login-input-pw"
              name="user_password"
              placeholder="your password"
              value={user_password}
              type="password"
              onChange={onChange}
            />
          </div>
          <div id="login-join">
            <button
              id="login-to-join"
              onClick={() => {
                openJoinModal();
                closeLoginModal();
              }}
            >
              아직 회원이 아니신가요?
            </button>

            <button
              id="login-btn"
              onClick={() => {
                Local_loginRequestHandler();
              }}
            >
              LOG IN
            </button>
          </div>
          <div id="login-btn-container">
            <button
              id="google-btn"
              onClick={() => {
                googleLogins();
              }}
            >
              google 로그인
            </button>
            <button
              id="kakao-btn"
              onClick={() => {
                kakakoLogins();
              }}
            >
              kakao 로그인
            </button>
          </div>
        </LoginContainer>
      </div>
    </>
  );
}

export default Login;
