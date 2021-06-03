// 플래너를 작성 후 게시물 업로드하는 페이지
// PlannerForm , CustomBar
import PlannerView from "../components/PlannerView";
import Uploadbar from "../components/Uploadbar";
import styled from "@emotion/styled";
import Custombar from "../components/CustomBar";
import background from "../img/3139837.jpg"
import "../css/plannerview.css";

function CustomPlanner() {
  return (
    <>
      <div id="custom-planner-container">
        <div className="side-txt">Custom Planner</div>
          <PlannerView />
          <Uploadbar />
      </div>
    </>
  );
}

export default CustomPlanner;
