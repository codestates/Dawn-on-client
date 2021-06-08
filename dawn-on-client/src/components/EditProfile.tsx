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

  // const [fileUrl, setFileUrl] = useState<any>(null);

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
      } else {
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
  const getEditPageInfo = async function () {
    const accessToken = window.localStorage.getItem("accessToken");
    await axios
      .get(`${process.env.REACT_APP_URI}/auth/mypage`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res: any) => {
        // setMyfeedInfo를 이용하여 값을 저장한다
        setMyInfo({
          ...MyInfo,
          user_nickname: res.data.user.user_nickname,
          user_img: res.data.user.user_img,
          user_job: res.data.user.user_job,
          profile_comment: res.data.user.profile_comment,
          provider: res.data.user.provider,
        });
        $(".userinfo-selectbox")
          .val(res.data.user.user_job)
          .prop("selected", true);
        return res;
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // 수정완료된 유저의 정보에 대해서 수정요청을 보낸다
  const patchEditPageInfo = async function () {
    // const accessToken = window.localStorage.getItem("accessToken");
    await axios
      .patch(
        `${process.env.REACT_APP_URI}/auth/mypage`,
        {
          user_nickname: user_nickname,
          user_img: user_img,
          user_password: user_password,
          user_job: user_job,
          profile_comment: profile_comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken}`,
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
        }, 1000);
      })
      .catch((err) => {
        // swal("개인정보 수정 불가 오류", "", "error");
        console.log(err);
      });
  };

  const checkEditinfo = function () {
    if (user_password !== user_passwordcheck) {
      return swal("비밀번호를 다시 확인해주세요", "", "error");
    } else if (user_nickname === "") {
      return swal("닉네임을 작성해주세요", "", "error");
    }
    return patchEditPageInfo();
  };

  useEffect(() => {
    getEditPageInfo();
  }, []);

  return (
    <div id="EditProfile-container">
      <div id="EditCancel-btn-container">
        <button
          className="EditCancel-btn edit-action"
          onClick={() => {
            checkCancelAlert();
          }}
        >
          Cancel
        </button>
      </div>
      {provider && provider === "local" ? (
        <div id="localLogin-container">
          {/* Local Login */}
          <div className="Editinfo-img-container">
            {/* 프로필 사진 수정 가능 => 버튼 추가하기 */}
            {user_img === "" || user_img === null ? (
              <i className="fas fa-user-circle"></i>
            ) : (
              <img alt="프로필 사진" className="profile-img" src={user_img} />
            )}
            <button>업로드</button>
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
            <div className="Editinfo-title">Bio</div>
            <input
              type="text"
              className="userinfo-input-comment"
              name="profile_comment"
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
          {/* Social Login */}
          <div className="Editinfo-img-container">
            {/* 프로필 사진 수정 [불가능] */}
            {user_img === "" || user_img === null ? (
              <i className="fas fa-user-circle"></i>
            ) : (
              <img alt="프로필 사진" className="profile-img" src={user_img} />
            )}
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
            <div className="Editinfo-title">Bio</div>
            <input
              type="text"
              className="userinfo-input-comment"
              name="profile_comment"
              value={profile_comment}
              onChange={onChange}
            />
          </div>
          <div className="Editinfo-job-container">
            <div className="Editinfo-title">Job</div>
            <select className="userinfo-selectbox" onChange={getSelectValue}>
              <option value="default">- 직업을 선택해주세요 -</option>
              <option value="전체">전체</option>
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
          className="EditSave-btn edit-action"
          onClick={() => {
            checkEditinfo();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
