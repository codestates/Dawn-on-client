/* 나의 피드 페이지
1. MyProfileSidebar  ( 왼쪽 : 내 개인 피드에서 보여지는 기본 정보 ) 
2. EditProfile ( “정보수정” 버튼 클릭 시, MyPostList 와 MyPostView가 차지하고 있는 컴포넌트가 사라지고 그 자리에 랜더링 )
    1. Edit 취소 버튼 생성해야함
    2. 프로필 사진 , 닉네임 ,코멘트, 직업군, 비밀번호(비밀번호 확인),
3. MyPostList ( 중앙 : 내가 작성한 게시물들의 썸네일 박스의 썸네일들이 보여지는 리스트 ) 
    1. MyPost ( 중앙 : 썸네일 리스트에 담겨있는 내가 작성한 각각의 플래너 박스  )  👉 [ MyPostList ]
        1. Delete 버튼 O
4. MyPostView ( 오른쪽 : 플래너 박스 클릭 시 , 보여주는 상세 페이지 )
    1. Edit 버튼 O
*/
import React from "react";
import "../css/myfeed.css";
import MyProfileSidebar from "../components/MyProfileSidebar";
import MyPostList from "../components/MyPostList";
import MyPostView from "../components/MyPostView";

function MyFeed() {
  return (
    <div id="MyFeed-container">
      <MyProfileSidebar />
      <MyPostList />
      <MyPostView />
    </div>
  );
}

export default MyFeed;
