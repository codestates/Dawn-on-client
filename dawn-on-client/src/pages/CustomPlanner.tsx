// 플래너를 작성 후 게시물 업로드하는 페이지
// PlannerForm , CustomBar
import PlannerView from "../components/PlannerView";
import Uploadbar from "../components/Uploadbar";
import Custombar from "../components/CustomBar";
import "../css/plannerview.css";

function CustomPlanner() {
  return (
    <>
      <div id="custom-planner-container">
        <div className="side-txt">Custom Planner</div>
        <PlannerView />
        <Custombar />
        <Uploadbar />
      </div>
    </>
  );
}

export default CustomPlanner;
