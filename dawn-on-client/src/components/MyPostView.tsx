import React from "react";

// Edit 버튼 추가. 커스텀 플래너 페이지로 이동한다 (여기서, 해당 게시물에 대한 정보도 함께 들고 간다)
// MyPost 컴포넌트에서 클릭 이벤트로 Redux에 저장된 해당 게시물의 데이터를 useSelector로 가져와 랜더링한다
// 스크롤 기능도 넣어야한다
// 게시물이 있으면 제일 최상단의 게시물을 디폴트값으로 보여준다
// 만약, 게시물이 없으면 게시물 목록 조건부랜더링처럼 없다고 표시해준다
// 상세 보기 페이지 하단에 좋아요 버튼추가 (내가 내 게시물에 대해서 좋아요 누를수 있음)
function MyPostView() {
  return (
    <div id="MyPostView-container">
      MyPostList 안의 MyPost 클릭 시 오른쪽에 상세 페이지로 보여질 공간입니다
      <button>Edit</button>
    </div>
  );
}

export default MyPostView;
