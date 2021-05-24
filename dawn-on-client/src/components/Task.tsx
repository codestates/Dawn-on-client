import React from 'react'
import styled from "@emotion/styled";
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 5px;
  background: #fff;
`

type Props = {
  task: any,
  index: any,
};


function Task ({ task, index }: Props) {
    return (
      <Draggable
        draggableId={task.id}
        index={index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            id="task-container"
          >
            <p>{task.subject}</p>
            <div>{task.content}</div>
          </Container>
        )}
      </Draggable>
    )
}

export default Task;
