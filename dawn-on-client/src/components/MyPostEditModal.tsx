import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import {
  addNewSubject,
  deleteSubject,
  editTodoData,
  changeMyFeedTotalHour,
} from "../module/ClickPostViewModule";
import { HexColorPicker } from "react-colorful";
import { RootState } from "../store/store";
import { Popover } from 'antd';
import axios from "axios";

const AddTodoBar = styled.div`
  font-family: 'KoHo', sans-serif;
  display: grid;
  background-color: #fff;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  flex-direction: column;
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
  float: right;
`;

type Props = {
  editData: any;
  closeEditModal: any;
};

function MyPostEditModal({ editData, closeEditModal }: Props) {
  const dispatch = useDispatch();
  const subjectLabel = useSelector(
    (state: RootState) => state.addTaskReducer.subject
  );
  const click_postview = useSelector((status: RootState) => {
    return status.getClickPostViewReducer.click_postview;
  });

  const [newData, setNewData] = useState(editData);
  useEffect(() => {
    dispatch(editTodoData(newData));
  }, [dispatch, newData]);


  const makeInitial = function (startTime: string) {
    const startHour = startTime.split(":")[0];
    const startMin = startTime.split(":")[1];
    let endTimeValue;
    if(Number(startHour) < 9) {
      endTimeValue = `0${Number(startHour) + 1}:${startMin}` 
    }else {
      endTimeValue = `${Number(startHour) + 1}:${startMin}`;
    }
    return endTimeValue;
  }
  // 시작시간, 종료시간 상태.
  const [startTime, setStartTime] = useState(newData.start_time);
  const [endTime, setEndTime] = useState(makeInitial(newData.start_time));

  useEffect(() => {
  }, [startTime]);

  useEffect(() => {
  }, [endTime]);

  // 선택한 과목 저장.
  const [selectedSub, setSelectedSub] = useState<string>(editData.subject);

  // 새로운 과목 생성 상태.(새로운 과목 input 값)
  const [newSubject, setNewSubject] = useState<string>("");

  // 새로운 과목 라벨 생성 함수.
  const newSubjectHandler = function (e: any) {
    const inputSub = document.querySelector(
      ".todobar-newsubject-input"
    ) as HTMLInputElement;
    // 중복여부 체크용.
    const check = subjectLabel.filter((sub: any) => sub.subject === newSubject);

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

  const [colorClick, setColorClick] = useState(false);

  const colorPickHandler = function () {
    if (colorClick) {
      setColorClick(false);
    } else {
      setColorClick(true);
    }
  };

  // 선택한 과목 라벨 상태 변경 및 스타일 추가 함수.
  const selectHandler = function (e: any) {
    const selectStatus = document.querySelector(".selected");
    if (selectStatus) {
      // 이미 선택한 라벨이 있다면?
      selectStatus.classList.remove("selected");
      e.target.classList.add("selected");
      setNewData({ ...newData, subject: e.target.id });
    } else {
      e.target.classList.add("selected");
      setNewData({ ...newData, subject: e.target.id });
    }
  };

  const handleChange = (newValue: any) => {
    setNewData({ ...newData, box_color: newValue });
  };

  // 라벨 삭제
  const deleteLabel = function (e: any) {
    dispatch(deleteSubject(e.target.id));
  };


  useState(() => {
    click_postview.todos.map((todo:any) => {
      if(todo.todo_PK === newData.todo_PK) {
        todo = newData;
      }
    })
    click_postview.start_time = startTime;
  })

  // dispatch로 변경해줘야 할 데이터 : 시작시간, 라벨(과목, 컬러), 할 일 내용
  const editSave = async function () {
    // dispatch(changeStudyTime(newData.id, startTime, endTime));
    const startHour = Number(startTime.split(":")[0]);
    const endHour = Number(endTime.split(":")[0]);
    const startMin = Number(startTime.split(":")[1]);
    const endMin = Number(endTime.split(":")[1]);
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;
    const totalHours = Math.round((end - start) / 60);
    if (selectedSub === "") {
      swal("과목을 선택해주세요.", "", "error");
    } else if (newData.todo_comment === "") {
      swal("오늘 할 일을 입력해주세요.", "", "error");
    } else if (totalHours <= 0) {
      swal("시간을 다시 선택해주세요.", "", "error");
    } else {
      click_postview.todos.map((todo:any) => {
        if(todo.todo_PK === newData.todo_PK) {
          todo = newData;
        }
      })
      click_postview.start_time = startTime;
      click_postview.learning_time = totalHours;
      newData.start_time = startTime;
      newData.learning_time = totalHours;
      dispatch(changeMyFeedTotalHour(`${totalHours}h`));
      dispatch(editTodoData(newData));
      editDataPatch();
      document.querySelector(".selected")?.classList.remove("selected");
      window.location.replace("/myfeed");
      closeEditModal();
    }
  };

  const editDataPatch = async function () {
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
      })
      .catch((err) => {
      });
  };

  const content = (
    <HexColorPicker
      color={newData.box_color}
      onChange={(newValue: any) => {
        handleChange(newValue);
      }}
    />
  );
  

  return (
    <>
    <AddTodoBar id="edit-modal-container">
      <div id="todo-modal-upper">
        <h3 className="todobar-title-modal">Edit Each Todo</h3>
      </div>
      <form noValidate>
        <TextField
          onChange={async (e: any) => {
            setStartTime(e.target.value);
          }}
          id="start-time"
          label="Start Time"
          type="time"
          value={startTime}
          inputProps={{
            step: 600, // 10 min
          }}
        />
        <TextField
          onChange={async (e: any) => {
            setEndTime(e.target.value);
          }}
          id="end-time"
          label="End Time"
          type="time"
          value={endTime}
          inputProps={{
            step: 600, // 10 min
          }}
        />
      </form>
      <div className="select-subject">
        <div id="color-pick-container">
          <span>Pick label color</span>
          <Popover content={content} title="Label Color" trigger="click">
            <div id="color-thumbnail-modal" style={{background:newData.box_color}} onClick={() => colorPickHandler()}></div>
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
          <button
            onClick={(e: any) => newSubjectHandler(e)}
            className="add-label-btn"
          >
            <i className="fas fa-plus"></i>
          </button>
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
                <DeleteBtn
                  key={ele.subject}
                  onClick={(e: any) => deleteLabel(e)}
                  id={ele}
                >
                  x
                </DeleteBtn>
              </div>
            ))}
        </LabelContainer>
      </div>
      <TextField
          id="outlined-multiline-static"
          className="writing-comment"
          onChange={(e: any) =>
            setNewData({ ...newData, todo_comment: e.target.value })
          }
          multiline
          rows={5}
          value={newData.todo_comment}
          placeholder="할 일을 입력해주세요."
          variant="outlined"
      />
      <div className="modal-btn-container">
        <button onClick={() => {editSave();}} className="todobar-save-btn">
          EDIT
        </button>
      </div>
    </AddTodoBar>
    </>
  );
}

export default MyPostEditModal;
