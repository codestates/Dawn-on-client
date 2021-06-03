import ExplorePost from "./ExplorePost";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import empty_folder from "../img/empty_folder.png";
import axios from "axios";
import { getExploreList } from "../module/ExplorePostListModule";
import { getClickExploreView } from "../module/ClickExploreViewModule";
import swal from "sweetalert";
import $ from "jquery";
import { useState } from "react";
// 첫 화면 로딩 시, 게시물 목록을 axios 요청을 보낸 후  map을 사용하여 <ExplorePost/> 를 랜더링해준다
// 검색어 요청 시, Redux에 저장한 데이터를 useSelector로 가져와서 랜더링한다.
// useEffect를 사용하여 useSelector로 가져온 데이터의 값이 변경될 때 마다 해당 함수를 실행하게 하면 될 것 같다
// async await를 사용하여 비동기 처리를 해야함. 로딩하고 있는 gif를 추가해야할듯
function ExploreList() {
  const dispatch = useDispatch();

  const [SortBy, setSortBy] = useState<string>("");
  const [Job, setJob] = useState<string>("");

  const ExploreList = useSelector((status: RootState) => {
    return status.getExploreListReducer.ExploreList;
  });

  // 셀렉트 박스 직업 value값 가져오기
  const getSelectJobValue = () => {
    const value = $("#select-job option:selected").text();
    setJob(value);
  };

  // 셀렉트 박스 정렬순 value값 가져오기
  const getSelectSortValue = () => {
    const value = $("#select-sort option:selected").text();
    setSortBy(value);
  };

  let data_Size = 0;
  data_Size = ExploreList.length ? ExploreList.length : 0;

  // 인기순 + 직업(전체 제외)
  const search_Popular_Handler = async function (job: string) {
    await axios
      .post(
        "http://localhost:4000/posts/search-popular",
        { user_job: job },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("인기순 정렬 + 직업", res.data.postDatas);
        dispatch(getExploreList(res.data.postDatas));
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const search_Popular_All_Handler = async function () {
    await axios
      .post(
        "http://localhost:4000/posts/search-popular",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("인기순 정렬 + 전체", res.data.postDatas);
        dispatch(getExploreList(res.data.postDatas));
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 최신순 + 직업
  const search_Job_Handler = async function (job: string) {
    if (job === "전체") {
      get_MainFeed_Data();
    } else {
      return await axios
        .post(
          "http://localhost:4000/posts/search-job",
          { user_job: job },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("선택한 직업", Job);
          console.log("셀랙트박스: 직업 데이터", res.data.postDatas);
          dispatch(getExploreList(res.data.postDatas));
          dispatch(getClickExploreView(res.data.postDatas[0]));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // main feed 데이터 받아오는 함수
  const get_MainFeed_Data = async function () {
    await axios
      .get("http://localhost:4000/posts/mainfeed", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log("main feed 데이터: ", res.data);

        // 모아보기 게시물 데이터 저장 (배열)
        dispatch(getExploreList(res.data.postDatas));

        // 첫번째 게시물 데이터 저장 (객체)
        dispatch(getClickExploreView(res.data.postDatas[0]));

        console.log("모아보기 게시물 목록 데이터", res.data.postDatas);
      })
      .catch((err) => {
        console.log(err);
        swal("데이터 가져오기 실패", "", "error");
      });
  };

  //Redux에 저장된 모아보기 페이지 게시물 데이터를 select box의 value값을 가져온다
  // ex) ExploreList[0].users.user_job => 게시물 작성자의 직업
  return (
    <div id="ExploreList-container">
      <div id="ExploreList-filter">
        <select id="select-sort" onChange={getSelectSortValue}>
          <option value="최신순">최신순</option>
          <option value="인기순">인기순</option>
        </select>
        <select id="select-job" onChange={getSelectJobValue}>
          <option value="전체">전체</option>
          <option value="수험생">수험생</option>
          <option value="공시생">공시생</option>
          <option value="고시생">고시생</option>
          <option value="대학생">대학생</option>
          <option value="기타">기타</option>
        </select>
        <button
          onClick={() => {
            if (SortBy === "인기순" && Job !== "전체") {
              search_Popular_Handler(Job);
            } else if (SortBy === "인기순" && Job === "전체") {
              search_Popular_All_Handler();
            } else if (SortBy === "최신순") {
              search_Job_Handler(Job);
            }
          }}
        >
          정렬하기
        </button>
      </div>
      {data_Size !== 0 ? (
        <div id="ExploreList-posts">
          {ExploreList.map((post: any) => (
            <ExplorePost key={post.id} postData={post} />
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

export default ExploreList;
