import { useState } from "react";
import Footer from "../components/Footer";
import styled from "@emotion/styled";
import circle from "../img/circle.png";
import landing from "../img/landing-animation.gif";
import "../App.css";
import "../css/landing.css";
import icon1 from "../img/to-do-list.png";
import icon2 from "../img/color-palette.png";
import icon3 from "../img/sharing.png";
import icon4 from "../img/sunrise.png"
import award from "../img/award.png";
import study from "../img/study.png";
import achievement from "../img/achievement.png";
import mainGif from "../img/man01.gif";
import example01 from "../img/example.png";
import section4 from "../img/section4.png";


const LandingSection = styled.div`
  height: 100%;
  text-align: center;
  font-size: 50px;
  transition: transform 1s, opacity 2s;
  // overflow-y: scroll;
`;
const Button = styled.button`
  position: fixed;
  top: 90%;
  left: 90%;
  border-radius: 76px;
  outline: none;
  border: none;
  text-align: center;
  width: 60px;
  height: 40px;
  background-color: #b9b3d1;
  color: #fff;
  font-size: 1.5rem;
  padding: 5px 10px;
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
        elem.style.transform = "translateY(-10%)";
      } else {
        elem.style.opacity = "1";
        elem.style.transform = "translateY(0px)";
      }
    });

    const left = document.querySelectorAll<HTMLElement>(".left");
    left.forEach((elem) => {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        elem.style.transform = "translateX(-15%)";
      } else {
        elem.style.opacity = "1";
        elem.style.transform = "translateY(0%)";
      }
    });

    const inside = document.querySelectorAll<HTMLElement>(".inside");
    inside.forEach((elem) => {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.animationName = "stretch";
        elem.style.opacity = "0";
        elem.style.marginTop = "0%";
        elem.style.transform = " scale(0) rotate(13deg)";
      } else {
        elem.style.opacity = "1";
        elem.style.transform = "scale(1) rotate(0deg)";
      }
    });

    const justOpacity = document.querySelectorAll<HTMLElement>(".just-opacity");
    justOpacity.forEach((elem) => {
      if (isElementUnderBottom(elem, -20)) {
        elem.style.opacity = "0";
        // elem.style.transform = " scale(1.2)";
      } else {
        elem.style.opacity = "1";
        // elem.style.transform = "scale(1)";
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  const content = [
    {
      id: 1,
      text: "Write today's to-dos and color your labels to see them at a glance.",
      src: example01,
    },
    {
      id: 2,
      text: "You can see the planner I created in my feed. You can view your planner more easily by providing it as a list.",
      src: example01,
    },
    {
      id: 3,
      text: "See how other earlybirds are studying and get motivated.You can also search by tag and username.",
      src: example01,
    },
  ];

  const [clickID, setClickID] = useState<number>(1);
  console.log(clickID);
  const clickHandler = (e: any) => {
    console.log(e.target.id);
    if (clickID === content.length) {
      setClickID(1);
    } else {
      setClickID(Number(e.target.id) + 1);
    }
  };

  return (
    <>
      <LandingSection id="section1">
        <div className="left-txt">
          <h3 className="title">Dawn:on</h3>
          <p className="upper-description">Plan, Organize, Get Things Done</p>
          <p className="description">
            {/* We fill your day <br></br>preparing for a new start. */}
            <br></br>
            To prepare for a new beginning.
            <br></br>
            Preparing for a new challenge.
            <br></br>
            We'll fill your day. Dawn:on
          </p>
        </div>
        <div className="right-img">
          <img className="section01-img" src={landing} alt="프로젝트 소개" />
        </div>
      </LandingSection>
      <LandingSection id="section2">
        <div className="title left">
          Are you struggling with how to start your day?<br></br>
          Create and share your own study planner!
        </div>
        <div className="section02-left-upper">
          <img src={icon1} className="inside" alt="todo" />
          <h4 className="txt-01-title up-on-scroll">TODO LIST</h4>
          <div className="description">
            Manage tasks by time Manage them smartly according to the time you
            write. Label colors for each task for easier viewing.
          </div>
        </div>
        <div className="section02-left-lower">
          <img src={icon2} className="inside" alt="custom" />
          <h4 className="txt-01-title up-on-scroll">CUSTOM PLANNER</h4>
          <div className="description">
            You can create your own planner with colors, patterns, and stickers
            of your own choosing.
          </div>
        </div>
        <img src={mainGif} alt="타겟 소개" />
        <div className="section02-right-txt">
          <img className="inside" src={icon3} alt="icon3"></img>
          <h4 className="txt-01-title up-on-scroll">SHARE YOUR PLAN</h4>
          <div className="description">
            Create your own planner by selecting colors and patterns, and attach
            stickers to complete your own planner.
          </div>
        </div>
      </LandingSection>
      <LandingSection id="section3" className="font-color">
        <div className="section03-title up-on-scroll">
        A special planner <br></br> for early birds
        <img className="inside" src={icon4} alt="icon4"></img>
        </div>
          {clickID === 1 &&
          (<div id="1" className="slide-container">
            <div className="slide-txt up-on-scroll">{content[0].text}</div>
            <img alt="slide-img" src={content[0].src}></img>
          </div>)
          }
          {clickID === 2 &&
          (<div id="1" className="slide-container">
            <div className="slide-txt up-on-scroll">{content[1].text}</div>  
            <img alt="slide-img" src={content[1].src}></img>
          </div>)
          }
          {clickID === 3 &&
          (<div id="1" className="slide-container">
            <div className="slide-txt up-on-scroll">{content[2].text}</div>
            <img alt="slide-img" src={content[2].src}></img>
          </div>)
          }
          <button id={clickID.toString()} className="slide-next-btn" 
            onClick={(e:any) => clickHandler(e)}>
          <i id={clickID.toString()} className="fas fa-chevron-right"></i>
        </button>
      </LandingSection>
      <LandingSection id="section4">
        <img alt ="section4" src={section4}></img>
        <div className="section4-title">Benefits</div>
        <div id="section04-container">
          <div className="advantages left">
            <img alt="icon1" src={award}></img>
            <div>Looking at the time I have studied so far and the list of planners I have made</div>
          </div>
          <div className="advantages left">
            <img alt="icon2" src={achievement}></img>
            <div>Get Motivated by Watching Early Birds Day</div>
          </div>
          <div className="advantages left">
            <img alt="icon3" src={study}></img>
            <div>You can form a study habit by constantly recording a planner</div>
          </div>
        </div>
      </LandingSection>
      <Button
        id="landing-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Top
      </Button>
      <Footer />
    </>
  );
}

export default Landing;
