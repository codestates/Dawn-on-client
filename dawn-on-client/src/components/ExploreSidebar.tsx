import React from "react";

//응원해요 랭킹, 별 랭킹 각각의 axios요청 2개를 각각 보내서 랜더링해준다
//각 랭킹에 적힌 사용자의 아이디 클릭 시, 해당 사용자가 작성한 게시물들을 필터링하여 볼수 있다.
// 검색 기능과 마찬가지로 axios요청을 보내 데이터들을 받아와 Redux에 저장시킨다.

function ExploreSidebar() {
  return (
    <div id="ExploreSidebar-container">
      <div id="ExploreSide-main-title">모아보기</div>
      <div id="ExploreSide-like-ranking">전체 좋아요가 많은 유저 랭킹</div>
      <div id="ExploreSide-star-ranking">별 랭킹 (더미 데이터로 표현한다)</div>
    </div>
  );
}

export default ExploreSidebar;
