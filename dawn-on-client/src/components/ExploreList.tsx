import ExplorePost from "./ExplorePost";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import empty_folder from "../img/empty_folder.png";
import axios from "axios";
import { getExploreList } from "../module/ExplorePostListModule";
import { getClickExploreView } from "../module/ClickExploreViewModule";
import swal from "sweetalert";
import { useState } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
// 첫 화면 로딩 시, 게시물 목록을 axios 요청을 보낸 후  map을 사용하여 <ExplorePost/> 를 랜더링해준다
// 검색어 요청 시, Redux에 저장한 데이터를 useSelector로 가져와서 랜더링한다.
// useEffect를 사용하여 useSelector로 가져온 데이터의 값이 변경될 때 마다 해당 함수를 실행하게 하면 될 것 같다
// async await를 사용하여 비동기 처리를 해야함. 로딩하고 있는 gif를 추가해야할듯
function ExploreList() {
  const { Option } = Select;
  const dispatch = useDispatch();

  const [SortBy, setSortBy] = useState<string>("최신순");
  const [Job, setJob] = useState<string>("전체");

  const ExploreList = useSelector((status: RootState) => {
    return status.getExploreListReducer.ExploreList;
  });

  // 셀렉트 박스 직업 value값 가져오기
  const getSelectJobValue = (Job: string) => {
    // const value = $("#select-job option:selected").text();
    setJob(Job);
  };

  // 셀렉트 박스 정렬순 value값 가져오기
  const getSelectSortValue = (SortBy: string) => {
    // const value = $("#select-sort option:selected").text();
    setSortBy(SortBy);
  };

  let data_Size = 0;
  data_Size = ExploreList ? ExploreList : [];

  // 인기순 + 직업(전체 제외)
  const search_Popular_Handler = async function (job: string) {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/search-popular`,
        { user_job: job },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
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
        `${process.env.REACT_APP_URI}/posts/search-popular`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
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
          `${process.env.REACT_APP_URI}/posts/search-job`,
          { user_job: job },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(getExploreList(res.data.postDatas));
          dispatch(getClickExploreView(res.data.postDatas[0]));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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

  // main feed 데이터 받아오는 함수
  const get_MainFeed_Data = async function () {
    await axios
      .get(`${process.env.REACT_APP_URI}/posts/mainfeed`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {

        // 모아보기 게시물 데이터 저장 (배열)
        dispatch(getExploreList(res.data.postDatas));

        // 첫번째 게시물 데이터 저장 (객체)
        dispatch(getClickExploreView(res.data.postDatas[0]));
      })
      .catch((err) => {
        console.log(err);
        swal("데이터 가져오기 실패", "", "error");
      });
  };
  return (
    <div id="ExploreList-container">
      <div id="ExploreList-filter">
        <Select
          defaultValue="최신순"
          style={{ width: 120 }}
          onChange={getSelectSortValue}
        >
          <Option value="최신순">최신순</Option>
          <Option value="인기순">인기순</Option>
        </Select>
        <Select
          defaultValue="전체"
          style={{ width: 120 }}
          onChange={getSelectJobValue}
        >
          <Option value="전체">전체</Option>
          <Option value="수험생">수험생</Option>
          <Option value="공시생">공시생</Option>
          <Option value="고시생">고시생</Option>
          <Option value="대학생">대학생</Option>
          <Option value="기타">기타</Option>
        </Select>
        <div
          id="sort-btn"
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
          SORT
        </div>
      </div>
      {data_Size !== 0 ? (
        <div id="ExploreList-posts">
          {ExploreList &&
            ExploreList.map((post: any) => (
              <ExplorePost
                key={post.id}
                postData={post}
                percentage={count_checked_handler(post.todos)}
              />
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
