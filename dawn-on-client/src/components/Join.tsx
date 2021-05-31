import React, { useState } from "react";
import styled from "@emotion/styled";
import swal from "sweetalert";
import "../App.css";
import "../css/join.css";
import axios from "axios";
import $ from "jquery";

type JoinProps = {
  closeJoinModal: Function;
  openLoginModal: Function;
};

const JoinContainer = styled.div`
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
  grid-column: 6 / 7;
  grid-row: 1 / 2;
`;

function Join({ closeJoinModal, openLoginModal }: JoinProps) {
  const [form, setForm] = useState({
    user_id: "",
    user_nickname: "",
    user_job: "",
    user_password: "",
    user_passwordcheck: "",
  });

  const {
    user_id,
    user_nickname,
    user_job,
    user_password,
    user_passwordcheck,
  } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 셀렉트 박스 value값 가져오기
  const getSelectValue = () => {
    const value = $("#join-selectbox option:selected").text();
    setForm({
      ...form,
      user_job: value,
    });
  };

  //입력하다 말고 닫기 버튼 누르면 그동안 Hooks에 임시저장된 데이터 다시 초기화
  const clearformData = () => {
    setForm({
      user_id: "",
      user_nickname: "",
      user_job: "",
      user_password: "",
      user_passwordcheck: "",
    });
  };

  // 입력한 정보 확인 및 비밀번호 확인검사
  const checkInputDataHandler = function () {
    console.log("회원가입 정보: ", form);
    const formdata = Object.values(form);
    for (let data of formdata) {
      if (data === "") {
        return swal("회원가입 목록을 다시 작성해주세요", "", "warning");
      }
    }
    if (user_password !== user_passwordcheck) {
      return swal("비밀번호가 일치하지 않습니다", "", "warning");
    }
    Local_joinRequestHandler();
  };

  const Local_joinRequestHandler = function () {
    console.log("회원가입 데이터", form);
    axios
      .post(
        `http://localhost:4000/auth/signup`,
        {
          userdto: {
            user_id: user_id,
            user_password: user_password,
            user_nickname: user_nickname,
            user_job: user_job,
            // provider: "local",
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {
        swal("회원가입 되었습니다", "", "success");
        clearformData();
        closeJoinModal();
        openLoginModal();
      })
      .catch((err) => {
        console.log(err);
        swal("아이디가 중복됩니다", "", "error");
        // 낙네임도 중복되면 회원가입 불가
      });
  };

  return (
    <>
      <JoinContainer>
        <CloseButton
          className="close-btn"
          onClick={() => {
            closeJoinModal();
            clearformData();
          }}
        >
          <i className="far fa-times-circle"></i>
        </CloseButton>
        <div id="join-title">Join</div>
        <div className="join-input-container">
          <input
            className="join-input"
            id="login-input-nickname"
            name="user_nickname"
            value={user_nickname}
            placeholder="닉네임"
            onChange={onChange}
          />
          <input
            className="join-input"
            id="login-input-id"
            name="user_id"
            value={user_id}
            placeholder="아이디"
            onChange={onChange}
          />
          <select
            className="join-input"
            id="join-selectbox"
            onChange={getSelectValue}
          >
            <option value="default">- 직업을 선택해주세요 -</option>
            <option value="수험생">수험생</option>
            <option value="공시생">공시생</option>
            <option value="고시생">고시생</option>
            <option value="대학생">대학생</option>
            <option value="기타">기타</option>
          </select>
          <input
            className="join-input"
            id="login-input-password"
            name="user_password"
            value={user_password}
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
          />
          <input
            className="join-input-passwordcheck"
            id="login-input-id"
            name="user_passwordcheck"
            value={user_passwordcheck}
            type="password"
            placeholder="비밀번호 확인"
            onChange={onChange}
          />
        </div>
        <button
          className="join-signup-btn"
          onClick={() => {
            checkInputDataHandler();
          }}
        >
          SIGN UP
        </button>
      </JoinContainer>
    </>
  );
}

export default Join;
