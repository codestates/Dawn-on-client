// Login Modal, Join Modal <-> Button: 검색,플래너 작성,모아보기,개인피드, 로그아웃 (조건부 랜더링)
import { useState } from "react";
import Login from "./Login";
import Join from "./Join";
import "../App.css";
import axios from "axios";
import swal from "sweetalert";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState } from "../module/isLogin";
import { useHistory } from "react-router-dom";
import { getExploreList } from "../module/ExplorePostListModule";
import { getClickPostView } from "../module/ClickPostViewModule";
import { getClickExploreView } from "../module/ClickExploreViewModule";
import { getMyFeedList } from "../module/MyfeedPostListModule";
import { getEditProfileState } from "../module/EditProfileModule";
import { getSearchValue } from "../module/SearchModule";

// 검색 기능 로직 구현하기
const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // 로그인에 성공하면 조건부 렌더링을 이용하여 버튼들이 바뀐다
  const isLogin = useSelector((status: RootState) => {
    return status.isLoginReducer.isLogin;
  });

  // 검색한 값을 임시 저장해두고 검색버튼 클릭 시, 해당 변수를 사용한다
  const [search, setsearch] = useState<string>("");

  // 로그인 , 회원가입 모달창을 boolean값을 사용하여 열고 닫는다
  const [JoinModal, setJoinModal] = useState<boolean>(false);
  const [LoginModal, setLoginModal] = useState<boolean>(false);

  const openLoginModal = function () {
    setLoginModal(true);
  };

  const closeLoginModal = function () {
    setLoginModal(false);
  };

  const openJoinModal = function () {
    setJoinModal(true);
  };

  const closeJoinModal = function () {
    setJoinModal(false);
  };

  // 로그아웃 함수 => 로컬 로그아웃은 성공돠나, 소셜 로그아웃은 실패됌
  const logoutRequestHandler = async function () {
    const accessToken = window.localStorage.getItem("accessToken");

    await axios
      .post(
        `${process.env.REACT_APP_URI}/auth/signout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch(getLoginState(false));
        // 모아보기, 마이피드 상세 페이지 데이터 초기화
        dispatch(getClickPostView({}));
        dispatch(getClickExploreView({}));
        // 모아보기, 마이피드 게시물 목록 데이터 초기화
        dispatch(getMyFeedList([]));
        dispatch(getExploreList([]));
      })
      .then(() => {
        swal("로그아웃되었습니다", "", "success");
        history.push("/");
        window.localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
        swal("로그아웃 실패", "", "error");
      });
  };

  return (
    <div id="nav-container">
      <h1
        id="nav-logo"
        onClick={() => {
          history.push("/");
          dispatch(getEditProfileState(false));
        }}
      >
        Dawn : on
      </h1>
      {isLogin ? (
        <div id="nav-main-btn-container">
          <div id="search-bar" className="main-nav">
            <div className="searchBox">
              <input
                className="searchInput"
                placeholder="닉네임 혹은 (#)태그를 검색하세요"
                onChange={(e) => setsearch(e.target.value)}
              />
              <div
                className="searchButton"
                onClick={() => {
                  dispatch(getEditProfileState(false));
                  if (search === "") {
                    return swal("검색어를 입력해주세요", "", "warning");
                  } else {
                    dispatch(getSearchValue(search));
                    // history.push("/explore");
                    window.location.replace("/explore");
                  }
                }}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <button
            className="main-nav btn-action"
            onClick={() => history.push("/custom-planner")}
          >
            Make a Planner
          </button>
          <button
            className="main-nav btn-action"
            onClick={() => {
              // history.push("/explore");
              window.location.replace("/explore");
              dispatch(getEditProfileState(false));
            }}
          >
            Explore
          </button>
          <button
            className="main-nav btn-action"
            onClick={() => {
              // history.push("/myfeed");
              window.location.replace("/myfeed");
            }}
          >
            My Feed
          </button>
          <button
            className="main-nav btn-action"
            onClick={() => {
              dispatch(getEditProfileState(false));
              swal({
                title: "로그아웃 하시겠습니까?",
                icon: "warning",
                dangerMode: true,
                closeOnClickOutside: false,
                buttons: ["No", true],
              }).then((willLogout) => {
                if (willLogout) {
                  logoutRequestHandler();
                } else {
                  console.log("로그아웃 취소");
                }
              });
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div id="nav-landing-btn-container">
          <button
            className="landing-btn btn-action"
            onClick={() => {
              openJoinModal();
              closeLoginModal();
            }}
          >
            JOIN
          </button>
          {JoinModal && (
            <Join
              closeJoinModal={closeJoinModal}
              openLoginModal={openLoginModal}
            />
          )}
          <button
            className="landing-btn btn-action"
            onClick={() => {
              openLoginModal();
              closeJoinModal();
            }}
          >
            LOGIN
          </button>
          {LoginModal && (
            <Login
              closeLoginModal={closeLoginModal}
              openJoinModal={openJoinModal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
