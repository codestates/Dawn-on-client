import { useState } from "react";
import { RootState } from '../store/store';
import { useSelector } from 'react-redux'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import styled from "@emotion/styled";
import initialState from "../module/initialState";
// import TimeTable from "./TimeTable";
import AddTask from "./AddTask";
// import TodoBar from "../components/TodoBar";
const Title = styled.h3`
  flex-basis: 80%;
  margin: 8px;
  padding: 8px;
`
const ToDoContainer = styled.div`
  font-family: 'KoHo', sans-serif;
  margin: 8px;
  border: 1px solid #000;
  display: flex;
  grid-column: 3 / 4;
  grid-row: 1 / 4;
  border-radius: 5px;
  flex-direction: column;
  overflow-y: scroll;
`
const Container = styled.div`
  font-family: 'KoHo', sans-serif;
  margin: 8px;
  border: 1px solid #000;
  display: flex;
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  border-radius: 5px;
  flex-direction: column;
`
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`
function PlannerView () {
  // const dispatch = useDispatch();

  let addTask = useSelector((state: RootState) => state.addTaskReducer.plannerData.todos);
  // const [todo, setTodo] = useState(addTask);
  console.log('origin: ', addTask); 
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result
    console.log(draggableId);

    // 드래그 범위 밖일 떄.
    if (!destination) {
      return
    }
    console.log('어디서: ', source);
    console.log('어디로: ', destination);
    console.log('무엇을: ', draggableId);

    const newState = Array.from(addTask);
    const [removed] = newState.splice(source.index, 1);
    newState.splice(destination.index, 0, removed);

    addTask = newState;
    console.log('***: ', newState);
  }

  // Add 모달
  const [addTaskModal, setaddTaskModal] = useState(false);
  // Add 모달 open
  const openModal = function() {
    setaddTaskModal(true);
    const background = document.querySelector('#custom-planner-container ') as HTMLElement;
    background.style.backgroundColor = '#1d469844';
  }
  const closeModal = () => {
    setaddTaskModal(false);
    const background = document.querySelector('#custom-planner-container ') as HTMLElement;
    background.style.backgroundColor = '#fff';
  }
  
  // id 값 상태.
  const [id, setId] = useState<number>(5);

  return(
    <>
      <div id="plannerform-container">
      <div className="plnnerfrom-date">{initialState.plannerData.date}</div>
      <div className="plnnerfrom-dday">{initialState.plannerData.dday}</div>
      <div className="plnnerfrom-memo">{initialState.plannerData.memo}</div>
      <div className="plnnerfrom-hour">{initialState.plannerData.hour}</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <ToDoContainer>
          <div className="title-container">
            <Title>TO DO LIST</Title>
            <button onClick={() => openModal()} className="todo-add-btn">+</button>
          </div>
          {addTaskModal && 
            <AddTask closeModal={closeModal} setId={setId} id={id}/>
          }
          <Droppable droppableId="TASK">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                draggable={snapshot.isDraggingOver}
                {...provided.droppableProps}
              >
                {addTask.map((ele:any , index:number) => (
                    <Draggable
                      draggableId={ele.id}
                      index={index}
                      key={ele.id}
                    >
                    {(provided, snapshot) => (
                      <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        id="task-container"
                      >
                        <p>{ele.subject}</p>
                        <div>{ele.task}</div>
                      </Container>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          </ToDoContainer>
          <Container>
          
          </Container>
         </DragDropContext>
      </div>
    </>
  )
}

export default PlannerView;