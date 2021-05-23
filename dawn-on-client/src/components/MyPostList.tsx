import React from "react";
import MyPost from "./MyPost";

//axios요청으로 게시물 목록을 불러와 map함수를 이용하여 렌더링한다
function MyPostList() {
  return (
    <div id="MyPostList-container">
      <div id="MyPostList-subtitle">목록</div>
      <div id="MyPostList-posts">
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
        <MyPost />
      </div>
    </div>
  );
}

export default MyPostList;
