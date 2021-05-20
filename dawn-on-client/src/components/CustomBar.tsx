import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "../css/custombar.css"

function CustomBar () {

  const onDragEnd = function() {
    console.log('Drag ended');
  }

  return(
    <div id="custombar-container">

    </div>
  )
}

export default CustomBar;