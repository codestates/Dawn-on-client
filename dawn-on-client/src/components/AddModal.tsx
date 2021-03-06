import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import {
  addToTimetable,
  addNewSubject,
  deleteSubject,
} from "../module/addTaskModule";
import { HexColorPicker } from "react-colorful";
import { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import { Popover } from 'antd';

const AddTodoBar = styled.div`
  font-family: 'KoHo', sans-serif;
  display: grid;
  background-color: #fff;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  flex-direction: column;s
  overflow-y: scroll;
`;

const LabelContainer = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 2px;
`;

const DeleteBtn = styled.button`
  background: none;
  text-align: center;
  border: none;
  outline: none;
  margin-left: 5px;
  color: #2b3390;
`;

type Props = {
  clickHandler: any;
};

function AddModal({ clickHandler }: Props) {
  const dispatch = useDispatch();
  const todolist = useSelector(
    (state: RootState) => state.addTaskReducer.plannerDatas.todos
  );

  const [todoDatas, setTodoDatas] = useState(todolist);
  useEffect(() => {
    setTodoDatas(todolist);
  }, [todolist]);

  if(todoDatas.length !== 0) {
    todoDatas.sort(function (a:any, b:any) {
      return a.start_time.split(":")[0] -  b.start_time.split(":")[0]
    })
  }

  // 유저가 선택한 color
  const [color, setColor] = useState<string>("#fff");


  // 시작시간, 종료시간 상태.
  const [time, setTime] = useState({
    startTime: "07:30",
    endTime: "10:30",
  });

  // startTime, endTime의 type이 string이기 때문에 계산해줘야함.
  const [totalHour, setTotalHour] = useState<number>(3);
  const timeCalculator = function () {
    const startHour = Number(time.startTime.split(":")[0]);
    const endHour = Number(time.endTime.split(":")[0]);
    const startMin = Number(time.startTime.split(":")[1]);
    const endMin = Number(time.endTime.split(":")[1]);
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    const totalHours = Math.floor((end - start) / 60);
    if (totalHours > 0) {
      setTotalHour(totalHours);
    } else {
      swal("시간을 다시 선택해주세요.", "", "error");
    }
  }

  // 선택한 과목 저장.
  const [selectedSub, setSelectedSub] = useState<string>("");
  // 새로운 과목 생성 상태.(새로운 과목 input 값)
  const [newSubject, setNewSubject] = useState<string>("");
  // redux sub
  const subjectLabel = useSelector((state:RootState) => state.addTaskReducer.subject);

  // const [subjectAddBtn, setSubjectAddBtn] = useState(false);
  // todo 상태.
  const [todos, setTodo] = useState<string>("");

  // 선택한 과목 라벨 상태 변경 및 스타일 추가 함수.
  const selectHandler = function (e: any) {
    const selectStatus = document.querySelector(".selected");
    if (selectStatus) {
      // 이미 선택한 라벨이 있다면?
      selectStatus.classList.remove("selected");
      e.target.classList.add("selected");
      setSelectedSub(e.target.id);
    }      
    else {
      e.target.classList.add("selected"); 
      setSelectedSub(e.target.id);
    }
  }

  // 새로운 과목 라벨 생성 함수.
  const newSubjectHandler = function (e: any) {
    const inputSub = document.querySelector(
      ".todobar-newsubject-input"
    ) as HTMLInputElement;
    // 중복여부 체크용.
    const check =
      (subjectLabel &&
        subjectLabel.filter((sub: string) => sub === newSubject)) ||
      [];
    if (newSubject !== "" && check.length === 0) {
      dispatch(addNewSubject(newSubject));
    }
    if (check.length !== 0) {
      swal("이미 존재하는 과목입니다.", "", "error");
      inputSub.value = "";
    }
    if (newSubject === "") {
      swal("과목명을 입력해주세요.", "", "error");
      inputSub.value = "";
    }
    if (subjectLabel.length > 7) {
      swal("라벨은 8개 이상 생성할 수 없습니다.", "", "error");
    }
  };

  // 라벨 컬러 설정 함수.
  const handleChange = (color: string) => {
    setColor(color);
    const modalThumbnail = document.getElementById("color-thumbnail-modal") as HTMLElement;
    modalThumbnail.style.background = color;
  };

  const [colorClick, setColorClick] = useState(false);

  const colorPickHandler = function () {
    if (colorClick) {
      setColorClick(false);
    } else {
      setColorClick(true);
    }
  };

  const deleteLabel = function (e:any) {
    dispatch(deleteSubject(e.target.id));
  };

  // save 버튼 이벤트
  // dispatch로 리덕스 모듈에 넘겨주어 state 변경.
  const saveTodo = function () {
    let myuuid = uuidv4();
    const startHour = Number(time.startTime.split(":")[0]);
    const endHour = Number(time.endTime.split(":")[0]);
    const startMin = Number(time.startTime.split(":")[1]);
    const endMin = Number(time.endTime.split(":")[1]);
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    const learning_time = Math.floor((end - start) / 60);
    if (learning_time > 0) {
      setTotalHour(learning_time);
    } else {
      swal("시간을 다시 선택해주세요.", "", "error");
    }
    if (selectedSub === "") {
      swal("과목을 선택해주세요.", "", "error");
    } else if (todos === "") {
      swal("오늘 할 일을 입력해주세요.", "", "error");
    } else {
      dispatch(
        addToTimetable(
          myuuid,
          selectedSub,
          todos,
          time.startTime,
          learning_time,
          color
        )
      );
      setTodo("");
      document.querySelector(".selected")?.classList.remove("selected");
      clickHandler();
    }
  };

  const content = (
    <HexColorPicker
    id="color-picker"
    color={color}
    onChange={(newValue: any) => {
      handleChange(newValue);
    }}
  />
  );

  return (
    <AddTodoBar>
      <div id="todo-modal-upper">
        <h3 className="todobar-title-modal">Add your todos</h3>
      </div>
      <form noValidate>
        <TextField
          onChange={(e: any) => {
            setTime({ ...time, startTime: e.target.value });
          }}
          id="start-time"
          label="Start Time"
          type="time"
          defaultValue="07:30"
          inputProps={{
            step: 600, // 10 min
          }}
        />
        <TextField
          onChange={(e: any) => {
            setTime({ ...time, endTime: e.target.value });
          }}
          id="end-time"
          label="End Time"
          type="time"
          defaultValue="10:30"
          inputProps={{
            step: 600, // 10 min
          }}
        />
      </form>
      <div className="select-subject">
        <div id="color-pick-container">
          <span>Pick label color</span>
          <Popover content={content} title="Label Color" trigger="click">
            <div id="color-thumbnail-modal" style={{background:color}} onClick={() => colorPickHandler()}></div>
          </Popover>
        </div>
        <span>Pick Subject Label: </span>
        <div className="make-new-label">
          <input
            onChange={(e: any) => setNewSubject(e.target.value)}
            className="todobar-newsubject-input"
            placeholder="add new subject"
            value={newSubject}
          />
          <DeleteBtn
            onClick={(e: any) => newSubjectHandler(e)}
            className="add-label-btn"
          >
            <i className="fas fa-plus"></i>
          </DeleteBtn>
        </div>
        <LabelContainer>
          {subjectLabel &&
            subjectLabel.map((ele: any) => (
              <div
                onClick={(e: any) => selectHandler(e)}
                key={ele}
                id={ele}
                className="todobar-subject"
              >
                  {ele}
              
                <button
                  key={ele.subject}
                  onClick={(e: any) => deleteLabel(e)}
                  id={ele}
                >
                  x
                </button>
              </div>
            ))}
        </LabelContainer>
      </div>
      <TextField
          id="outlined-multiline-static"
          className="writing-comment"
          onChange={(e: any) => setTodo(e.target.value)}
          multiline
          rows={5}
          value={todos}
          placeholder="할 일을 입력해주세요."
          variant="outlined"
      />
      <div className="modal-btn-container">
        <button onClick={() => saveTodo()} className="todobar-save-btn">
          SAVE
        </button>
        <button onClick={() => clickHandler()} className="todobar-save-btn">
          Cancel
        </button>
      </div>
    </AddTodoBar>
  );
}

export default AddModal;
