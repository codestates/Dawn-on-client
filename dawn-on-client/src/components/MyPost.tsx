import axios from "axios";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { getClickPostView } from "../module/ClickPostViewModule";
import { MyPostThumbsUp } from "../module/ClickPostViewModule";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEventCallback } from "@material-ui/core";
import { useEffect } from "react";

// 클릭 이벤트로, 박스 하나 클릭하면 해당 박스의 데이터를 Redux로 저장하여 useSelector로 불러온 후 View에 랜더링 한다
// 추가적으로, 내가 이 게시물에 대해서 좋아요를 눌렀는지 유저의 고유 아이디값과 포스트의 고유 아이디값을 가지고 요쳥을 보낸다
// 그럼 response받은 값으로 좋아요 유무를 확인할 수 있다
type MyPostProps = {
  postData: {
    id: number;
    date: string;
    today_learning_time: number;
    thumbs_up: number;
    tags: Array<any>;
    todos: Array<any>;
  };
  percentage: number;
};

function MyPost({ postData, percentage }: MyPostProps) {
  const dispatch = useDispatch();

  const post_PK = postData.id; // 수정할때도 필요하다
  const date = postData.date.slice(0, 10);
  const today_learning_time = postData.today_learning_time;
  const thumbs_up = postData.thumbs_up;
  const tags = postData.tags;
  const post = postData; // post 전체 데이터

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
        dispatch(getClickPostView(post));
        //해당 게시물 좋아요 유무 넘겨줌
        dispatch(MyPostThumbsUp(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = async function () {
    await axios
      .delete(`${process.env.REACT_APP_URI}/posts/myfeed`, {
        data: { post_PK: post_PK }, //post_PK를 넣어서 보내준다
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(() => {
        swal({
          title: "게시물을 삭제하시겠습니까?",
          icon: "warning",
          dangerMode: true,
          closeOnClickOutside: false,
          buttons: ["No", true],
        }).then((willDelete) => {
          if (willDelete) {
            window.location.replace("/myfeed");
          } else {
          }
        });
      })
      .catch((err) => {
        console.log(err);
        swal("삭제 실패", "", "error");
      });
  };

  return (
    <div
      className="MyPost-container"
      onClick={() => {
        searchThumbsUpHandler();
      }}
    >
      <div className="date">{date}</div>
      <i
        className="fas fa-trash-alt"
        onClick={() => {
          deletePost();
        }}
      ></i>
      <div className="MyPost-Thumbnail-info">
        <div className="Thumbnail-info-1">
          <div className="today_learning_time-1">{today_learning_time}</div>
          <div className="today_learning_time-2">hours</div>
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
              styles={buildStyles({
                textColor: `#2e4c8c`,
                pathColor: `#2e4c8c`,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPost;
