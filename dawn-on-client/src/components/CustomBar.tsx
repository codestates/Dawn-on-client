import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import pattern01 from "../img/pattern01.jpg";
// import { addToTimetable } from "../module/addTaskModule";
import { ColorPalette } from "material-ui-color";
import { changeBackColor } from "../module/addTaskModule";

const StyleBar = styled.div`
  font-family: 'KoHo', sans-serif;
  display: flex
  width: 100%;
  border: 1px solid #000;
  grid-column: 5 / 6;
  grid-row: 2 / 7;
  border-radius: 5px;
  flex-direction: column;s
  overflow-y: scroll;
  padding: 10px 5px;
`


function Todobar () {
  const dispatch = useDispatch();
  // 사용할 컬러 팔레트

  type paletteOptions = {
    [key: string] : string
  }
  
  const palette:paletteOptions = {
    white: '#fff', 
    yellow1: '#F8EFBA', 
    yellow2: '#f5cd79', 
    green1: '#9AECDB',
    green2: '#55E6C1', 
    purple: '#D6A2E8', 
    orange: '#FEA47F', 
    deeporange: '#F97F51',
  };

  const patterns = {
    pattern01: pattern01,

  }

  const bgColorHandler = function(bgColor: string | number) {
    console.log(palette[bgColor])
    dispatch(changeBackColor(palette[bgColor]));
    const plannerview = document.getElementById("planner-view") as HTMLElement;
    plannerview.style.backgroundColor = palette[bgColor];
    plannerview.style.backgroundImage = pattern01;
  }

  return(
      <StyleBar>
        <h2>Custom Planner</h2>
        <h3>Background</h3>
        <h4>Background color</h4>
        <ColorPalette 
        onSelect={(color: string | number) =>
          bgColorHandler(color)} 
        palette={palette} />
        <h4>Background pattern</h4>
        <div>
          {/* <img width="30px" src={pattern01}></img> */}
        </div>
        <h3>Sticker</h3>
        <div className="sticker-group">
        </div>
       </StyleBar>
  )
}

export default Todobar;
