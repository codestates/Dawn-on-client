import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import "../css/plannerview.css";

function PlannerForm () {
  // 날짜
  const [test, setTest] = useState([
    {
      id:'1',
      name: 'task1'
    },
    {
      id:'2',
      name: 'task2'
    },
    {
      id:'3',
      name: 'task3'
    }
  ]);

  const dummyData = {
    date: "2021-05-18",
    dday: 50,
    memo:"수능만점 받을거야아아앍",
    hour:"6h30m",
    checklist: [
      ["국어", "2020 6월 모의고사 풀기"],["국어", "2020 6월 모의고사 풀기"],["국어", "2020 6월 모의고사 풀기"],
      ["수학", "2020 6월 모의고사 풀기"],["수학", "2020 6월 모의고사 풀기"],["수학", "2020 6월 모의고사 풀기"],
      ["영어", "2020 6월 모의고사 풀기"],["영어", "2020 6월 모의고사 풀기"],["영어", "2020 6월 모의고사 풀기"],
    ],
  }
  const [characters, updateCharacters] = useState(test);
  console.log(characters);
  const handleOnDragEnd = function(result:any) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
    console.log(characters);
  }

  return(
    <>
      <div id="plannerform-container">
      <div className="plnnerfrom-date">{dummyData.date}</div>
      <div className="plnnerfrom-dday">{dummyData.dday}</div>
      <div className="plnnerfrom-memo">{dummyData.memo}</div>
      <div className="plnnerfrom-hour">{dummyData.hour}</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
             <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
             {characters.map(({id, name}, index) => {
               return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <p>
                        { name }
                      </p>
                    </li>
                  )}
                </Draggable>
               );
             })}
             {provided.placeholder}
           </ul>
          )}
      </Droppable>
      </DragDropContext>
      </div>
    </>
  )
}

export default PlannerForm;