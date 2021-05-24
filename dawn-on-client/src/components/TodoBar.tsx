import initialState from "../module/initialState";
import { useState } from "react";
import addToColumn from "../module/dragging";
import Column from "../components/Column"; 
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
`
const Timetable = styled.div`
  grid-column: 1 / 4  
`

const Todo = styled.div`
  border: 1px solid red;
`

function TodoBar () {
  const dispatch = useDispatch();
  const myObj: {[index: string]:any} = initialState;
  const [state, setState] = useState(myObj);

  return(
    <>
      <div id="todo-container">
        <table>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default TodoBar;