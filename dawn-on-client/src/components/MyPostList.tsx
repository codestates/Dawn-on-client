import React from "react";
import MyPost from "./MyPost";
import empty_folder from "../img/empty_folder.png";

// map함수를 이용하여 게시물 목록을 각각 하나씩 렌더링한다
// 인피니티 스크롤사용...
type MyPostListProps = {
  postDatas: Array<any>;
};

function MyPostList({ postDatas }: MyPostListProps) {
  console.log("게시물 목록에 전달받은 데이터: ", postDatas);
  return (
    <div id="MyPostList-container">
      <div id="MyPostList-subtitle">내 게시물 목록</div>
      {postDatas.length === 0 ? (
        // <div id="postDatas-empty">
        //   <img alt="empty_img" src={empty_folder} />
        //   <div id="postDatas-empty-comment">목록이 비어있습니다</div>
        // </div>
        <div id="MyPostList-posts">
          <MyPost postData={postDatas} />
          <MyPost postData={postDatas} />
          <MyPost postData={postDatas} />
          <MyPost postData={postDatas} />
          <MyPost postData={postDatas} />
          <MyPost postData={postDatas} />
          <MyPost postData={postDatas} />
        </div>
      ) : (
        <div id="MyPostList-posts">
          {postDatas.map((post) => (
            <MyPost key={post.id} postData={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPostList;
