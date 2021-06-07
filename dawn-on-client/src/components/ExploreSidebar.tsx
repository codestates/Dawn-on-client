import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { getExploreList } from "../module/ExplorePostListModule";
import swal from "sweetalert";
import { getClickExploreView } from "../module/ClickExploreViewModule";

function ExploreSidebar() {
  const dispatch = useDispatch();

  const First = useSelector((status: RootState) => {
    return status.getRankingListReducer.ranking_first;
  });

  let first_img = First.user_img;
  let first_nickname = First.user_nickname;
  let first_thumbsup = First.total_thumbsup;

  const Second = useSelector((status: RootState) => {
    return status.getRankingListReducer.ranking_second;
  });

  let second_img = Second.user_img;
  let second_nickname = Second.user_nickname;
  let second_thumbsup = Second.total_thumbsup;

  const Third = useSelector((status: RootState) => {
    return status.getRankingListReducer.ranking_third;
  });

  let third_img = Third.user_img;
  let third_nickname = Third.user_nickname;
  let third_thumbsup = Third.total_thumbsup;

  const search_User_Handler = async function (nick_name: string) {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-user`,
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
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="ExploreSidebar-container">
      <div id="ExploreSide-main-title">EXPLORE</div>
      <div id="ExploreSide-like-ranking">
        <div id="like-explore-title">POPULAR</div>
        <div id="like-rank-container">
          <div id="rank-title" className="rank">
            <div className="rank-subtitle"> Rank </div>
            <div className="rank-subname"> USER </div>
            <i className="far fa-thumbs-up"> LIKE </i>
          </div>
          <div id="rank-1st" className="rank">
            <div className="rank-number"> 1 </div>
            <div className="rank-name">
              {first_img === undefined || first_img === null ? (
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
              {second_img === undefined || second_img === null ? (
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
              {third_img === undefined || third_img === null ? (
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
      <div id="ExploreSide-star-ranking">
        <div id="star-title">Star Ranking</div>
        <div id="star-ranking-container">
          <div id="rank-title" className="rank">
            <div className="rank-subtitle"> Rank </div>
            <div className="rank-subname"> USER </div>
            <i className="far fa-star"> STAR </i>
          </div>
          <div id="rank-1st" className="rank">
            <div className="rank-number"> 1 </div>
            <div className="rank-name">
              {/* {first_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img
                  alt="프로필 사진"
                  className="profile-img"
                  src={first_img}
                />
              )} */}
              <i className="fas fa-user-circle"></i>
              <div
                className="rank-nickname"
                onClick={() => {
                  // search_User_Handler(first_nickname);
                  swal("Star 서비스 준비중입니다", "", "warning");
                }}
              >
                Michael
              </div>
            </div>
            <div className="rank-likes">37</div>
          </div>
          <div id="rank-2nd" className="rank">
            <div className="rank-number"> 2 </div>
            <div className="rank-name">
              {/* {second_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img
                  alt="프로필 사진"
                  className="profile-img"
                  src={second_img}
                />
              )} */}
              <i className="fas fa-user-circle"></i>
              <div
                className="rank-nickname"
                onClick={() => {
                  // search_User_Handler(second_nickname);
                  swal("Star 서비스 준비중입니다", "", "warning");
                }}
              >
                John
              </div>
            </div>
            <div className="rank-likes">14</div>
          </div>
          <div id="rank-3rd" className="rank">
            <div className="rank-number"> 3 </div>
            <div className="rank-name">
              {/* {third_img === null ? (
                <i className="fas fa-user-circle"></i>
              ) : (
                <img
                  alt="프로필 사진"
                  className="profile-img"
                  src={third_img}
                />
              )} */}
              <i className="fas fa-user-circle"></i>
              <div
                className="rank-nickname"
                onClick={() => {
                  // search_User_Handler(third_nickname);
                  swal("Star 서비스 준비중입니다", "", "warning");
                }}
              >
                Kingsman
              </div>
            </div>
            <div className="rank-likes">9</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreSidebar;
