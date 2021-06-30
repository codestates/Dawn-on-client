import styled from "@emotion/styled";
import AddTodo from "./AddTodo";
import bgImg from "../img/3139837.jpg"

const PlannerContainer = styled.div`
  grid-column: 3 / 6;
  grid-row: 2 / 7;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  column-gap: 15px;
  row-gap: 15px;
  padding: 20px;
  transition: all 0.6s;
  border-radius: 10px;
  margin: 0;
`


function PlannerView () {
  return(
    <>
      <PlannerContainer id="planner-view">
          <AddTodo />
      </PlannerContainer>
    </>
  )
}

export default PlannerView;