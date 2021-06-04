import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { ExploreThumbsUp } from "../module/ClickExploreViewModule";

//MyPost 컴포넌트에서 클릭 이벤트로 Redux에 저장된 해당 게시물의 데이터를 useSelector로 가져와 랜더링한다
function ExplorePostView() {
  const dispatch = useDispatch();

  //게시물 좋아요 클릭 유므
  const isExploreThumbsUp = useSelector((status: RootState) => {
    return status.getClickExploreViewReducer.ExploreThumbsUp;
  });

  console.log(isExploreThumbsUp);
  //모아보기 피드 전체 리스트
  const ExploreList = useSelector((status: RootState) => {
    return status.getExploreListReducer.ExploreList;
  });

  //현재 모아보기 상세 페이지에서 보여지고 있는 게시물의 객체형 데이터
  const click_exploreview = useSelector((status: RootState) => {
    return status.getClickExploreViewReducer.click_exploreview;
  });

  const date = new Date(click_exploreview.date).toLocaleString();

  let click_PK: number;
  click_exploreview ? click_PK = click_exploreview.id : click_PK = 0;
  // click_PK = click_exploreview.id || 0;

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
          dispatch(ExploreThumbsUp(true));
          console.log("좋아요 클릭");
        } else if (res.data === "down") {
          dispatch(ExploreThumbsUp(false));
          console.log("좋아요 취소");
        }
      })
      .then(() => {
        window.location.replace("/explore");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="ExplorePostView-container">
      {ExploreList.length === 0 ? (
        <div>게시물 없음</div>
      ) : (
        <>
          <div id="ExploreView-Render">
            <div>게시물 작성날짜: {date}</div>
            <div>게시물 메모: {click_exploreview.memo}</div>
            <div>게시물 코멘트: {click_exploreview.comment}</div>
            <div>게시물 PK: {click_PK}</div>
          </div>
          <div id="ExploreView-Footer">
            <div>
              {isExploreThumbsUp ? (
                <i
                  className="fas fa-heart"
                  id="Explore-full-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              ) : (
                <i
                  className="far fa-heart"
                  id="Explore-empty-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              )}
            </div>
            <div>
              <div>Comment</div>
              <div>{click_exploreview.comment}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ExplorePostView;
