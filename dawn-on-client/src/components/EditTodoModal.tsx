import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import {
  addNewSubject,
  deleteSubject,
} from "../module/ClickPostViewModule";
import {
  editinData,
} from "../module/addTaskModule";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Popover } from 'antd';
import { HexColorPicker } from "react-colorful";
import { RootState } from "../store/store";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 100,
      fontSize: 20,
    },
  }),
);

function EditTodoModal({ editData, closeEditModal }: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const subjectLabel = useSelector(
    (state: RootState) => state.addTaskReducer.subject
  );

  const todos = useSelector((state:RootState) => state.addTaskReducer.plannerDatas.todos);
  const [newData, setNewData] = useState(editData);
  
  useEffect(() => {
    setNewData(editData);
  }, [editData]);

  const makeInitial = function (startTime: string) {
    const startHour = startTime.split(":")[0];
    const startMin = startTime.split(":")[1];
    let endTimeValue;
    if (Number(startHour) < 9) {
      endTimeValue = `0${Number(startHour) + 1}:${startMin}`;
    } else {
      endTimeValue = `${Number(startHour) + 1}:${startMin}`;
    }
    return endTimeValue;
  };
  // ????????????, ???????????? ??????.
  const [startTime, setStartTime] = useState(newData.start_time);
  const [endTime, setEndTime] = useState(makeInitial(newData.start_time));

  useEffect(() => {
  }, [startTime]);

  useEffect(() => {
  }, [endTime]);

  // ????????? ?????? ??????.
  const [selectedSub, setSelectedSub] = useState<string>(editData.subject);

  // ????????? ?????? ?????? ??????.(????????? ?????? input ???)
  const [newSubject, setNewSubject] = useState<string>("");

  // ????????? ?????? ?????? ?????? ??????.
  const newSubjectHandler = function (e: any) {
    const inputSub = document.querySelector(
      ".todobar-newsubject-input"
    ) as HTMLInputElement;
    // ???????????? ?????????.
    const check = subjectLabel.filter((sub: any) => sub.subject === newSubject);

    if (newSubject !== "" && check.length === 0) {
      dispatch(addNewSubject(newSubject));
    }
    if (check.length !== 0) {
      swal("?????? ???????????? ???????????????.", "", "error");
      inputSub.value = "";
    }
    if (newSubject === "") {
      swal("???????????? ??????????????????.", "", "error");
      inputSub.value = "";
    }
    if (subjectLabel.length > 7) {
      swal("????????? 8??? ?????? ????????? ??? ????????????.", "", "error");
    }
  };

  // ????????? ?????? ?????? ?????? ?????? ??? ????????? ?????? ??????.
  const selectHandler = function (e: any) {
    const selectStatus = document.querySelector(".selected");
    if (selectStatus) {
      // ?????? ????????? ????????? ??????????
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

  // ?????? ??????
  const deleteLabel = function (e: any) {
    dispatch(deleteSubject(e.target.id));
  };

  // dispatch??? ??????????????? ??? ????????? : ????????????, ??????(??????, ??????), ??? ??? ??????
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
      swal("????????? ??????????????????.", "", "error");
    } else if (newData.todo_comment === "") {
      swal("?????? ??? ?????? ??????????????????.", "", "error");
    } else if (totalHours <= 0) {
      swal("????????? ?????? ??????????????????.", "", "error");
    } else {
      // dispatch(editTodoData(newData));
      newData.start_time = startTime;
      newData.learning_time = totalHours;
      dispatch(editinData(newData));
      document.querySelector(".selected")?.classList.remove("selected");
      closeEditModal();
    }
  };

  const content = (
    <HexColorPicker
    id="color-picker"
    color={newData.box_color}
    onChange={(newValue: any) => {
      handleChange(newValue);
    }}
  />
  );


  const [colorClick, setColorClick] = useState(false);

  const colorPickHandler = function () {
    if (colorClick) {
      setColorClick(false);
    } else {
      setColorClick(true);
    }
  };

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
          placeholder="??? ?????? ??????????????????."
          variant="outlined"
      />
      <div className="modal-btn-container">
        <button
          onClick={() => {
            editSave();
          }}
          className="todobar-save-btn"
        >
          EDIT
        </button>
      </div>
    </AddTodoBar>
    </>
  );
}

export default EditTodoModal;
