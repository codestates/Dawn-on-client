import "../css/footer.css";
import github from "../img/github.png";
import { Popover, Button } from 'antd';

function Footer() {
  const frontEnd = (
    <div>
      <p>Frontend</p>
    </div>
  );
  const backEnd = (
    <div>
      <p>Backend</p>
    </div>
  );
  return (
    <div id="footer">
      <div id="Dawn-on">
        Dawn:on<br></br>
         Done:up @ 2021 Dawn:on
      </div>
      <div id="github-list">
        <img className="github-link" src={github} width="30" height="30" />
          <span
            className="github-link"
            onClick={() => window.open("https://github.com/Hprogram", "_blank")}
          >
            전영호
          </span>
        <span
          className="github-link"
          onClick={() => window.open("https://github.com/gookgookJ", "_blank")}
        >
          장한국
        </span>
        <span
          className="github-link"
          onClick={() => window.open("https://github.com/allofhyuk", "_blank")}
        >
          권재혁
        </span>
        <span
          className="github-link"
          onClick={() => window.open("https://github.com/Jeong-HW", "_blank")}
        >
          정현웅
        </span>
      </div>
    </div>
  );
}

export default Footer;
