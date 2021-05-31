import styled from "@emotion/styled";
import AddTodo from "./AddTodo";
const PlannerContainer = styled.div`
  grid-column: 3 / 5;
  grid-row: 2 / 7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 60px 60px 1fr;
  row-gap: 10px;
  padding: 10px;
  border: 1px solid black;
  transition: all 0.6s;
  border-radius: 5px;
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