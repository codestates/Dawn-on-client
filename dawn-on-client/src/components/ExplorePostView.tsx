import axios from "axios";
import { useState, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { ExploreThumbsUp } from "../module/ClickExploreViewModule";
import styled from "@emotion/styled"; 
import {deleteTodo, 
        addMemoData, 
        changeCheckedState, } from "../module/addTaskModule";
import AddModal from "./AddModal";
import moment from "moment";
import pattern01 from "../img/pattern01.png";
import pattern02 from "../img/pattern02.png";
import pattern03 from "../img/pattern03.png";
import pattern04 from "../img/pattern04.png";
import pattern05 from "../img/pattern05.png";
import pattern06 from "../img/pattern06.png";
import pattern07 from "../img/pattern07.png";
import pattern08 from "../img/pattern08.png";
import sticker01 from "../img/sticker/sticker01.png";
import sticker02 from "../img/sticker/sticker02.png";
import sticker03 from "../img/sticker/sticker03.png";
import sticker04 from "../img/sticker/sticker04.png";
import sticker05 from "../img/sticker/sticker05.png";
import sticker06 from "../img/sticker/sticker06.png";
import sticker07 from "../img/sticker/sticker07.png";
import sticker08 from "../img/sticker/sticker08.png";
import sticker09 from "../img/sticker/sticker09.png";
import box from "../img/box.png";
import 'antd/dist/antd.css';
import Popover from '@material-ui/core/Popover';
import { Checkbox } from 'antd';
const Container = styled.div`
  font-family: "KoHo", sans-serif;
  font-size: 1rem;
  border: 1px solid rgba(94, 94, 94, 0.212);
  background-color: #fff;
  border-radius: 3px;
  margin-left: 10px;
  overflow-y: scroll;
  padding: 25px;
  transition: all 1s;
  box-shadow:
  7px 7px 20px 0px #0002,
  4px 4px 5px 0px #0001;
`

const Date = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  text-align: center;
  align-self: center;
  font-size: 2rem;
  background: #fff;
  border-radius: 5%;
  border: 1px solid rgba(0, 0, 0, 0.212);
  box-shadow:
  7px 7px 20px 0px #0002,
  4px 4px 5px 0px #0001;
`

const TodoBox = styled.div`
  display: flex;
  border-radius: 3px;
  margin: 10px 20px;
  // animation: fadeIn ease 1;
  font-size: 1.3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.212);
  border-right: 1px solid rgba(0, 0, 0, 0.212);
  transition: 0.5s;
  background-size: 200% auto;
  box-shadow:
  -7px -7px 20px 0px #fff9,
  -4px -4px 5px 0px #fff9,
  7px 7px 20px 0px #0002,
  4px 4px 5px 0px #0001;
`
const Subject = styled.span`
  margin-top: 5px;
`;

const TimeBar = styled.div`
  margin-top: 15px;
  width: 100%;
  font-size: 1.3rem;
  margin-right: 10px;
  display: flex;
`

const StartTime =styled.span`
  margin-left: 22px;
  align-self: center;
  flex-basis: 83%;
`

const Hours =styled.span`
  font-size: 1.1rem;
  align-self: center;
  justify-self: right;
`

const Todo = styled.div`
  margin-top: 5px;
`;

//MyPost ?????????????????? ?????? ???????????? Redux??? ????????? ?????? ???????????? ???????????? useSelector??? ????????? ???????????????
function ExplorePostView() {
  const dispatch = useDispatch();
    const divRef = createRef<HTMLDivElement>();
    const plannerDatas = useSelector((state:RootState) => state.addTaskReducer.plannerDatas);
    const todos = useSelector((state:RootState) => state.addTaskReducer.plannerDatas.todos);

    let initialTodo;
    todos.length !== 0 ? initialTodo = todos : initialTodo = [];
    const [todoDatas, setTodoDatas] = useState(initialTodo);

    useEffect(() => {
      setTodoDatas(todos);
    }, [todos]);
    
    // useSelector??? ????????? todos ????????? ???????????? ?????? ??????.
    if(todoDatas.length !== 0) {
      todoDatas.sort(function (a:any, b:any) {
        return a.start_time.split(":")[0] -  b.start_time.split(":")[0]
      })  
    }

    //todos??? hour??? ????????? ?????? total running time ??????.

    const today = moment().format('YYYY-MM-DD');


    // todo ?????? ??????
    const deleteHandler = function (e:any) {
      dispatch(deleteTodo(e.target.id));
      closeEditModal();
    }

    const [memo, setMemo] = useState<string>("????????? ?????????!");
    const [memoEdit, setMemoEdit] = useState<boolean>(false);
    const memoHandler = function () {
      if(memoEdit) {
        setMemoEdit(false); 
        dispatch(addMemoData(memo));
      }else {
        setMemoEdit(true);
      }
    }

    // Edit Drawer
    const [visible, setVisible] = useState<boolean>(false);
    const [editData, setEditData] = useState({
      todo_PK: "",
      suject: "",
      color: "",
      todo_commnet: "",
      start_time: "",
      end_time: "",
      learning_time: 0,
    })

    const closeEditModal = function () {
      setVisible(false);
    }

    const openEditModal = function (e:any) {
        const editData = click_exploreview.todos.filter((el:any) => el.todo_PK === e.target.id);
        setEditData(editData[0]);
        setVisible(true);
        e.stopPropagation()
    }
    // add todo card button ?????????
    const [isClick, setIsClick] = useState(false);
    const clickHandler = function () {
      if(isClick) {
        setIsClick(false);
      }else {
        const rootEle = document.getElementById("root") as HTMLElement;
        setIsClick(true);
      }
    }
    // pop over ??????????????? 
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const opened = Boolean(anchorEl);
    const id = opened ? 'simple-popover' : undefined;

    const [selectedIcon, setSelectedIcon] = useState<string>("");
    // ????????? ?????????
    const stickers = [
      sticker01,
      sticker02,
      sticker03,
      sticker04,
      sticker05,
      sticker06,
      sticker07,
      sticker08,
      sticker09,
    ]

    // const stickerHandler = function (e:any) {
    //   dispatch(addTheSticker(e.target.id));
    // }


    const checkedHandler = function(e:any) {
      dispatch(changeCheckedState(e.target.id, e.target.checked));
    }
    // -------

  //????????? ????????? ?????? ??????
  const isExploreThumbsUp = useSelector((status: RootState) => {
    return status.getClickExploreViewReducer.ExploreThumbsUp;
  });

  //???????????? ?????? ?????? ?????????
  const ExploreList = useSelector((status: RootState) => {
    return status.getExploreListReducer.ExploreList;
  });

  //?????? ???????????? ?????? ??????????????? ???????????? ?????? ???????????? ????????? ?????????
  const click_exploreview = useSelector((status: RootState) => {
    return status.getClickExploreViewReducer.click_exploreview;
  });

    // ??? ???????????? ??????
    const [runningTime, setRunningTime] = useState<number >(0); 
    useEffect(() => {
      if(click_exploreview.todos) {
        setRunningTime(click_exploreview.todos.reduce((acc: any, todo: any) => {
        return acc + todo.learning_time;
        }, 0));      
      }
      else {
        setRunningTime(0);
      }
    }, [click_exploreview]);

  useEffect(() => {
    let backColor:string;
    Object.keys(click_exploreview).length === 0 ? backColor = "#B9B3D1" : backColor = click_exploreview.back_color;
    const backElement = document.querySelector("#planner-view-container") as HTMLElement;
    if(backElement && ExploreList.length !== 0) {
      backElement.style.transition = "all 0.6s ease"

    if(backColor.indexOf("#") !== -1) {
      backElement.style.background = click_exploreview.back_color;
    }else {
      if (backColor === "pattern01") {
        backElement.style.backgroundImage = `url(${pattern01})`;
      }
      if (backColor === "pattern02") {
        backElement.style.backgroundImage = `url(${pattern02})`;
      }
      if (backColor === "pattern03") {
        backElement.style.backgroundImage = `url(${pattern03})`;
      }
      if (backColor === "pattern04") {
        backElement.style.backgroundImage = `url(${pattern04})`;
      }
      if (backColor === "pattern05") {
        backElement.style.backgroundImage = `url(${pattern05})`;
      }
      if (backColor === "pattern06") {
        backElement.style.backgroundImage = `url(${pattern06})`;
      }
      if (backColor === "pattern07") {
        backElement.style.backgroundImage = `url(${pattern07})`;
      }
      if (backColor === "pattern08") {
        backElement.style.backgroundImage = `url(${pattern08})`;
      }
    }
    }
  }) 

  useEffect(() => {
    let stickerName;
    Object.keys(click_exploreview).length === 0 ? stickerName = "" : stickerName = click_exploreview.sticker;
    const stickerElement = document.querySelector("#view-selected-sticker") as HTMLImageElement;
    if(stickerElement) {
      stickerElement.style.transition = "all 0.6s ease";
    if(stickerName === "sticker01") {
      stickerElement.src = sticker01
    }
    if(stickerName === "sticker02") {
      stickerElement.src = sticker02
    }
    if(stickerName === "sticker03") {
      stickerElement.src = sticker03;
    }
    if(stickerName === "sticker04") {
      stickerElement.src = sticker04;
    }
    if(stickerName === "sticker05") {
      stickerElement.src = sticker05;
    }
    if(stickerName === "sticker06") {
      stickerElement.src = sticker06;
    }
    if(stickerName === "sticker07") {
      stickerElement.src = sticker07;
    }
    if(stickerName === "sticker08") {
      stickerElement.src = sticker08;
    }
    if(stickerName === "sticker09") {
      stickerElement.src = sticker09;
    }      
  }
  }, [click_exploreview]); 


  let click_PK: number;
  click_exploreview ? (click_PK = click_exploreview.id) : (click_PK = 0);

  const changeThumbsUpHandler = async function () {
    await axios
      .post(
        `${process.env.REACT_APP_URI}/posts/change-thumbsup`,
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
        } else if (res.data === "down") {
          dispatch(ExploreThumbsUp(false));
        }
      })
      .then(() => {
        window.location.replace("/explore");
      })
      .catch((err) => {
      });
  };

  return (
    <div id="ExplorePostView-container">
      {ExploreList && ExploreList.length === 0 ? (
        <div>
          <img className="empty-box-img" src={box} alt="emtpy-box" />
          <div className="empty-list-message">Make your todo list!</div>
        </div>
      ) : (
        <>
        <div id="planner-view-container">
          <div id="left-side-container">
            <Date>
              <span className="explore-date">{today}</span>
            </Date>
            <div className="plnnerfrom-memo">
              <span>{click_exploreview.memo}</span>
            </div>

            <div className="plnnerfrom-hour">
            <h5>Total study time</h5>
              <span><i className="fas fa-stopwatch"></i>
              {runningTime}h
              </span>
            </div>

            <div className="plnnerfrom-sticker">
              { click_exploreview.sticker && 
                  <img id="view-selected-sticker" alt="selected-sticker" src={selectedIcon}></img>
              }
            </div>
          </div>
            <Container id="todo-veiw-container">
            <h3 className="todobar-title">Time Table</h3>
            {!click_exploreview.todos
            ?  <div className="empty-list-message">Make your todo list</div>
            : 
            click_exploreview.todos.map((task:any) => {
                return(
                  <div key={task.todo_PK} ref={divRef}>
                    <TimeBar>
                      <StartTime>{task.start_time}</StartTime>
                      <Hours>{task.learning_time}hours</Hours>
                    </TimeBar>
                    
                    <TodoBox 
                    id={task.todo_PK} 
                    style={{height: `calc(${task.learning_time} * 43px)`}}>
                      <div id={task.todo_PK} className="color-label" style={{backgroundColor: task.box_color}}></div>
                      <div id={task.todo_PK} className="todobox-content">
                        <Subject id={task.todo_PK} >{task.subject}</Subject>
                        <Todo id={task.todo_PK}>{task.todo_comment}</Todo>
                      </div>
                      <Checkbox id={task.todo_PK} className="todo-checkbox" disabled onChange={(e:any) => {checkedHandler(e)}}></Checkbox>
                    </TodoBox>
                  </div>
                  )})
              }
            </Container>
            <div id="ExploreView-Footer">
            <div>
              {isExploreThumbsUp ? (
                <i
                  className="fas fa-thumbs-up"
                  id="Explore-full-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              ) : (
                <i
                  className="far fa-thumbs-up"
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
          </div>
        </>
      )}
    </div>
  );
}

export default ExplorePostView;
