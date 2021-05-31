import React from "react";
import ExplorePost from "./ExplorePost";

// 첫 화면 로딩 시, 게시물 목록을 axios 요청을 보낸 후  map을 사용하여 <ExplorePost/> 를 랜더링해준다
// 검색어 요청 시, Redux에 저장한 데이터를 useSelector로 가져와서 랜더링한다.
// useEffect를 사용하여 useSelector로 가져온 데이터의 값이 변경될 때 마다 해당 함수를 실행하게 하면 될 것 같다
// async await를 사용하여 비동기 처리를 해야함. 로딩하고 있는 gif를 추가해야할듯
function ExploreList() {
  return (
    <div id="ExploreList-container">
      <div id="ExploreList-filter">
        <select>
          <option value="최신순">최신순</option>
          <option value="인기순">인기순</option>
        </select>
        <select>
          <option value="전체">전체</option>
          <option value="수험생">수험생</option>
          <option value="공시생">공시생</option>
          <option value="고시생">고시생</option>
          <option value="대학생">대학생</option>
          <option value="기타">기타</option>
        </select>
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
