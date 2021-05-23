import React from "react";

//응원해요 랭킹, 별 랭킹 각각의 axios요청 2개를 보내서 랜더링해준다
function ExploreSidebar() {
  return (
    <div id="ExploreSidebar-container">
      <div id="ExploreSide-main-title">모아보기</div>
      <div id="ExploreSide-like-ranking">응원해요 랭킹</div>
      <div id="ExploreSide-star-ranking">별 랭킹</div>
    </div>
  );
}

export default ExploreSidebar;
