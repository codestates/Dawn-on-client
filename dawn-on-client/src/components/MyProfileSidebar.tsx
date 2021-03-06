import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getEditProfileState } from "../module/EditProfileModule";

// 로그인,회원가입 모달창의 닫기버튼과 비슷하게 EditProfile 컴포넌트 상태값을 Redux에 boolean타입으로 저장하여
// true,false로 열고 닫기를 수행한다

type MyProfileInfo = {
  user_nickname: string;
  user_img: string;
  user_job: string;
  profile_comment: string;
  total_learning_time: number;
  total_posting: number;
};

function MyProfileSidebar() {
  const dispatch = useDispatch();

  const MyFeedInfo: MyProfileInfo = useSelector((status: RootState) => {
    return status.getMyFeedListReducer.MyFeedinfo;
  });

  let user_nickname = MyFeedInfo.user_nickname;
  let user_img = MyFeedInfo.user_img;
  let user_job = MyFeedInfo.user_job;
  let profile_comment = MyFeedInfo.profile_comment;
  let total_learning_time = MyFeedInfo.total_learning_time;
  let total_posting = MyFeedInfo.total_posting;

  return (
    <div id="MyProfileSidebar-container">
      <div id="MyProfileSide-main-title">MY FEED</div>
      <div id="MyProfileSide-info">
        <div id="info-1">
          {/* 이곳은 프로필사진, 닉네님, 직업군, 코멘트가 보여질 공간입니다 */}
          <i
            className="far fa-edit"
            onClick={() => {
              dispatch(getEditProfileState(true));
            }}
          ></i>
          <div id="info-container-1">
            <div id="info-subcontainer-1">
              {user_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img alt="프로필 사진" className="profile-img" src={user_img} />
              )}
            </div>
            <div id="info-subcontainer-2">
              <div>Nickname</div>
              <div id="user_nickname">{user_nickname}</div>
              <div>Job</div>
              <div id="user_job">{user_job}</div>
            </div>
          </div>

          <div id="info-container-2">
            <div id="user_comment_title">Bio</div>
            <div id="user_comment">{profile_comment}</div>
          </div>
        </div>

        {/* 경계선 */}
        <div id="info-2">
          <div id="total_posting">TOTAL POSTING COUNT</div>
          <div id="total_posting_num"> {total_posting}</div>
          <div id="total_learning_time">TOTAL RUNNING TIME </div>
          <div id="total_learning_time_num"> {total_learning_time}</div>
        </div>
      </div>
      <div id="MyProfileSide-stars"></div>
    </div>
  );
}

export default MyProfileSidebar;
