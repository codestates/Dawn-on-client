import styled from "@emotion/styled";
import swal from "sweetalert";
import "../css/login.css"
import "../App.css";
import axios from "axios";
import React, { useState } from "react";

type LoginProps = {
  LoginModal: boolean;
  closeModal: any;
};

function Login({ LoginModal, closeModal }: LoginProps) {
  console.log(LoginModal);
  const [form, setForm] = useState({
    user_id: '',
    user_pw: ''
  });
  const { user_id, user_pw } = form;
  console.log(form);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target;
    console.log("etarget: ", e.target)
    setForm({
      ...form,
      [name]: value
    });
  };
  
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   // 여기도 모르니까 any 로 하겠습니다.
  //   e.preventDefault();
  //   onSubmit(form);
  //   setForm({
  //     user_id: '',
  //     user_pw: ''
  //   }); // 초기화
  // };


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
     {LoginModal ? (
        <div>
          <div id="login-modal">
          <LoginContainer>
          <CloseButton className="login-close-btn" onClick={() => closeModal()}>
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
                ></input>
                <input
                  className="login-input-pw"
                  name="user_pw"
                  value={user_pw}
                  placeholder="비밀번호"
                  type="password"
                  onChange={onChange}
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
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Login;
