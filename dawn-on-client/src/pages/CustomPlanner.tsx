// 플래너를 작성 후 게시물 업로드하는 페이지
// PlannerForm , CustomBar
import React from "react";
import PlannerView from "../components/PlannerView";
import CustomBar from "../components/CustomBar";
import PlannerForm from "../components/PlannerForm";

function CustomPlanner() {
  return (
    <>
      <PlannerForm />
      <CustomBar />
    </>
  );
}

export default CustomPlanner;
