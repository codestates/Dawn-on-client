import React from 'react'
import styled from "@emotion/styled";
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
  display: flex;
`
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  border-radius: 10px;
`

type Props = {
  column: any,
  tasks: any,
};

function Column({ column, tasks }: Props) {
    return (
      <Container>
        <Title>{column.title} <button className="todo-add-btn">+</button></Title>
        <Droppable droppableId={column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              draggable={snapshot.isDraggingOver}
              {...provided.droppableProps}
            >
              {tasks.map((task:any , index:any) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
}

export default Column;