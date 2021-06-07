// import styled from "@emotion/styled";
import swal from "sweetalert";
import "../css/login.css";
import "../App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLoginState } from "../module/isLogin";
import styled, { keyframes } from "styled-components";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import kakaoTalk from "../img/KakaoTalk.png";
import google from "../img/google.png";
import "antd/dist/antd.css";

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
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px;
  rgba(0, 0, 0, 0.05) 0px 5px 10px;
  opacity: 0.96;
  border-radius: 20px;
  width: 500px;
  height: 500px;
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
  color: #2e4c8c;
`;

// 로그인 성공 시, Redux-persist에 해당 사용자의 정보, 로그인 상태값, accessToken을 저장시켜줘야한다
function Login({ closeLoginModal, openJoinModal }: LoginProps) {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const Local_loginRequestHandler = async function (
    user_id: string,
    user_password: string
  ) {
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
      });
  };

  // 로그인 창 form
  const LoginForm = () => {
    const onFinish = (values: any) => {
      console.log("입력한 회원가입 정보", values);
      const { user_id, user_password } = values;
      Local_loginRequestHandler(user_id, user_password);
    };

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <span className="login-title">Log In</span>
        <Form.Item
          name="user_id"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User ID"
          />
        </Form.Item>
        <Form.Item
          name="user_password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ height: "40px" }}
          >
            Log in
            <i className="fas fa-sign-in-alt"></i>
          </Button>
          <span
            className="go-to-join"
            onClick={() => {
              openJoinModal();
              closeLoginModal();
            }}
          >
            아직 회원이 아니신가요?
          </span>
        </Form.Item>
        <Button
          className="social-btn"
          id="kakao"
          onClick={kakakoLogins}
          style={{ height: "40px" }}
        >
          <img src={kakaoTalk} alt="카카오톡 이미지" className="social-img" />
          Kakao LogIn
        </Button>
        <Button
          className="social-btn"
          id="google"
          onClick={googleLogins}
          style={{ height: "40px" }}
        >
          <img src={google} alt="구글 이미지" className="social-img" />
          Google LogIn
        </Button>
      </Form>
    );
  };

  return (
    <>
      <div>
        <LoginContainer>
          <CloseButton className="close-btn" onClick={() => closeLoginModal()}>
            <i className="far fa-times-circle"></i>
          </CloseButton>
          <LoginForm />
        </LoginContainer>
      </div>
    </>
  );
}

export default Login;
