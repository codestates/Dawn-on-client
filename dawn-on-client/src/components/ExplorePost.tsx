import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getClickExploreView } from "../module/ClickExploreViewModule";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ExploreThumbsUp } from "../module/ClickExploreViewModule";
import axios from "axios";

type ExplorePostProps = {
  postData: {
    users: {
      user_nickname: string;
      user_img: string;
    };
    id: number;
    thumbs_up: number;
    tags: Array<any>;
    todos: Array<any>;
  };
};

// 클릭 이벤트로, 박스 하나 클릭하면 해당 박스의 데이터를 Redux로 저장하여 useSelector로 불러온 후 View에 랜더링 한다
function ExplorePost({ postData }: ExplorePostProps) {
  const dispatch = useDispatch();

  const post_PK = postData.id; // 수정할때도 필요하다
  const user_nickname = postData.users.user_nickname;
  const user_img = postData.users.user_img;
  const thumbs_up = postData.thumbs_up;
  const tags = postData.tags;
  const todos = postData.todos;
  const post = postData; // post 전체 데이터

  let count_checked = 0;

  const count_checked_handler = () => {
    for (let todo_card of todos) {
      if (todo_card.checked !== false) {
        console.log("체크값에 true가 있는 카드", todo_card);
        count_checked = count_checked + 1;
      }
    }
  };

  const searchThumbsUpHandler = async function () {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-thumbsup`,
        { post_PK: post_PK },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        //클릭한 게시물 데이터 넘겨줌
        dispatch(getClickExploreView(post));
        //해당 게시물 좋아요 유무 넘겨줌
        dispatch(ExploreThumbsUp(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    count_checked_handler();
  }, [todos]);

  let percentage = (count_checked / todos.length) * 100;
  percentage = Math.floor(percentage);

  return (
    <div
      className="ExplorePost-container"
      onClick={() => {
        searchThumbsUpHandler();
      }}
    >
      <div className="user_nickname">{user_nickname}</div>
      <div className="Explore-Thumbnail-info">
        <div className="Thumbnail-info-1">
          {user_img === null ? (
            <i className="fas fa-user-circle"></i>
          ) : (
            <img alt="프로필 사진" className="profile-img" src={user_img} />
          )}
          <i className="far fa-thumbs-up">{thumbs_up}</i>
        </div>
        <div className="Thumbnail-info-2">
          <div className="Tags-title">Tags</div>
          <div className="tags">
            <div className="tag">
              #{tags[0] === undefined ? "" : tags[0].tag}
            </div>
            <div className="tag">
              #{tags[1] === undefined ? "" : tags[1].tag}
            </div>
            <div className="tag">
              #{tags[2] === undefined ? "" : tags[2].tag}
            </div>
          </div>
        </div>
        <div className="Thumbnail-info-3">
          <div className="progress-bar-container">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePost;
