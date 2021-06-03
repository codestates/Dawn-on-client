import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { deleteTodo, addUpperData } from "../module/addTaskModule";
import AddTodoModal from "./AddModal";
import moment from "moment";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import { Progress } from "antd";
import { RootState } from "../store/store";
// 직업군에 맞는 select box 선택지 미리 만들어주고 조건부 -> map;

const Container = styled.div`
  font-family: "KoHo", sans-serif;
  font-size: 1rem;
  border: 1px solid rgba(94, 94, 94, 0.212);
  background-color: #fff;
  grid-column: 1 / 4;
  grid-row: 3 / 4;
  border-radius: 3px;
  flex-direction: column;
  overflow-y: scroll;
  transition: all 1s;
`;
const TodoBox = styled.div`
  background-color: #fff;
  display: flex;
  border-radius: 3px;
  margin: 5px 5px;
  background-color: #fff;
  animation: fadeIn ease 1s;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
`;
const Subject = styled.span`
  margin-top: 5px;
`;

const TimeBar = styled.div`
  margin-top: 15px;
  width: 100%;
  margin-right: 10px;
`;

const StartTime = styled.span`
  font-size: 1rem;
  margin-top: 5px;
  margin-left: 10px;
`;

const Hours = styled.span`
  font-size: 1rem;
  margin-rignth: 10px;
  margin-left: 10px;
`;

const Todo = styled.div`
  margin-top: 5px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      borderRadius: "3px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    text: {
      height: "40px",
    },
  })
);

function AddTodo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const plannerDatas = useSelector(
    (state: RootState) => state.addTaskReducer.plannerDatas
  );
  const todos = useSelector(
    (state: RootState) => state.addTaskReducer.plannerDatas.todos
  );
  todos.sort(function (a: any, b: any) {
    return a.start_time.split(":")[0] - b.start_time.split(":")[0];
  });
  console.log(todos);
  //todos의 hour의 합계를 구하자
  const runningTime = todos.reduce((acc: any, todo: any) => {
    return acc + todo.learning_time;
  }, 0);

  const today = moment().format("YYYY-MM-DD");
  const [memo, setMemo] = useState("오늘도 화이팅!");
  const date = plannerDatas.date;
  const hour = useSelector(
    (state: RootState) => state.addTaskReducer.plannerDatas.learning_time
  );

  const [open, setOpen] = useState(false);

  const handleModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // todo 삭제 버튼
  const deleteHandler = function (e: any) {
    console.log(e.target);
    dispatch(deleteTodo(e.target.id));
  };

  // add todo card button 이벤트
  const [isClick, setIsClick] = useState(false);

  const clickHandler = function () {
    if (isClick) {
      setIsClick(false);
    } else {
      const rootEle = document.getElementById("root") as HTMLElement;
      console.log(rootEle);
      if (rootEle) {
        rootEle.style.animation = `fadeIn`;
      }

      setIsClick(true);
    }
  };

  const [percent, setPercent] = useState(0);
  const checkHandler = function (e: any) {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    const checklist = document.querySelectorAll('input[type="checkbox"]');
    const percent = checked.length / checklist.length;
    setPercent(Math.floor(percent * 100));
  };

  return (
    <>
      <div id="todo-view-upper">
        <div className="plnnerfrom-date">{date}</div>
        <div className="plnnerfrom-progress">
          <Progress
            type="circle"
            strokeColor="#000"
            percent={percent}
            width={50}
          />
        </div>
        <div className="plnnerfrom-memo">
          <button className="memo-edit-btn" onClick={handleModal}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          {memo}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            className={classes.modal}
            onClose={handleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <p id="transition-modal-description">
                  오늘의 다짐을 입력해주세요.
                </p>
                <input
                  onChange={(e) => {
                    setMemo(e.target.value);
                    dispatch(addUpperData(memo));
                  }}
                  value={memo}
                  className={classes.text}
                ></input>
                <button className="memo-save-btn" onClick={handleModal}>
                  <DoneIcon />
                </button>
              </div>
            </Fade>
          </Modal>
        </div>
        <div className="plnnerfrom-hour">
          <i className="fas fa-stopwatch"></i>
          {runningTime}h
        </div>
      </div>
      <Container id="todo-veiw-container">
        <button onClick={() => clickHandler()} className="add-todo-btn">
          {" "}
          <CreateIcon />{" "}
        </button>
        {isClick && <AddTodoModal clickHandler={clickHandler} />}
        <h3 className="todobar-title">Time Table</h3>
        {todos.length === 0 ? (
          <div className="warning-message">Make your todo list</div>
        ) : (
          todos.map((task: any) => {
            console.log(task.id);
            return (
              <div key={task.id}>
                <TimeBar>
                  <StartTime>{task.start_time}</StartTime>
                  <Hours>{task.learning_time}hours</Hours>
                </TimeBar>
                <TodoBox
                  id={task.id}
                  style={{ height: `calc(${task.learning_time} * 43px)` }}
                >
                  <div
                    className="color-label"
                    style={{ backgroundColor: task.box_color }}
                  ></div>
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    onChange={(e) => {
                      checkHandler(e);
                    }}
                    id={task.id}
                  ></input>
                  <div className="todobox-content">
                    <Subject>{task.subject}</Subject>
                    <Todo>{task.todo_comment}</Todo>
                  </div>
                  <button
                    onClick={(e: any) => deleteHandler(e)}
                    id={task.id}
                    className="todo-delete-btn"
                  >
                    <i id={task.id} className="fas fa-minus"></i>
                  </button>
                </TodoBox>
              </div>
            );
          })
        )}
      </Container>
    </>
  );
}

export default AddTodo;
