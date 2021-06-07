
import PlannerView from "../components/PlannerView";
import Uploadbar from "../components/Uploadbar";
import Custombar from "../components/CustomBar";
function CustomViewer() {
  
  return(
    <div id="custom-planner-container">
        <div className="side-txt">Custom Planner</div>
          <PlannerView />
          <Uploadbar />
      </div>
  )
}

export default CustomViewer;