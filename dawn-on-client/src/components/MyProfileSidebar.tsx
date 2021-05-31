import { useDispatch } from "react-redux";
import { getEditProfileState } from "../module/EditProfileModule";

// 로그인,회원가입 모달창의 닫기버튼과 비슷하게 EditProfile 컴포넌트 상태값을 Redux에 boolean타입으로 저장하여
// true,false로 열고 닫기를 수행한다

type MyProfileProps = {
  user_nickname: string;
  user_img: any;
  user_job: string;
  user_comment: string;
  total_learning_time: number;
  total_posting: number;
};

function MyProfileSidebar({
  user_nickname,
  user_img,
  user_job,
  user_comment,
  total_learning_time,
  total_posting,
}: MyProfileProps) {
  const dispatch = useDispatch();

  return (
    <div id="MyProfileSidebar-container">
      <div id="MyProfileSide-main-title">MY feed</div>
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
              <div id="user_nickname">Nickname:{user_nickname}</div>
              <div id="user_job">Job:{user_job}</div>
            </div>
          </div>

          <div id="info-container-2">
            <div id="user_comment_title">Comment</div>
            <div id="user_comment">{user_comment}</div>
          </div>
        </div>

        {/* 경계선 */}
        <div id="info-2">
          <div id="total_posting">게시물 총 갯수: {total_posting}</div>
          <div id="total_learning_time">
            총 공부한 시간: {total_learning_time}
          </div>
        </div>
      </div>
      <div id="MyProfileSide-stars">획득한 별은 더미 데이터로 표현함</div>
    </div>
  );
}

export default MyProfileSidebar;
