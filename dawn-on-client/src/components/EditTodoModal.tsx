import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import {
  editTodoData,
  addNewSubject,
  deleteSubject,
} from "../module/addTaskModule";
import { ColorPicker } from "material-ui-color";
import { RootState } from "../store/store";

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

function EditTodoModal({ editData, closeEditModal }: Props) {
  const dispatch = useDispatch();
  const subjectLabel = useSelector(
    (state: RootState) => state.addTaskReducer.subject
  );

  const [newData, setNewData] = useState(editData);

  useEffect(() => {
    // console.log(editData);
    setNewData(editData);
  }, [editData]);

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
    console.log("시작시간: ", startTime);
  }, [startTime]);

  useEffect(() => {
    console.log("종료시간: ", endTime);
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
    setNewData({ ...newData, box_color: `#${newValue.hex}` });
  };

  // 라벨 삭제
  const deleteLabel = function (e: any) {
    dispatch(deleteSubject(e.target.id));
  };

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
      dispatch(
        editTodoData({
          ...newData,
          start_time: startTime,
          learning_time: totalHours,
        })
      );
      document.querySelector(".selected")?.classList.remove("selected");
      closeEditModal();
    }
  };

  return (
    <>
      <form>
        <TextField
          onChange={async (e: any) => {
            setStartTime(e.target.value);
          }}
          id="edit-start-time"
          label="Start time"
          size="medium"
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
          id="edit-end-time"
          label="End Time"
          type="time"
          value={endTime}
          inputProps={{
            step: 600, // 10 min
          }}
        />
      </form>
      <div className="select-subject">
        <span>Pick label color: </span>
        <ColorPicker
          value={newData.box_color}
          onChange={(newValue: any) => {
            handleChange(newValue);
          }}
        />
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
                <DeleteBtn onClick={(e: any) => deleteLabel(e)} id={ele}>
                  x
                </DeleteBtn>
              </div>
            ))}
        </LabelContainer>
      </div>
      <textarea
        onChange={(e: any) =>
          setNewData({ ...newData, todo_comment: e.target.value })
        }
        value={newData.todo_comment}
        className="todobar-todo"
        placeholder="할 일을 입력해주세요."
      ></textarea>
      <div className="modal-btn-container">
        <button onClick={() => editSave()} className="todobar-save-btn">
          EDIT
        </button>
      </div>
    </>
  );
}

export default EditTodoModal;
