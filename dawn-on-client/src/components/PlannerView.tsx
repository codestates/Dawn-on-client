import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';
import "../css/plannerview.css";

function PlannerView () {
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

  const [test2, setTest2] = useState([
    {
      id:'4',
      name: 'task4'
    },
    {
      id:'5',
      name: 'task5'
    },
    {
      id:'6',
      name: 'task6'
    }
  ]);
  const dummyData = {
    date: "2021-05-18",
    dday: 50,
    memo:"수능만점 받을거야아아앍",
    hour:"6h30m",
  }
  const [characters, updateCharacters] = useState(test);
  const [characters2, updateCharacters2] = useState(test2);
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const move = function(result:any) {
    const { source, destination, droppableSource, droppableDestination } = result;
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  // const id2List = {
  //   droppable: 'items',
  //   droppable2: 'selected'
  // };

  // 드래그 종료 시.
  const handleOnDragEnd = function(result:any) {
    const { source, destination } = result;
    console.log('result : ', source, destination);
    if (!destination) return;

    if(source.droppableId === destination.droppableId) {
        // 첫 번째 컬럼에서의 변경이라면,
        if(destination.droppableId === "characters") {
          const items = Array.from(characters);
          const [reorderedItem] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          updateCharacters(items);
          console.log(1);
        }
        // 두 번째 컬럼에서의 변경이라면,
        if(destination.droppableId === "characters2") {
          const items2 = Array.from(characters2);
          const [reorderedItem2] = items2.splice(result.source.index, 1);
          items2.splice(result.destination.index, 0, reorderedItem2);
          updateCharacters2(items2); 
          console.log(2);
        }
      }else {

      }
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
             <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
             {characters.map(({id, name}, index) => {
               return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => {
                    return(
                    <div ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging,
                      provided.draggableProps
                      .style)}>
                      <p>
                        { name }
                      </p>
                    </div>)
                  }}
                </Draggable>
               );
             })}
             {provided.placeholder}
           </div>
          )}
      </Droppable>
      <Droppable droppableId="characters2">
          {(provided) => (
             <div className="characters2" {...provided.droppableProps} ref={provided.innerRef}>
             {characters2.map(({id, name}, index) => {
               return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => {
                    return(
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <p>
                        { name }
                      </p>
                    </div>)
                  }}
                </Draggable>
               );
             })}
             {provided.placeholder}
           </div>
          )}
      </Droppable>
      </DragDropContext>
      </div>
    </>
  )
}

export default PlannerView;