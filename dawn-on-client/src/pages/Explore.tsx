/*
모아보기
1. ExploreSidebar (  왼쪽 : 랭킹 및 잡다한거 보여는  사이드 바)
2. ExploreList ( 중앙 : 다른 사용자들의 플래너 박스의 썸네일들이 보여지는 리스트 )
    1. Select Box 존재 ( 리스트 내 게시물 필터링 기능)
    2. ExplorePost ( 중앙 : 썸네일 리스트에 담겨있는 각각의 플래너 박스) 👉 [ ExploreList ]
        1. Delete 버튼 X
3. ExplorePostView ( 오른쪽 : 플래너 박스 클릭 시,  보여주는 상세 페이지)
    1. Edit 버튼 X
*/
import React from "react";
import "../css/explore.css";
import ExploreSidebar from "../components/ExploreSidebar";
import ExploreList from "../components/ExploreList";
import ExplorePostView from "../components/ExplorePostView";

function Explore() {
  return (
    <div id="Explore-container">
      <ExploreSidebar />
      <ExploreList />
      <ExplorePostView />
    </div>
  );
}

export default Explore;
