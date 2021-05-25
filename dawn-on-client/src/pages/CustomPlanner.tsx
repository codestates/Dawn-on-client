// 플래너를 작성 후 게시물 업로드하는 페이지
// PlannerForm , CustomBar
import PlannerView from "../components/PlannerView";
import CustomBar from "../components/CustomBar";
import "../css/plannerview.css";

function CustomPlanner() {
  return (
    <>
      <div id="custom-planner-container">
        <div className="side-txt">Custom Planner</div>
        <PlannerView />
        <CustomBar />
      </div>
    </>
  );
}

export default CustomPlanner;
