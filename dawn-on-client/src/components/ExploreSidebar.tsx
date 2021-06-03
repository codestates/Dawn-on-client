import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getExploreList } from "../module/ExplorePostListModule";

//응원해요 랭킹, 별 랭킹 각각의 axios요청 2개를 각각 보내서 랜더링해준다
//각 랭킹에 적힌 사용자의 아이디 클릭 시, 해당 사용자가 작성한 게시물들을 필터링하여 볼수 있다.
// 검색 기능과 마찬가지로 axios요청을 보내 데이터들을 받아와 Redux에 저장시킨다.

// type Rankingchild = {
//   user_img: string;
//   user_nickname: string;
//   total_thumbsup: number;
// };

function ExploreSidebar() {
  const dispatch = useDispatch();

  const First = useSelector((status: RootState) => {
    return status.getRankingListReducer.ranking_first;
  });

  let first_img = "";
  first_img = First.user_img;
  let first_nickname = "";
  first_nickname = First.user_nickname;
  let first_thumbsup = 0;
  first_thumbsup = First.total_thumbsup;

  const Second = useSelector((status: RootState) => {
    return status.getRankingListReducer.ranking_second;
  });

  let second_img = "";
  second_img = Second.user_img;
  let second_nickname = "";
  second_nickname = Second.user_nickname;
  let second_thumbsup = 0;
  second_thumbsup = Second.total_thumbsup;

  const Third = useSelector((status: RootState) => {
    return status.getRankingListReducer.ranking_third;
  });

  let third_img = "";
  third_img = Third.user_img;
  let third_nickname = "";
  third_nickname = Third.user_nickname;
  let third_thumbsup = 0;
  third_thumbsup = Third.total_thumbsup;

  const search_User_Handler = async function (nick_name: string) {
    await axios
      .post(
        "http://localhost:4000/posts/search-user",
        { user_nickname: nick_name },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("아이디 클릭 데이터", res);
        console.log("클릭한 아이디값", res.data.postDatas);
        dispatch(getExploreList(res.data.postDatas));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="ExploreSidebar-container">
      <div id="ExploreSide-main-title">모아보기</div>
      <div id="ExploreSide-like-ranking">
        <div id="like-explore-title">POPULAR</div>
        <div id="like-rank-container">
          <div id="rank-title" className="rank">
            <div className="rank-subtitle"> Rank </div>
            <div className="rank-subname"> USER </div>
            <i className="far fa-thumbs-up">LIKE</i>
          </div>
          <div id="rank-1st" className="rank">
            <div className="rank-number"> 1 </div>
            <div className="rank-name">
              {first_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img
                  alt="프로필 사진"
                  className="profile-img"
                  src={first_img}
                />
              )}
              <div
                className="rank-nickname"
                onClick={() => {
                  search_User_Handler(first_nickname);
                }}
              >
                {first_nickname}
              </div>
            </div>
            <div className="rank-likes">{first_thumbsup}</div>
          </div>
          <div id="rank-2nd" className="rank">
            <div className="rank-number"> 2 </div>
            <div className="rank-name">
              {second_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img
                  alt="프로필 사진"
                  className="profile-img"
                  src={second_img}
                />
              )}
              <div
                className="rank-nickname"
                onClick={() => {
                  search_User_Handler(second_nickname);
                }}
              >
                {second_nickname}
              </div>
            </div>
            <div className="rank-likes">{second_thumbsup}</div>
          </div>
          <div id="rank-3rd" className="rank">
            <div className="rank-number"> 3 </div>
            <div className="rank-name">
              {third_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img
                  alt="프로필 사진"
                  className="profile-img"
                  src={third_img}
                />
              )}
              <div
                className="rank-nickname"
                onClick={() => {
                  search_User_Handler(third_nickname);
                }}
              >
                {third_nickname}
              </div>
            </div>
            <div className="rank-likes">{third_thumbsup}</div>
          </div>
        </div>
      </div>
      <div id="ExploreSide-star-ranking">별 랭킹 (더미 데이터로 표현한다)</div>
    </div>
  );
}

export default ExploreSidebar;
