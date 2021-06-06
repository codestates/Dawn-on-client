import MyPost from "./MyPost";
import empty_folder from "../img/empty_folder.png";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// map함수를 이용하여 게시물 목록을 각각 하나씩 렌더링한다
// 인피니티 스크롤사용...

// 가장 오래된 순으로 입력되어서 역순으로 maping을 하여 랜더링함
function MyPostList() {
  const MyFeedList = useSelector((status: RootState) => {
    return status.getMyFeedListReducer.MyFeedList;
  });

  let data_Size = 0;
  data_Size = MyFeedList.length ? MyFeedList.length : 0;

  return (
    <div id="MyPostList-container">
      <div id="MyPostList-subtitle">MY POST LIST</div>
      {data_Size !== 0 ? (
        <div id="MyPostList-posts">
          {MyFeedList.map((post: any) => (
            <MyPost key={post.id} postData={post} />
          ))}
        </div>
      ) : (
        <div id="postDatas-empty">
          <img alt="empty_img" src={empty_folder} />
          <div id="postDatas-empty-comment">목록이 비어있습니다</div>
        </div>
      )}
    </div>
  );
}

export default MyPostList;
