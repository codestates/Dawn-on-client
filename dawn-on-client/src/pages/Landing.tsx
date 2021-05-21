import Footer from "../components/Footer";
import styled from "@emotion/styled";
import circle from "../img/circle.png";
import section01 from "../img/section01.png";
import "../App.css";
import "../css/landing.css";

const LandingSection = styled.div`
  height: 100vh;
  color: #000;
  text-align: center;
  font-size: 50px;
  transition: transform 1s, opacity 1s;
  overflow-y:scroll;
`;
const Button = styled.button`
  position: fixed;
  top: 95%;
  left: 90%;
  border-radius: 76px;
  outline: none;
  border: none;
  background-color: #2b3390;
  color: #faee9d;
  font-size: 2rem;
  padding: 10px 15px;
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
        elem.style.transform = "translateY(50px)";
      } else {
        elem.style.opacity = "1";
        elem.style.transform = "translateY(0px)";
      }
    });
  }
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  return (
    <>
      {/* <Login /> */}
      <LandingSection id="section1">
        {/* <img className="back-circle" src={circle} alt=""></img> */}
        <div className="circle"></div>
        <div className="left-txt">
          <div className="title up-on-scroll">Dawn-on</div>
          <p className="description">Project description</p>
        </div>
        <div className="right-img">
          <img className="section01-img" src={section01} alt="프로젝트 소개"/> 
        </div>
      </LandingSection>
      <LandingSection id="section2">
        <div className="left-txt">
          <div className="title up-on-scroll">All learner</div>
          <p className="description">Target description</p>
        </div>
        <div className="right-img">
          <img alt="타겟 소개"/> 
        </div>
      </LandingSection>
      <LandingSection id="section3">
        <div className="left-img">
          <img alt="star collection 소개"/> 
        </div>
        <div className="right-txt">
          <div className="title up-on-scroll">Star collection</div>
          <p className="description">Benefits</p>
        </div>
      </LandingSection>
      <LandingSection id="section4">
        <div className="inner-scroll">
          <div className="title up-on-scroll">How It Works</div>
          <div className="inner-scroll-pair">
            <div className="inner-scroll-title">Custom planner</div> 
            <img alt="howto01"/> 
          </div>
          <div className="inner-scroll-pair">
            <div className="inner-scroll-title">Save your feed</div> 
            <img alt="howto02"/> 
          </div>
          <div className="inner-scroll-pair">
            <div className="inner-scroll-title">Share with other learner</div> 
            <img alt="howto03"/> 
          </div>
          <div className="inner-scroll-pair">
            <div className="inner-scroll-title">Star collection</div> 
            <img alt="howto04"/> 
          </div>
        </div>
      </LandingSection>
      <LandingSection id="section5">
        <div>
          이미지 슬라이드
        </div>
      </LandingSection>
      <Button id="landing-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Top
      </Button>
      <Footer />
    </>
  );
}

export default Landing;
