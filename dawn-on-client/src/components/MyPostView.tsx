import axios from "axios";
import { MyPostThumbsUp, changeCheckedState } from "../module/ClickPostViewModule";
import { useState, createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled"; 
import {deleteTodo, 
        // addMemoData, 
        addTheSticker} from "../module/ClickPostViewModule";
import AddModal from "./AddModal";
import moment from "moment";
import MyPostEditModal from "./MyPostEditModal";
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
import 'antd/dist/antd.css';
import { RootState } from "../store/store";
import Popover from '@material-ui/core/Popover';
import { Drawer } from 'antd';
import { Checkbox } from 'antd';


const Container = styled.div`
  font-family: "KoHo", sans-serif;
  font-size: 1rem;
  border: 1px solid rgba(94, 94, 94, 0.212);
  background-color: #fff;
  grid-row: 1 / 3;
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
  &:hover {
    {
      transition: 0.5s;
      transform: scale(1.03);
    }
  }
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

function MyPostView() {
  const dispatch = useDispatch();
    const divRef = createRef<HTMLDivElement>();

    const click_postview = useSelector((status: RootState) => {
      return status.getClickPostViewReducer.click_postview;
    });
  
    console.log('전체: ', click_postview);

    useEffect(() => {
      let backColor:string;
      Object.keys(click_postview).length === 0 ? backColor = "#B9B3D1" : backColor = click_postview.back_color;
      console.log(backColor);
      const backElement = document.querySelector("#planner-view-container") as HTMLElement;
      if(backElement) {
        backElement.style.transition = "all 0.6s ease"
  
      if(backColor.indexOf("#") !== -1) {
        console.log("색상: ", backColor)
        backElement.style.background = click_postview.back_color;
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
    }, [click_postview]) 
  

    // let initialTodo;
    // todos.length !== 0 ? initialTodo = todos : initialTodo = [];
    // const [todoDatas, setTodoDatas] = useState(initialTodo);

    // useEffect(() => {
    //   setTodoDatas(todos);
    // }, [todos]);
    
    // useSelector로 받아온 todos 목록을 시간대에 따라 정렬.
    if(Object.keys(click_postview).length !== 0) {
      click_postview.todos.sort(function (a:any, b:any) {
        return a.start_time.split(":")[0] -  b.start_time.split(":")[0]
      })  
    }

    const today = moment().format('YYYY-MM-DD');


    // todo 삭제 버튼
    const deleteHandler = function (e:any) {
      console.log('삭제아이디: ', e.target.id);
      dispatch(deleteTodo(e.target.id));
      closeEditModal();
    }

    const [memo, setMemo] = useState<string>("");
    const [memoEdit, setMemoEdit] = useState<boolean>(false);

    const memoHandler = async function () {
      if(memoEdit) {
        click_postview.memo = memo;
        setMemoEdit(false); 
        await editDataPatch();
        // dispatch(addMemoData(memo));
        window.location.replace("/myfeed");
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
        const editData = click_postview.todos.filter((el:any) => el.todo_PK === e.target.id);
        setEditData(editData[0]);
        setVisible(true);
        e.stopPropagation()
    }
    // add todo card button 이벤트
    const [isClick, setIsClick] = useState(false);
    const clickHandler = function () {
      if(isClick) {
        setIsClick(false);
      }else {
        // const rootEle = document.getElementById("root") as HTMLElement;
        setIsClick(true);
      }
    }
    // pop over 라이브러리 
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const opened = Boolean(anchorEl);
    const id = opened ? 'simple-popover' : undefined;

    const [selectedIcon, setSelectedIcon] = useState("");
    // 스티커 선택지
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

    const stickerHandler = function (e:any) {
      dispatch(addTheSticker(e.target.id.split('/')[3].split('.')[0]));
      click_postview.sticker = e.target.id.split('/')[3].split('.')[0];
      editDataPatch();
    }

    const checkedHandler = async function(e:any) {
      // await dispatch(changeCheckedState(e.target.id, e.target.checked));
      click_postview.todos.map((post:any) => {
        if(post.todo_PK === e.target.id) {
          post.checked = e.target.checked;
        }
      })
      console.log("chekced: ", e.target.id, e.target.checked);
      await editDataPatch();
      dispatch(changeCheckedState(e.target.id, e.target.checked));
      window.location.replace("/myfeed");
    }

    useEffect(() => {
      let stickerName;
      const stickerElement = document.querySelector("#view-selected-sticker") as HTMLImageElement;
      Object.keys(click_postview).length === 0 ? stickerName = "" : stickerName = click_postview.sticker;
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
    }, [click_postview]); 


    //-----

  


  // 게시물이 있으면 제일 최상단의 게시물을 디폴트값으로 보여준다
  // 현재 게시물 목록의 가장 첫번째 게시물의 데이터를 myfeed get요청 시, Redux로 저장시켜 값을 가져온다

  const MyFeedList = useSelector((status: RootState) => {
    return status.getMyFeedListReducer.MyFeedList;
  });

  //클릭한 게시물의 PK값
  let click_PK: number;
  click_postview ? (click_PK = click_postview.id) : (click_PK = 0);


  //내 게시물의 좋아요 유무
  const isClickThumbsUp = useSelector((status: RootState) => {
    return status.getClickPostViewReducer.MyPostThumbsUp;
  });

  // const date = new Date(click_postview.date).toLocaleString();

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
          dispatch(MyPostThumbsUp(true));
          console.log("좋아요 클릭");
        } else if (res.data === "down") {
          dispatch(MyPostThumbsUp(false));
          console.log("좋아요 취소");
        }
      })
      .then(() => {
        window.location.replace("/myfeed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editDataPatch = async function () {
    console.log('보낸 todos: ', click_postview.todos);
    await axios
      .patch(
        `${process.env.REACT_APP_URI}/posts/myfeed`,
        { postdatas: click_postview},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // 만약, 게시물이 없으면 게시물 목록 조건부랜더링처럼 없다고 표시해준다
  return (
    <div id="MyPostView-container">
      {!MyFeedList && MyFeedList.length === 0 ? (
        <div className="empty-list-message">Make your todo list</div>
      ) : (
        <>
        <div id="planner-view-container">
          <div id="left-side-container">
            <Date>
              <div>게시물 PK: {click_PK}</div>
              <span>{today}</span>
            </Date>
            <div className="plnnerfrom-memo">
            {memoEdit
              ? 
              <button className="memo-edit-btn" onClick={() => memoHandler()}>
                <i className="fas fa-check"></i>
              </button> 
              :          
              <button className="memo-edit-btn" onClick={() => memoHandler()}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            }
              { memoEdit
                ? <textarea className="memo-edit-input" 
                  value={memo} 
                  onChange={(e:any) => setMemo(e.target.value)} />
                : <span>{click_postview.memo}</span>
              }
            </div>

            <div className="plnnerfrom-viewer-hour">
            <h5>Total study time</h5>
              <span><i className="fas fa-stopwatch"></i>
              {click_postview.today_learning_time}h
              </span>
            </div>

            <div className="plnnerfrom-sticker">
            <button id="sticker-add-btn" aria-describedby={id} onClick={handleClick}>
              <i className="fas fa-palette"></i>
            </button>
                <Popover
                  id={id}
                  open={opened}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                <div className="sticker-selector">
                {
                  stickers.map(ele => 
                  <span id="each-sticker" key={ele} onClick={(e:any) => {setSelectedIcon(e.target.id);stickerHandler(e)}}>
                      <img id={ele} alt="sticker" src={ele}></img>
                  </span>
                  )
                }
                </div>
              </Popover>
              { click_postview.sticker && 
                  <img id="view-selected-sticker" alt="selected-sticker" src={selectedIcon}></img>
              }
            </div>
          </div>
            <Container id="todo-veiw-container">
            <button onClick={() => clickHandler()} className="add-todo-btn"><i className="fas fa-plus-circle"></i></button>
            {isClick && 
              <AddModal clickHandler={clickHandler} />
            }
            <h3 className="todobar-title">Time Table</h3>
            {!click_postview.todos
            ?  <div className="empty-list-message">Make your todo list</div>
            : 
            click_postview.todos.map((task:any) => {
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
                      <div onClick={(e:any) => openEditModal(e)} id={task.todo_PK} className="todobox-content">
                        <Subject id={task.todo_PK} >{task.subject}</Subject>
                        <Todo id={task.todo_PK}>{task.todo_comment}</Todo>
                      </div>
                      <Checkbox id={task.todo_PK} checked={task.checked} className="todo-checkbox" onChange={(e:any) => {checkedHandler(e)}}></Checkbox>
                    </TodoBox>
                  </div>
                  )})
              }
            </Container>
            <Drawer
              title="Edit Todo"
              placement="right"
              closable={false}
              width={480}
              onClose={closeEditModal}
              visible={visible}
            >
            <MyPostEditModal editData={editData} closeEditModal={closeEditModal} />
            </Drawer>
          </div>
          <div id="MyPostView-Footer">
            <div>
              {isClickThumbsUp ? (
                <i
                  className="fas fa-thumbs-up"
                  id="MyFeed-full-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              ) : (
                <i
                  className="far fa-thumbs-up"
                  id="MyFeed-empty-heart"
                  onClick={() => {
                    changeThumbsUpHandler();
                  }}
                ></i>
              )}
              <button id="EditPost-btn">Edit</button>
            </div>
            <div>
              <div>Comment</div>
              <div>{click_postview.comment}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyPostView;
