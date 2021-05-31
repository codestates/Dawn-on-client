import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import TextField from '@material-ui/core/TextField';
import swal from "sweetalert";
import { addToTimetable, addNewSubject } from "../module/addTaskModule";
import { ColorPalette } from "material-ui-color";

const AddTodoBar = styled.div`
  font-family: 'KoHo', sans-serif;
  display: flex;
  position: fixed;
  top: calc(50% - 30vh);
  left: calc(50% - 15vw);
  background-color: #fff;
  z-index: 1;
  width: 30vw;
  height: 60vh;
  border: 1px solid #000;
  border-radius: 5px;
  flex-direction: column;s
  overflow-y: scroll;
  padding: 10px 15px;
`

type Props = {
  clickHandler: any;
}

function AddTodoModal ({clickHandler} :Props) {
  const dispatch = useDispatch();
  
  const [id, setId] = useState<number>(3);

  // 유저가 선택한 color
  const [color, setColor] = useState("#fff");
  console.log('color', color);


  // 시작시간, 종료시간 상태.
  const [time, setTime] = useState({
    startTime: "07:30",
    endTime: "10:30",
  })

  // startTime, endTime의 type이 string이기 때문에 계산해줘야함.
  const [totalHour, setTotalHour] = useState(3);
  console.log(time);
  const timeCalculator = function () {
    const startHour = Number(time.startTime.split(":")[0]);
    const endHour = Number(time.endTime.split(":")[0]);
    const startMin = Number(time.startTime.split(":")[1]);
    const endMin = Number(time.endTime.split(":")[1]);
    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    const totalHours = Math.floor((end - start) / 60);
    if(totalHours > 0) {
      setTotalHour(totalHours);
    }else {
      swal('종료시간을 다시 선택해주세요.', '', 'error');
    }
    console.log(totalHour);
  }


  // 과목 목록 상태.
  const [subject, setSubject] = useState([
    { 
      subject: '국어',
      color: "#ecf0f1", 
    }, 
    { 
      subject: '영어',
      color: "#f5cd79", 
    }, 
    { 
      subject: '수학',
      color: "#F8EFBA", 
    }
  ]);

  const palette = {
    while: '#ecf0f1', 
    yellow1: '#F8EFBA', 
    yellow2: '#f5cd79', 
    green1: '#9AECDB',
    green2: '#55E6C1', 
    purple: '#D6A2E8', 
    orange: '#FEA47F', 
    deeporange: '#F97F51'
  };
  
  // 선택한 과목 저장.
  const [selectedSub, setSelectedSub] = useState<string>("");
  // 새로운 과목 생성 상태.(새로운 과목 input 값)
  const [newSubject, setNewSubject] = useState<string>("");
  // 추후에 과목 추가 버튼 누르면 input창 뜨도록
  // const [subjectAddBtn, setSubjectAddBtn] = useState(false);
  // todo 상태.
  const [todo, setTodo] = useState<string>("");
  
  // 선택한 과목 라벨 상태 변경 및 스타일 추가 함수.
  const selectHandler = function (e:any) {
    const selectStatus = document.querySelector(".selected");
    if(selectStatus) { // 이미 선택한 라벨이 있다면?
      selectStatus.classList.remove("selected"); 
      e.target.classList.add("selected"); 
      setSelectedSub(e.target.value);
    }      
    else {
      e.target.classList.add("selected"); 
      setSelectedSub(e.target.value);
    }
  }

  // 새로운 과목 라벨 생성 함수.
  const newSubjectHandler = function (e:any) {
    const inputSub = document.querySelector(".todobar-newsubject-input") as HTMLInputElement;
    // 중복여부 체크용.
    const check = subject.filter(sub => sub.subject === newSubject);
    console.log(check);
    if(newSubject !== "" && check.length === 0) {
      dispatch(addNewSubject(newSubject, color));
      console.log(newSubject);
      setSubject([...subject, {subject: newSubject, color: color}]); // subject array에 넣어준다.
      console.log(subject);
    }
    if(check.length !== 0) {
      swal("이미 존재하는 과목입니다.", "", "error");
      inputSub.value= ""
    }
    if(newSubject === "") {
      swal("과목명을 입력해주세요.", "", "error");
      inputSub.value= ""
    }
    if(subject.length > 7) {
      swal("라벨은 8개 이상 생성할 수 없습니다.", "", "error");
    }
  }
  
  // save 버튼 이벤트
  // dispatch로 리덕스 모듈에 넘겨주어 state 변경.
  const saveTodo = function () {
    if(selectedSub === "") {
      swal("과목을 선택해주세요.", "", "error");
    }else if(todo === "") {
      swal("오늘 할 일을 입력해주세요.", "", "error");
    }else {
      console.log(totalHour);
      dispatch(addToTimetable(id, selectedSub, todo, time.startTime , totalHour, color));
      setTodo("");
      document.querySelector(".selected")?.classList.remove("selected");
      clickHandler();
    }
  }

  return(
      <AddTodoBar>
        <div id="todo-modal-upper">
          <h3 className="todobar-title">Add your todos</h3>
          <button className="close-add-btn" onClick={() => clickHandler()}><i className="fas fa-times"></i></button>
        </div>
         <form noValidate>
          <TextField
            onChange={(e:any) => {setTime({...time, startTime: e.target.value,});timeCalculator()}}
            id="start-time"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            inputProps={{
              step: 600, // 10 min
            }}
          />
          <TextField
            onChange={(e:any) => {setTime({...time, endTime: e.target.value});timeCalculator();}}
            id="end-time"
            label="End Time"
            type="time"
            defaultValue="10:30"
            inputProps={{
              step: 600, // 10 min
            }}
          />
        </form>
        <button className="subject-edit-btn">edit</button>
        <div className="select-subject">
        <ColorPalette onSelect={(bgColor) => {
              setColor(palette[bgColor]);
              console.log(bgColor)
            }} 
            
            palette={palette} />
          <div className="make-new-label">
            <input 
              onChange={(e:any) => setNewSubject(e.target.value)} 
              className="todobar-newsubject-input" 
              placeholder="add new subject" 
              value={newSubject} /> 
            <button 
              onClick={(e:any) => newSubjectHandler(e)} 
              className="add-label-btn">
              <i className="fas fa-plus"></i>
            </button>
          </div>
            {
              subject.map(ele => 
                  <button onClick={(e:any)=> selectHandler(e)} 
                  key={ele.subject} 
                  name="subject" 
                  value={ele.subject} 
                  id={ele.subject}
                  style={{border:`1px solid ${ele.color}`}}
                  className="todobar-subject">{ele.subject}</button>
              )
            }
        </div>
        <textarea onChange={(e:any) => setTodo(e.target.value)} value={todo} className="todobar-todo" placeholder="할 일을 입력해주세요."></textarea>
        <div className="modal-btn-container">
          <button onClick={() => clickHandler()} className="todobar-save-btn" >Cancel</button>
          <button onClick={() => {setId(id + 1);saveTodo();}} className="todobar-save-btn" >SAVE</button>
        </div>
       </AddTodoBar>
  )
}

export default AddTodoModal;
