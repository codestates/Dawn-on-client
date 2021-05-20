import { useEffect, useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import "../css/customPlanner.css";

function PlannerForm () {
  // 날짜

  const [isMouseDown, setMouseDown] = useState(false);
  const [isSelected, setSelected] = useState(false);

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

  const TimeHandler = function(e:any) {
    e.preventDefault();
    // console.log(e.target);
    if(e.target.className === "highlighted") {
      e.target.classList.remove("highlighted");
      setMouseDown(true);
    }else {
      e.target.className = "highlighted";
      setMouseDown(true);
    }
  }
  const DragHandler = function(e:any) {
    e.preventDefault();
    if(isMouseDown) {
      console.log(e.target)
      if(e.target.className !== "highlighted") {
        e.target.className = "highlighted";
      }else {
        e.target.classList.remove("highlighted");
      }
    }
  }
  const bodyEle = document.querySelector('body');
  bodyEle?.addEventListener("mouseup", (e:any) => {
    if(isMouseDown) {
      setMouseDown(false);
    }
  })


  return(
    <>
      <div id="plannerform-container">
        <div className="plnnerfrom-date">{dummyData.date}</div>
        <div className="plnnerfrom-dday">{dummyData.dday}</div>
        <div className="plnnerfrom-memo">{dummyData.memo}</div>
        <div className="plnnerfrom-hour">{dummyData.hour}</div>
        <div id="lower-container">
          <div id="todo-container">
          <button className="todo-add-btn"><i className="fas fa-plus"></i>add</button>
            {dummyData.checklist.map((list, idx)=> {
              return(
                <div key={idx} className="each-checklist">
                    <span>{list[0]}</span>
                    <input type="checkbox"/> 
                    <label>{list[1]}</label>
                </div>
              )
            })}
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>10</th>
                <th>20</th>
                <th>30</th>
                <th>40</th>
                <th>50</th>
                <th>60</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="hour-txt">6</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">7</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">8</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">9</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">10</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">11</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">12</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">13</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">14</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">15</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">16</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">17</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">18</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">19</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">20</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">21</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
                <td className="hour-txt">22</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
               <td className="hour-txt">23</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
              <tr>
               <td className="hour-txt">24</td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
                <td onMouseDown={e => TimeHandler(e)} onMouseOver={e => DragHandler(e)}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PlannerForm;