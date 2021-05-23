import React from "react";
import ExplorePost from "./ExplorePost";

// 게시물 목록을 axios 요청을 보낸 후,받아와 map을 사용하여 <ExplorePost/> 를 랜더링해준다
function ExploreList() {
  return (
    <div id="ExploreList-container">
      <div id="ExploreList-filter">
        인기순, 직업별로 필터링하는 select box가 들어옴
      </div>
      <div id="ExploreList-posts">
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
        <ExplorePost />
      </div>
    </div>
  );
}

export default ExploreList;
