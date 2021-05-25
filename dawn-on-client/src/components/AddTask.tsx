import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from "sweetalert";
import { addToColumn } from "../module/addTaskModule";

// 직업군에 맞는 select box 선택지 미리 만들어주고 조건부 -> map;

type Props = {
  closeModal: Function,
  setId: any,
  id: number,
}

function AddTask ({closeModal, setId, id} : Props) {
    const dispatch = useDispatch();
    // const [id, setId] = useState<number>(5);
    const [subject, setSubject] = useState<String>("");
    const [hours, setHours] = useState<String>("");
    const [todo, setTodo] = useState<String>("");

    const addData = () => {
      // todo 입력 안됐을 때.
      if(todo === "") {
        swal("오늘 할 일을 입력해주세요.", "", "error");
      }
        setId(id + 1);
        dispatch(addToColumn(id, subject, todo, hours));
        closeModal();
    }

    return (
      <div id="add-task-modal">
        <div>
          <select onChange={(e:any) => e.target.value && setSubject(e.target.value)} className="task-label">
            <option defaultValue={"국어" || ''}>국어</option>
            <option value={"영어" || ''}>영어</option>
            <option value={"수학" || ''}>수학</option>
          </select>
          <select onChange={(e:any) => e.target.value && setHours(e.target.value)}  className="task-time">
            <option defaultValue={"1" || ''}>1</option>
            <option value={"2" || ''}>2</option>
            <option value={"3" || ''}>3</option>
            <option value={"4" || ''}>4</option>
            <option value={"5" || ''}>5</option>
            <option value={"6" || ''}>6</option>
          </select>
        </div>
        <TextField
          id="outlined-name"
          label="오늘 할 일"
          margin="normal"
          multiline
          variant="outlined"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) =>  e.target.value && setTodo(e.target.value)}
        />
        <div className="task-btn-container"> 
        <Button onClick={() => {addData()}} id="task-save-btn" variant="outlined" color="primary">SAVE</Button>
        <Button id="task-cancle-btn" onClick={() => closeModal()}  variant="outlined" color="primary">CANCLE</Button>
        </div>
      </div>
    )
}

export default AddTask;

