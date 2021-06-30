import { useState, createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled"; 
import {deleteTodo, 
        addMemoData, 
        changeTotalHour,
        changeCheckedState, 
        addASticker} from "../module/addTaskModule";
import AddModal from "./AddModal";
import moment from "moment";
import EditTodoModal from "./EditTodoModal";
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
  grid-column: 2 / 4;
  grid-row: 1 / 5;
  border-radius: 3px;
  flex-direction: column;
  overflow-y: scroll;
  padding: 25px;
  transition: all 1s;
  box-shadow:
  7px 7px 20px 0px #0002,
  4px 4px 5px 0px #0001;
`
const TodoBox = styled.div`
  display: flex;
  border-radius: 3px;
  margin: 10px 20px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.212);
  border-right: 1px solid rgba(0, 0, 0, 0.212);
  transition: 0.5s;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300;
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
  font-weight: 400;
  margin-top: 5px;
`;

const TimeBar = styled.div`
  margin-top: 15px;
  width: 100%;
  font-size: 1.5rem;
  margin-right: 10px;
  display: flex;
`

const StartTime =styled.span`
  margin-left: 22px;
  align-self: center;
  flex-basis: 83%;
  font-size: 1.5rem;
`

const Hours =styled.span`
  font-size: 1.5rem;
  align-self: center;
  justify-self: right;
`

const Todo = styled.div`
  margin-top: 5px;
  font-size: 1.2rem;
`;

function AddTodo () {
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
    
    // useSelector로 받아온 todos 목록을 시간대에 따라 정렬.
    if(todoDatas.length !== 0) {
      todoDatas.sort(function (a:any, b:any) {
        return a.start_time.split(":")[0] -  b.start_time.split(":")[0]
      })  
    }

    //todos의 hour의 합계를 구해 total running time 표시.
    let runningTime:number;
    if(todoDatas) {
        runningTime = todoDatas.reduce((acc: any, todo: any) => {
        return acc + todo.learning_time;
    }, 0);      
    }
    else {
      runningTime = 0;
    }
    // runningTime 바뀔 때 마다 total time 바뀌도록 dispatch 요청
    useEffect(() => {
      dispatch(changeTotalHour(`${runningTime}h`))}, [dispatch, runningTime]);

    const today = moment().format('YYYY-MM-DD');


    // todo 삭제 버튼
    const deleteHandler = function (e:any) {
      console.log('삭제아이디: ', e.target.id);
      dispatch(deleteTodo(e.target.id));
      closeEditModal();
    }

    const [memo, setMemo] = useState<string>("You Can Do it");
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
        const editData = todoDatas.filter((el:any) => el.todo_PK === e.target.id);
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
        const rootEle = document.getElementById("root") as HTMLElement;
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

    const [selectedIcon, setSelectedIcon] = useState<string>("");
    
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
      console.log(e.target.id.split('/')[3].split('.')[1]);
      dispatch(addASticker(e.target.id.split('/')[3].split('.')[0]));
    }


    const checkedHandler = function(e:any) {
      dispatch(changeCheckedState(e.target.id, e.target.checked));
    }

    return (
      <>
          <div className="plnnerfrom-date">
            <span>{today}</span>
          </div>

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
              ? <textarea className="memo-edit-input" onChange={(e:any) => setMemo(e.target.value)} />
              : <span>{memo}</span>
            }
          </div>

          <div className="plnnerfrom-hour">
          <h5>Total study time</h5>
            <span><i className="fas fa-stopwatch"></i>
            {runningTime}h
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
            { selectedIcon !== "" && 
                <img id="selected-sticker" alt="selected-sticker" src={selectedIcon}></img>
            }
          </div>
        <Container id="todo-veiw-container">
          <button onClick={() => clickHandler()} className="add-todo-btn"><i className="fas fa-plus-circle"></i></button>
          {isClick && 
            <Drawer
            placement="right"
            closable={false}
            width={300}
            onClose={clickHandler}
            visible={isClick}
          >
            <AddModal clickHandler={clickHandler} />
          </Drawer>
          }
          <h3 className="todobar-title">Time Table</h3>
          {todoDatas.length === 0
          ?  <div className="empty-list-message">Make your todo list</div>
          : 
          todoDatas.map((task:any) => {
              return(
                <div key={task.todo_PK} ref={divRef}>
                  <TimeBar>
                    <StartTime>{task.start_time}</StartTime>
                    <Hours>{task.learning_time}hours</Hours>
                  </TimeBar>
                  
                  <TodoBox 
                  id={task.todo_PK} 
                  style={{height: `calc(${task.learning_time} * 70px)`}}>
                    <div id={task.todo_PK} className="color-label" style={{backgroundColor: task.box_color}}></div>
                    <div onClick={(e:any) => openEditModal(e)} id={task.todo_PK} className="todobox-content">
                      <Subject id={task.todo_PK} >{task.subject}</Subject>
                      <Todo id={task.todo_PK}>{task.todo_comment}</Todo>
                    </div>
                    <Checkbox id={task.todo_PK} className="todo-checkbox" disabled onChange={(e:any) => {checkedHandler(e)}}></Checkbox>
                  </TodoBox>
                </div>
                )})
            }
        </Container>
        <Drawer
          placement="right"
          closable={false}
          width={300}
          onClose={closeEditModal}
          visible={visible}
        >
          <button onClick={(e:any) => deleteHandler(e)} 
              id={editData.todo_PK} 
              className="todo-delete-btn">
          <i id={editData.todo_PK} className="far fa-trash-alt"></i>
        </button>
        <EditTodoModal editData={editData} closeEditModal={closeEditModal} />
        </Drawer>
      </>
    )
};



  

export default AddTodo;
