import { useState } from "react";
import {
  DragDropContext,
} from 'react-beautiful-dnd';
import styled from "@emotion/styled";
import initialState from "../module/initialState";
import Column from "../components/Column";
// import TodoBar from "../components/TodoBar";

const Timetable = styled.div`
  grid-column: 1 / 4  
`
const Todo = styled.div`
  grid-column: 4 / 5
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`
function PlannerView () {
  // 날짜
 
  const dummyData = {
    date: "2021-05-18",
    dday: 50,
    memo:"수능만점 받을거야아아앍",
    hour:"6h30m",
  }

  const myObj: {[index: string]:any} = initialState;
  const [state, setState] = useState(myObj);

  console.log(state);
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // 드래그 범위 밖일 떄.
    if (!destination) {
      return
    }

    // 같은 컬럼 내에서 순서도 변경 안됐을 시.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // 드래그 시작 시점
    const start = state.columns[source.droppableId]
    // 드래그 종료 지점
    const finish = state.columns[destination.droppableId]

    // 같은 컬럼 내에서 순서 변경.
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      }

      setState(newState)
      return;
    }

    // 다른 컬럼으로 이동 
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    setState(newState)
  }

  // Column1, Column2 tasks 분기.
  const tasks1 = state.columns['column-1'].taskIds.map(
    (taskId:any) => state.tasks[taskId]
  )

  return(
    <>
      <div id="plannerform-container">
      <div className="plnnerfrom-date">{dummyData.date}</div>
      <div className="plnnerfrom-dday">{dummyData.dday}</div>
      <div className="plnnerfrom-memo">{dummyData.memo}</div>
      <div className="plnnerfrom-hour">{dummyData.hour}</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Timetable id="task1">
            <Column key={state.columns['column-1'].id} column={state.columns['column-1']} tasks={tasks1} />
          </Timetable>
         </DragDropContext>
      </div>
    </>
  )
}

export default PlannerView;