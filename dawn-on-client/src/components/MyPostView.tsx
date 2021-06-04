import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MyPostThumbsUp } from "../module/ClickPostViewModule";
import { useDispatch } from "react-redux";

function MyPostView() {
  const dispatch = useDispatch();

  const click_postview = useSelector((status: RootState) => {
    return status.getClickPostViewReducer.click_postview;
  });

  // 게시물이 있으면 제일 최상단의 게시물을 디폴트값으로 보여준다
  // 현재 게시물 목록의 가장 첫번째 게시물의 데이터를 myfeed get요청 시, Redux로 저장시켜 값을 가져온다

  const MyFeedList = useSelector((status: RootState) => {
    return status.getMyFeedListReducer.MyFeedList;
  });

  //클릭한 게시물의 PK값
  let click_PK: number;
  click_PK = click_postview.id;

  //내 게시물의 좋아요 유무
  const isClickThumbsUp = useSelector((status: RootState) => {
    return status.getClickPostViewReducer.MyPostThumbsUp;
  });

  const date = new Date(click_postview.date).toLocaleString();

  console.log(isClickThumbsUp);

  const changeThumbsUpHandler = async function () {
    await axios
      .post(
        "http://localhost:4000/posts/change-thumbsup",
        { post_PK: click_PK },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "up") {
          dispatch(MyPostThumbsUp(true));
          console.log("좋아요 클릭");
        } else if (res.data === "down") {
          dispatch(MyPostThumbsUp(false));
          console.log("좋아요 취소");
        }
      })
      .then(() => {
        window.location.replace("/myfeed");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 만약, 게시물이 없으면 게시물 목록 조건부랜더링처럼 없다고 표시해준다
  return (
    <div id="MyPostView-container">
      {MyFeedList.length === 0 ? (
        <div>게시물 없음</div>
      ) : (
        <>
          <div id="MyPostView-Render">
            <div>게시물 작성날짜: {date}</div>
            <div>게시물 메모: {click_postview.memo}</div>
            <div>게시물 코멘트: {click_postview.comment}</div>
            <div>게시물 PK: {click_PK}</div>
          </div>
          <div id="MyPostView-Footer">
            <div>
              {isClickThumbsUp ? (
                <i
                  className="fas fa-heart"
                  id="MyFeed-full-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              ) : (
                <i
                  className="far fa-heart"
                  id="MyFeed-empty-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              )}
              <button id="EditPost-btn">Edit</button>
            </div>
            <div>
              <div>Comment</div>
              <div>{click_postview.comment}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyPostView;
