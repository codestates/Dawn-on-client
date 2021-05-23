import React from "react";

// 삭제 버튼 추가하기 (axios요청을 보내 DB: 배열에서 삭제시킨 후 리랜더링)
// 클릭 이벤트로, 박스 하나 클릭하면 해당 박스의 데이터를 Redux로 저장하여 useSelector로 불러온 후 View에 랜더링 한다
function MyPost() {
  return (
    <div className="MyPost-container">
      MyPostList 안에 각각의 게시물 박스입니다
      <button>삭제</button>
    </div>
  );
}

export default MyPost;
