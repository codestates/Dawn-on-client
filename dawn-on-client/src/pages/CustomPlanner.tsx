// 플래너를 작성 후 게시물 업로드하는 페이지
// PlannerForm , CustomBar
import PlannerView from "../components/PlannerView";
import Uploadbar from "../components/Uploadbar";
import "../css/plannerview.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function CustomPlanner() {
  const isLogin = useSelector((status: RootState) => {
    return status.isLoginReducer.isLogin;
  });

  return (
    <>
      <div id="custom-planner-container">
        <div className="side-txt">Custom Planner</div>
        <PlannerView />
        <Uploadbar isLogin={isLogin} />
      </div>
    </>
  );
}

export default CustomPlanner;
