import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getEditProfileState } from "../module/EditProfileModule";
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";

// 1. 프로필 사진 , 닉네임 ,코멘트, 직업군, 비밀번호(비밀번호 확인) => 사진 변경 시, 로컬에서 직접 사진을 선택하게끔 한다
// 2. 수정 완료 버튼 추가해야한다
// -> 소셜 로그인 할 경우, 비밀번호 및 프로필 사진 수정 불가 => "provider"를 이용하여 조건부 랜더링

// GET: 수정할 사용자의 데이터를 받아서 랜더링한다
// PATCH: 수정한 정보들을 담아서 보내준다

function EditProfile() {
  const dispatch = useDispatch();

  const [MyInfo, setMyInfo] = useState({
    user_nickname: "",
    user_img: "",
    user_password: "",
    user_job: "",
    profile_comment: "",
    provider: "",
    user_passwordcheck: "",
  });

  const {
    user_nickname,
    user_img,
    user_password,
    user_job,
    profile_comment,
    provider,
    user_passwordcheck,
  } = MyInfo;

  const clearMyInfoData = () => {
    dispatch(getEditProfileState(false));
    setMyInfo({
      ...MyInfo,
      user_nickname: "",
      user_img: "",
      user_password: "",
      user_job: "",
      profile_comment: "",
      provider: "",
    });
  };

  $(".userinfo-selectbox").val(user_job).prop("selected", true);

  // 수정 취소 버튼 클릭 시, 작동하는 함수
  const checkCancelAlert = function () {
    swal({
      title: "수정을 취소하시겠습니까?",
      icon: "warning",
      dangerMode: true,
      closeOnClickOutside: false,
      buttons: ["No", true],
    }).then((willDelete) => {
      if (willDelete) {
        clearMyInfoData();
        console.log("프로필 수정 취소");
      } else {
        console.log("프로필 수정 유지");
      }
    });
  };

  // input 박스 안의 값 실시간으로 받아오기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyInfo({
      ...MyInfo,
      [name]: value,
    });
  };

  // 셀렉트 박스 value값 가져오기
  const getSelectValue = () => {
    const value = $(".userinfo-selectbox option:selected").text();
    setMyInfo({
      ...MyInfo,
      user_job: value,
    });
  };

  // 해당 유저의 정보를 서버로부터 받아온다
  const getEditPageInfo = function () {
    const accessToken = window.localStorage.getItem("accessToken");
    axios
      .get(`http://localhost:4000/auth/mypage`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res: any) => {
        console.log("mypage 데이터:", res.data);
        // setMyfeedInfo를 이용하여 값을 저장한다
        setMyInfo({
          ...MyInfo,
          user_nickname: res.data.user_nickname,
          user_img: res.data.user_img,
          // user_password: res.data.user_password,
          user_job: res.data.user_job,
          profile_comment: res.data.profile_comment,
          provider: res.data.provider,
        });
      })
      .then(() => {
        console.log("mypage 데이터:  edit 페이지에 성공적으로 랜더링");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 수정완료된 유저의 정보에 대해서 수정요청을 보낸다
  const patchEditPageInfo = function () {
    const accessToken = window.localStorage.getItem("accessToken");
    const user_PK = window.localStorage.getItem("user_PK");
    axios
      .patch(
        `http://localhost:4000/auth/mypage`,
        {
          user_PK: user_PK,
          user_nickname: user_nickname,
          user_img: user_img,
          user_password: user_password,
          user_job: user_job,
          profile_comment: profile_comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        clearMyInfoData();
        swal("수정완료 되었습니다", "", "success");
      })
      .then(() => {
        window.setTimeout(() => {
          window.location.replace("/myfeed");
        }, 1500);
      })
      .catch((err) => {
        if (err.status === 401) {
          swal(
            "로그인 유효기간이 만료되었습니다. 다시 로그인 해주세요",
            "",
            "error"
          );
        } else {
          console.log(err);
        }
      });
  };

  const checkEditinfo = function () {
    if (user_password !== user_passwordcheck) {
      return swal("비밀번호를 다시 확인해주세요", "", "error");
    }
    return patchEditPageInfo();
  };

  useEffect(() => getEditPageInfo(), []);

  return (
    <div id="EditProfile-container">
      <div id="EditCancel-btn-container">
        <button
          id="EditCancel-btn"
          onClick={() => {
            checkCancelAlert();
          }}
        >
          수정 취소
        </button>
      </div>
      {provider === "local" ? (
        <div id="localLogin-container">
          Local Login
          <div className="Editinfo-img-container">
            {/* 프로필 사진 수정 가능 => 버튼 추가하기 */}
            {user_img === null ? (
              <i className="fas fa-user-circle"></i>
            ) : (
              <img alt="프로필 사진" className="profile-img" src={user_img} />
            )}
            {/* React Multer 기능 이용하기 */}
            <button id="Editinfo-img-btn">수정</button>
          </div>
          <div className="Editinfo-name-container">
            <div className="Editinfo-title">Nickname</div>
            <input
              type="text"
              className="userinfo-input"
              name="user_nickname"
              value={user_nickname}
              onChange={onChange}
            />
          </div>
          <div className="Editinfo-comment-container">
            <div className="Editinfo-title">Comment</div>
            <input
              type="text"
              className="userinfo-input comment"
              name="user_comment"
              value={profile_comment}
              onChange={onChange}
            />
          </div>
          <div className="Editinfo-job-container">
            <div className="Editinfo-title">Job</div>
            <select className="userinfo-selectbox" onChange={getSelectValue}>
              <option value="default">- 직업을 선택해주세요 -</option>
              <option value="수험생">수험생</option>
              <option value="공시생">공시생</option>
              <option value="고시생">고시생</option>
              <option value="대학생">대학생</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="Editinfo-password-container">
            <div className="Editinfo-title">Password</div>
            <input
              type="password"
              className="userinfo-input"
              name="user_password"
              value={user_password}
              onChange={onChange}
            />
          </div>
          <div className="Editinfo-passwordCheck-container">
            <div className="Editinfo-title">Password Check</div>
            <input
              type="password"
              className="userinfo-input"
              name="user_passwordcheck"
              value={user_passwordcheck}
              onChange={onChange}
            />
          </div>
        </div>
      ) : (
        <div id="socialLogin-container">
          Social Login
          <div className="Editinfo-img-container">
            {/* 프로필 사진 수정 [불가능] */}
            {/* {user_img === "" ? (
              <i className="fas fa-user-circle"></i>
            ) : (
              <img alt="프로필 사진" className="profile-img" src={user_img} />
            )} */}
            <img alt="프로필 사진" className="profile-img" src={user_img} />
          </div>
          <div className="Editinfo-name-container">
            <div className="Editinfo-title">Nickname</div>
            <input
              type="text"
              className="userinfo-input"
              name="user_nickname"
              value={user_nickname}
              onChange={onChange}
            />
          </div>
          <div className="Editinfo-comment-container">
            <div className="Editinfo-title">Comment</div>
            <input
              type="text"
              className="userinfo-input comment"
              name="user_comment"
              value={profile_comment}
              onChange={onChange}
            />
          </div>
          <div className="Editinfo-job-container">
            <div className="Editinfo-title">Job</div>
            <select className="userinfo-selectbox" onChange={getSelectValue}>
              <option value="default">- 직업을 선택해주세요 -</option>
              <option value="수험생">수험생</option>
              <option value="공시생">공시생</option>
              <option value="고시생">고시생</option>
              <option value="대학생">대학생</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
      )}
      <div className="EditSave-btn-container">
        <button
          className="EditSave-btn"
          onClick={() => {
            checkEditinfo();
          }}
        >
          수정완료
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
