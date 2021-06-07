import swal from "sweetalert";
import "../App.css";
import "../css/join.css";
import axios from "axios";
import $ from "jquery";
import styled, { keyframes } from "styled-components";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

type JoinProps = {
  closeJoinModal: Function;
  openLoginModal: Function;
};

const JoinContainer = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px;
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
  justify-self: right;
  font-size: 1.5rem;
  margin-top: 10px;
  color: #2e4c8c;
`;

function Join({ closeJoinModal, openLoginModal }: JoinProps) {
  const Local_joinRequestHandler = async function (
    user_id: string,
    user_password: string,
    user_nickname: string,
    user_job: string
  ) {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/auth/signup`,
        {
          userdto: {
            user_id: user_id,
            user_password: user_password,
            user_nickname: user_nickname,
            user_job: user_job,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {
        swal("회원가입 되었습니다", "", "success");
        closeJoinModal();
        openLoginModal();
      })
      .catch((err) => {
        console.log(err);
        swal("아이디가 중복됩니다", "", "error");
        // 낙네임도 중복되면 회원가입 불가
      });
  };

  // 화원가입 모달창 form
  const RegistrationForm = () => {
    const [form] = Form.useForm();

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    const onFinish = (values: any) => {
      console.log("회원가입한 정보 ", values);
      const { user_id, user_password, user_nickname, user_job } = values;
      Local_joinRequestHandler(user_id, user_password, user_nickname, user_job);
    };

    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="join-form"
      >
        <span className="join-title">Sign Up</span>
        <Form.Item
          name="user_id"
          label="ID"
          rules={[
            {
              required: true,
              message: "Please input your ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="check"
          label="Password Check"
          dependencies={["user_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please check your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("user_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="user_nickname"
          label="Nickname"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user_job"
          label="Job"
          rules={[{ required: true, message: "Please select job!" }]}
          style={{ textAlign: "center" }}
        >
          <Select placeholder="Select your job">
            <Option value="수험생" style={{ textAlign: "center" }}>
              수험생
            </Option>
            <Option value="공시생" style={{ textAlign: "center" }}>
              공시생
            </Option>
            <Option value="고시생" style={{ textAlign: "center" }}>
              고시생
            </Option>
            <Option value="대학생" style={{ textAlign: "center" }}>
              대학생
            </Option>
            <Option value="기타" style={{ textAlign: "center" }}>
              기타
            </Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
            style={{ justifySelf: "center", height: "40px" }}
          >
            Sign Up
            <i className="fas fa-user-plus"></i>
          </Button>
          <span
            className="go-to-login"
            onClick={() => {
              openLoginModal();
              closeJoinModal();
            }}
          >
            혹시 계정이 있으신가요?
          </span>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      <JoinContainer>
        <CloseButton
          className="close-btn"
          onClick={() => {
            closeJoinModal();
          }}
        >
          <i className="far fa-times-circle"></i>
        </CloseButton>
        <RegistrationForm />
      </JoinContainer>
    </>
  );
}

export default Join;
