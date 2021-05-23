import React from "react";
import EditProfile from "./EditProfile";

// axios요청을 보내서 사용자의 개인프로필 데이터를 받아온다
// 개인 프로필에 정보 수정 버튼과 함께 onclick 함수로 EditProfile 컴포넌트가 랜더링되어야한다

// 로그인,회원가입 모달창의 닫기버튼과 비슷하게 EditProfile 컴포넌트 상태값을 Redux에 boolean타입으로 저장하여
// true,false로 열고 닫기를 수행한다
function MyProfileSidebar() {
  return (
    <div id="MyProfileSidebar-container">
      <div id="MyProfileSide-main-title">MYfeed</div>
      <div id="MyProfileSide-info">
        <div id="info-1">
          이곳은 프로필사진, 닉네님, 직업군, 코멘트가 보여질 공간입니다
        </div>
        <div id="info-2">
          이곳은 정보수정 버튼, 게시물 수, 총 공부한 시간이 보여질 공간입니다
        </div>
      </div>
      <div id="MyProfileSide-stars">획득한 별</div>
    </div>
  );
}

export default MyProfileSidebar;
