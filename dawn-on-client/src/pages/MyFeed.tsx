import { useEffect } from "react";
import "../css/myfeed.css";
import MyProfileSidebar from "../components/MyProfileSidebar";
import MyPostList from "../components/MyPostList";
import MyPostView from "../components/MyPostView";
import EditProfile from "../components/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import {
  getClickPostView,
  MyPostThumbsUp,
} from "../module/ClickPostViewModule";
import { getMyFeedList } from "../module/MyfeedPostListModule";
import { getMyFeedInfo } from "../module/MyfeedPostListModule";
import axios from "axios";
import swal from "sweetalert";

function MyFeed() {
  const dispatch = useDispatch();

  const isEditProfile = useSelector((status: RootState) => {
    return status.isEditProfileReducer.isEditProfile;
  });

  // 클릭한 게시물의 데이터
  const click_postview = useSelector((status: RootState) => {
    return status.getClickPostViewReducer.click_postview;
  });

  // 현재 클릭한 게시물이 없다면(로그인하고 첫 myfeed에 들어간 상태라면)
  // 첫번째 게시물을 보여준다
  const isChecked = function (firstPost: object) {
    if (Object.keys(click_postview).length === 0) {
      dispatch(getClickPostView(firstPost));
    }
  };

  const getMyfeedInfo = async function () {
    await axios
      .get(`${process.env.REACT_APP_URI}/posts/myfeed`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res: any) => {
        const postDatas = res.data.postDatas; //배열
        const userDatas = res.data.userDatas; //객체

        // 사용자 정보 저장
        dispatch(getMyFeedInfo(userDatas || {}));

        // 게시물 데이터 저장
        dispatch(getMyFeedList(postDatas.reverse() || []));
        return res;
      })
      .then((res) => {
        isChecked(res.data.postDatas[0]);
      })
      .catch((err) => {
        console.log(err);
        swal("my feed 데이터 가져오기 실패", "", "error");
      });
  };

  let click_PK: number;
  click_postview ? (click_PK = click_postview.id) : (click_PK = 0);

  const searchThumbsUpHandler = async function () {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-thumbsup`,
        { post_PK: click_PK },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        //해당 게시물 좋아요 유무 넘겨줌
        dispatch(MyPostThumbsUp(res.data));
        dispatch(getClickPostView(click_postview));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyfeedInfo();
  }, []);
  useEffect(() => {
    searchThumbsUpHandler();
  }, []);

  return (
    <div id="MyFeed-container">
      <MyProfileSidebar />
      <MyPostList />
      <MyPostView />
      {isEditProfile && <EditProfile />}
    </div>
  );
}

export default MyFeed;
