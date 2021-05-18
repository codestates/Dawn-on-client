import styled from "@emotion/styled";
import swal from "sweetalert";
import "../css/login.css"
import axios from "axios";
import { useHistory } from "react-router";
import React, { useState } from "react";

function Login () {
  const [user_id, setUserID] = useState("");
  const [user_pw, setUserPW] = useState("");

  const loginRequestHandler = function () {
    axios
      .post(
        `https://api.acme.com/signin`,
        { user_id: user_id, user_pw: user_pw },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        swal("로그인되었습니다", "", "success");
        // Explore 페이지로 리디렉션.
      })
      .catch((err) => {
        console.log(err);
        swal("ID와 Password가 일치하지 않습니다", "", "error");
      });
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
  `
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
  `

  
  return(
    <>
      <LoginContainer>
      <CloseButton className="login-close-btn">
          <i className="far fa-times-circle"></i>
      </CloseButton>
        <div id="login-title">LOG IN</div>
        <div id="login-input-container">
            <input
              className="login-input-id"
              placeholder="ID"
              onChange={(e) => {setUserID(e.target.value)}}
            ></input>
            <input
              className="login-input-pw"
              placeholder="비밀번호"
              type="password"
              onChange={(e) => {setUserPW(e.target.value)}}
            ></input>
            <button
              id="login-to-join"
            >
              아직 계정이 없으신가요?
            </button>
          </div>

            <button
              id="login-btn"
              onClick={() => {
                loginRequestHandler();
              }}
            >
              LOG IN
            </button>
      </LoginContainer>
    </>
  )
}

export default Login;