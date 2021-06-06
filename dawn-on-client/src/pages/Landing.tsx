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
import mainGif from "../img/man01.gif";
import example01 from "../img/example.png"


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
  width: 40px;
  background-color: #b9b3d1;
  color: #fff;
  font-size: 1.1rem;
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
        elem.style.animationName = "stretch"
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
      text: "오늘 할 일을 작성하고 라벨 컬러를 지정하여 한 눈에 확인해보세요. 할 일을 작성한 후에 커스텀하여 플래너를 꾸밀 수 있습니다.",
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
    }
  ]

  const [clickID, setClickID] = useState<number>(1); 
  console.log(clickID);
  const clickHandler = (e:any ) => {
    console.log(e.target.id);
    if(clickID === (content.length)) {
      setClickID(1);
    }
    else{
      setClickID(Number(e.target.id) + 1);
    }
  }

  return (
    <>
      <LandingSection id="section1">
        <div className="left-txt">
          <h3 className="title">Dawn : on</h3>
          <p className="description">Plan, Organize, Get Things Done</p>
        </div>
        <div className="right-img">
          <img className="section01-img" src={landing} alt="프로젝트 소개" />
        </div>
      </LandingSection>
      <LandingSection id="section2">
      <div className="title left">Are you struggling with how to start your day?<br></br>
        Create and share your own study planner!</div>
      <div className="section02-left-upper">
        <img src={icon1} className="inside"  alt="todo"/>
        <h4 className="txt-01-title up-on-scroll">TODO LIST</h4>
        <div className="description">
        Manage tasks by time Manage them smartly according to the time you write. Label colors for each task for easier viewing.
        </div>
      </div>
      <div className="section02-left-lower">
        <img src={icon2} className="inside" alt="custom"/>
        <h4 className="txt-01-title up-on-scroll">CUSTOM PLANNER</h4>
        <div className="description">
        You can create your own planner with colors, patterns, and stickers of your own choosing.
        </div>
      </div>
        <img src={mainGif} alt="타겟 소개" />
        <div className="section02-right-txt">
          <img className="inside" src={icon3} alt="icon3"></img>
          <h4 className="txt-01-title up-on-scroll">SHARE YOUR PLAN</h4>
          <div className="description">
          Create your own planner by selecting colors and patterns, and attach stickers to complete your own planner.
          </div>
        </div>
      </LandingSection>
      <LandingSection id="section3">
        <div className="section03-title left just-opacity">
        A special planner <br></br> for early birds
        <img className="just-opacity" src={icon4} alt="icon4"></img>
        </div>
          {clickID === 1 &&
          (<div id="1" className="slide-container">
            <div className="slide-txt">{content[0].text}</div>
            <img alt="slide-img" width="50%" src={content[0].src}></img>
          </div>)
          }
          {clickID === 2 &&
          (<div id="1" className="slide-container">
            <div className="slide-txt">{content[1].text}</div>  
            <img alt="slide-img" width="50%" src={content[1].src}></img>
          </div>)
          }
          {clickID === 3 &&
          (<div id="1" className="slide-container">
            <div className="slide-txt">{content[2].text}</div>
            <img alt="slide-img" width="50%" src={content[2].src}></img>
          </div>)
          }
        <button id={clickID.toString()} className="slide-next-btn" 
        onClick={(e:any) => clickHandler(e)}>next</button>
      </LandingSection>
      <LandingSection id="section4">
        <div>

        </div>
      </LandingSection>
      <LandingSection id="section5">
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
