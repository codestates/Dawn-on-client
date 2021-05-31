/* 나의 피드 페이지
1. MyProfileSidebar  ( 왼쪽 : 내 개인 피드에서 보여지는 기본 정보 ) 
2. EditProfile ( “정보수정” 버튼 클릭 시, MyPostList 와 MyPostView가 차지하고 있는 컴포넌트가 사라지고 그 자리에 랜더링 )
    1. Edit 취소 버튼 생성해야함
    2. 프로필 사진 , 닉네임 ,코멘트, 직업군, 비밀번호(비밀번호 확인), / 소셜 로그인은 프로필과 비밀번호 변경 불가
3. MyPostList ( 중앙 : 내가 작성한 게시물들의 썸네일 박스의 썸네일들이 보여지는 리스트 ) 
    1. MyPost ( 중앙 : 썸네일 리스트에 담겨있는 내가 작성한 각각의 플래너 박스  )  👉 [ MyPostList ]
        1. Delete 버튼 O
4. MyPostView ( 오른쪽 : 플래너 박스 클릭 시 , 보여주는 상세 페이지 )
    1. Edit 버튼 O
*/
import { useEffect, useState } from "react";
import "../css/myfeed.css";
import MyProfileSidebar from "../components/MyProfileSidebar";
import MyPostList from "../components/MyPostList";
import MyPostView from "../components/MyPostView";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";

function MyFeed() {
  const isEditProfile = useSelector((status: RootState) => {
    return status.isEditProfileReducer.isEditProfile;
  });

  const [MyfeedInfo, setMyfeedInfo] = useState({
    user_nickname: "",
    user_img: null,
    user_job: "",
    user_comment: "",
    total_learning_time: 0,
    total_posting: 0,
    postDatas: [],
  });

  const {
    user_nickname,
    user_img,
    user_job,
    user_comment,
    total_learning_time,
    total_posting,
    postDatas,
  } = MyfeedInfo;

  const getMyfeedInfo = function () {
    axios
      .get(`http://localhost:4000/posts/myfeed`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res: any) => {
        console.log("Myfeed: 전달받은 전체 데이터", res);
        console.log("Myfeed: 게시물 목록 데이터", res.data.postDatas);
        console.log("Myfeed: 유저데이터", res.data.userDatas);
        const postDatas = res.data.postDatas;
        const userDatas = res.data.userDatas;
        // setMyfeedInfo를 이용하여 값을 저장한다
        setMyfeedInfo({
          user_nickname: userDatas.user_nickname,
          user_img: userDatas.user_img,
          user_job: userDatas.user_job,
          user_comment: userDatas.profile_comment,
          total_learning_time: userDatas.total_learning_time,
          total_posting: userDatas.total_posting,
          postDatas: postDatas,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getMyfeedInfo(), []);

  // ######### My Feed 접속 시, 전체 페이지에 hooks에 저장한 데이터들을 각각의 컴포넌트에 props로 넘겨준다 #########
  return (
    <div id="MyFeed-container">
      <MyProfileSidebar
        user_nickname={user_nickname}
        user_img={user_img}
        user_job={user_job}
        user_comment={user_comment}
        total_learning_time={total_learning_time}
        total_posting={total_posting}
      />
      <MyPostList postDatas={postDatas} />
      <MyPostView />
      {isEditProfile && <EditProfile />}
    </div>
  );
}

export default MyFeed;
