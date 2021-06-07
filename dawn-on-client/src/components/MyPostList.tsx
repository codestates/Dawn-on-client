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

  const data_Size = MyFeedList.length ? MyFeedList.length : 0;

  const count_checked_handler = (todos: Array<any>) => {
    let count_checked = 0;
    let percentage = 0;
    for (let todo_card of todos) {
      if (todo_card.checked === true) {
        count_checked = count_checked + 1;
      }
    }
    percentage = Math.floor((count_checked / todos.length) * 100);
    return percentage;
  };

  return (
    <div id="MyPostList-container">
      <div id="MyPostList-subtitle">MY POST LIST</div>
      {data_Size !== 0 ? (
        <div id="MyPostList-posts">
          {MyFeedList.map((post: any) => (
            <MyPost
              key={post.id}
              postData={post}
              percentage={count_checked_handler(post.todos)}
            />
          ))}
        </div>
      ) : (
        <div id="postDatas-empty">
          <img alt="empty_img" src={empty_folder} />
          <div id="postDatas-empty-comment">List is empty</div>
        </div>
      )}
    </div>
  );
}

export default MyPostList;
