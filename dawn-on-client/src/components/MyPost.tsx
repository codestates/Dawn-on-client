import axios from "axios";
import swal from "sweetalert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// 삭제 버튼 ( 함수 생성 -> axios요청  DB에 저장된 데이터 배열에서 삭제시킨 후 My feed 리랜더링)
// 클릭 이벤트로, 박스 하나 클릭하면 해당 박스의 데이터를 Redux로 저장하여 useSelector로 불러온 후 View에 랜더링 한다
// 추가적으로, 내가 이 게시물에 대해서 좋아요를 눌렀는지 유저의 고유 아이디값과 포스트의 고유 아이디값을 가지고 요쳥을 보낸다
// 그럼 response받은 값으로 좋아요 유무를 확인할 수 있다
type MyPostProps = {
  postData: Array<any>;
};

function MyPost({ postData }: MyPostProps) {
  const percentage = 66; // 전체 개수와 체크된 개수를 가지고 계산하여 할당한다

  // myfeed delete 요청에 body 입력 시, 오류가 뜬다
  const deletePost = function () {
    axios
      .delete("http://localhost:4000/posts/myfeed", {
        data: { post_PK: "1234" }, //post_PK를 넣어서 보내준다
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
            console.log("게시물 삭제");
            window.location.replace("/myfeed");
          } else {
            console.log("게시물 삭제 취소");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        swal("삭제 실패", "", "error");
      });
  };

  return (
    <div className="MyPost-container">
      <i
        className="fas fa-trash-alt"
        onClick={() => {
          deletePost();
        }}
      ></i>
      <div className="MyPost-Thumbnail-info">
        <div className="Thumbnail-info-1">
          <div className="today_learning_time-1">12</div>
          <div className="today_learning_time-2">hours</div>
          <i className="far fa-thumbs-up">170</i>
        </div>
        <div className="Thumbnail-info-2">
          <div className="date">2021-05-31</div>
          <div className="tags">
            <div className="tag">취준</div>
            <div className="tag">개발</div>
            <div className="tag">코딩</div>
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

export default MyPost;
