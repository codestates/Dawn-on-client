import Footer from "../components/Footer";
import styled from "@emotion/styled";
import Login from "../components/Login";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const LandingSection = styled.div`
  height: 100vh;
  color: #000;
  text-align: center;
  font-size: 50px;
  transition: transform 0.7s, opacity 1s;
`;
const Button = styled.button`
  position: fixed;
  top: 95%;
  left: 95%;
  border-radius: 76px;
  outline: none;
  border: none;
  background-color: #2b3390;
  color: #faee9d;
  width: 40px;
`;

function Landing() {
  // Scroll animation
  function isElementUnderBottom(elem: Element, triggerDiff: number) {
    const { top } = elem.getBoundingClientRect();
    const { innerHeight } = window;
    return top > innerHeight + (triggerDiff || 0);
  }
  function handleScroll() {
    const elems = document.querySelectorAll<HTMLElement>(".up-on-scroll");
    elems.forEach((elem) => {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        elem.style.transform = "translateY(100px)";
      } else {
        elem.style.opacity = "1";
        elem.style.transform = "translateY(0px)";
      }
    });
  }

  window.addEventListener("scroll", handleScroll);

  return (
    <>
      {/* <Login /> */}
      <LandingSection id="section1" className="up-on-scroll">
        section01
      </LandingSection>
      <LandingSection id="section2" className="up-on-scroll">
        section02
      </LandingSection>
      <LandingSection id="section3" className="up-on-scroll">
        section03
      </LandingSection>
      <LandingSection id="section4" className="up-on-scroll">
        section04
      </LandingSection>
      <LandingSection id="section5" className="up-on-scroll">
        section05
      </LandingSection>
      <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Top
      </Button>
      <Footer />
    </>
  );
}

export default Landing;
