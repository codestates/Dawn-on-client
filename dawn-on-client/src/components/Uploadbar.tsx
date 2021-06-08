import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import swal from "sweetalert";
import axios from "axios";
import pattern01 from "../img/pattern01.png";
import pattern02 from "../img/pattern02.png";
import pattern03 from "../img/pattern03.png";
import pattern04 from "../img/pattern04.png";
import pattern05 from "../img/pattern05.png";
import pattern06 from "../img/pattern06.png";
import pattern07 from "../img/pattern07.png";
import pattern08 from "../img/pattern08.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { HexColorPicker } from "react-colorful";
import { Popover } from 'antd';
import {
  changeBackColor,
  addSelectedTags,
  addToTaglist,
  addCommentData,
  deleteAtag,
  resetAfterUpload,
} from "../module/addTaskModule";
import { RootState } from "../store/store";
import { Hidden } from "@material-ui/core";

const CustomContainer = styled.div`
  font-family: "KoHo", sans-serif;
  border-radius: 5px;
  grid-column: 6 / 7;
  grid-row: 2 / 7;
  height: 100%;
  display: grid;
  padding: 20px 15px;
  background: #fff;
  box-shadow: 7px 7px 20px 0px #35405825, 4px 4px 10px 0px #446ec91c;
`;

const UploadButton = styled.button`
  flex: 1 1 auto;
  padding: 3px 15px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.3s;
  background-size: 200% auto;
  color: #fff;
  background-color: #335296;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  // margin-top: 2rem;
  border: none;
  align-self: center;
  flex-basis: 30%;
  justify-self: right;
  margin-left: 40px;
  letter-spacing: 3px;
  &:hover {
     {
      color: #335296;
      background-color: #e1e2e2;
      opacity: 1;
    }
  }
`;

const DeleteBtn = styled.button`
  background: none;
  text-align: center;
  border: none;
  outline: none;
  float: right;
  color: #2b3390;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popButton: {
      background: "none",
      border: "none",
      height: "30px",
      alignSelf: "end",
      justifySelf: "left",
    },
  })
);

type CustomBarProps = {
  isLogin: boolean;
};

function CustomBar({ isLogin }: CustomBarProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tags, setTaglist] = useState(["Dawn", "On", "Project"]);
  const tagList = useSelector((state: RootState) => state.addTaskReducer.tags);
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  const state = useSelector((state: RootState) => state.addTaskReducer);
  const data = useSelector(
    (state: RootState) => state.addTaskReducer.plannerDatas
  );

  const addToTagList = function () {
    if (tag && state.tags.indexOf(tag) === -1 && state.tags.length < 8) {
      // setTaglist([...tags, tag]);
      dispatch(addToTaglist(tag));
      setTag("");
    }
    if (!tag) {
      swal("태그를 입력해주세요", "", "error");
      setSelectedTag([]);
    }
    if (state.tags.indexOf(tag) !== -1) {
      swal("이미 존재하는 태그 입니다.", "", "error");
      setTag("");
      setSelectedTag([]);
    }
    if (state.tags.length > 7) {
      swal("태그는 8 개 이상 만들 수 없습니다", "", "error");
      setTag("");
      setSelectedTag([]);
    }
  };

  const bgPatternHandler = function (e: any) {
    dispatch(changeBackColor(e.target.id));
    const plannerView = document.querySelector("#planner-view") as HTMLElement;
    plannerView.style.transition = "all 1s";
    if (e.target.id === "pattern01") {
      plannerView.style.backgroundImage = `url(${pattern01})`;
    }
    if (e.target.id === "pattern02") {
      plannerView.style.backgroundImage = `url(${pattern02})`;
    }
    if (e.target.id === "pattern03") {
      plannerView.style.backgroundImage = `url(${pattern03})`;
    }
    if (e.target.id === "pattern04") {
      plannerView.style.backgroundImage = `url(${pattern04})`;
    }
    if (e.target.id === "pattern05") {
      plannerView.style.backgroundImage = `url(${pattern05})`;
    }
    if (e.target.id === "pattern06") {
      plannerView.style.backgroundImage = `url(${pattern06})`;
    }
    if (e.target.id === "pattern07") {
      plannerView.style.backgroundImage = `url(${pattern07})`;
    }
    if (e.target.id === "pattern08") {
      plannerView.style.backgroundImage = `url(${pattern08})`;
    }
  };

  const addToSelected = function (e: any) {
    // selected 배열에 추가. (선택 된 해쉬태그)
    const ele = document.getElementById(e.target.id);
    if (
      !ele?.classList.contains("selected-tag") &&
      selectedTag.indexOf(e.target.id) === -1
    ) {
      if (selectedTag.length < 3) {
        ele?.classList.add("selected-tag");
        setSelectedTag([...selectedTag, e.target.id]);
        dispatch(addSelectedTags([...selectedTag, e.target.id]));
      } else {
        ele?.classList.remove("selected-tag");
        swal("태그는 3개까지 선택할 수 있습니다.", "", "error");
      }
    } else {
      ele?.classList.remove("selected-tag");
      selectedTag.splice(selectedTag.indexOf(e.target.id), 1);
      dispatch(addSelectedTags(selectedTag));
    }
  };

  const deleteTag = function (e: any) {
    // 태그 목록에서 삭제 될 때, 선택된 태그 목록에서도 지워준다.
    if (state.plannerDatas.selected_tags.indexOf(e.target.id)) {
      const deleteTag = state.plannerDatas.selected_tags.filter(
        (el: string) => el !== e.target.id
    );
      dispatch(addSelectedTags([...deleteTag]));
      dispatch(deleteAtag(e.target.id));
    }
    dispatch(deleteAtag(e.target.id));
  };

  const uploadHandler = function (e: any) {
    axios
      .post(
        `${process.env.REACT_APP_URI}/posts/posting`,
        {
          postdatas: {
            todos: data.todos,
            tags: data.selected_tags,
            back_color: data.back_color,
            sticker: data.sticker,
            comment: data.comment,
            memo: data.memo,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(resetAfterUpload());
        swal("게시물 등록완료", "", "success");
        history.push("/myfeed");
      })
      .catch((err) => {
        console.log(err);
        swal("게시물 등록실패", "", "error");
      });
  };

  const [back_color, setBackColor] = useState("#fff");

  const handleChange = (color: string) => {
    setBackColor(color);
    dispatch(changeBackColor(color));
    const plannerview = document.getElementById("planner-view") as HTMLElement;
    const thumbnail = document.getElementById("color-thumbnail") as HTMLElement;
    plannerview.style.background = color;
    thumbnail.style.background = color;
  };

  const [colorClick, setColorClick] = useState(false);

  const colorPickHandler = function () {
    if (colorClick) {
      setColorClick(false);
    } else {
      setColorClick(true);
    }
  };

  const content = (
    <HexColorPicker
      color={back_color}
      onChange={(color: string) => handleChange(color)}
    />
  );
  const isLoginHandler = () => {
    const nav = document.getElementById("nav-container") as HTMLElement;
    if (isLogin) {
      nav.style.visibility = "visible";
    } else {
      nav.style.visibility = "hidden";
    }
  };
  useEffect(() => {
    isLoginHandler();
  }, []);

  return (
    <CustomContainer id="custom-bar">
      <div className="custom-title-container">
        <i className="fas fa-magic"></i>
        <h2 className="custom-planner-title">Custom Planner</h2>
      </div>
      <div className="back-color-picker">
        <h4>Background</h4>
        <div className="back-color-selection">
          <Popover content={content} title="BackgroundColor" trigger="click">
          <div id="color-thumbnail" onClick={() => colorPickHandler()}></div>
          </Popover>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern01"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern01}
            />
          </span>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern02"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern02}
            />
          </span>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern04"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern04}
            />
          </span>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern05"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern05}
            />
          </span>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern06"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern06}
            />
          </span>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern07"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern07}
            />
          </span>
          <span onClick={(e: any) => bgPatternHandler(e)}>
            <img
              id="pattern08"
              style={{ borderRadius: "10%" }}
              alt="pattern"
              width="50px"
              src={pattern08}
            />
          </span>
        </div>
      </div>
      <div id="upload-comment-container">
        <h3 className="write-a-comment">Write a comment</h3>
        <TextField
          id="outlined-multiline-static"
          className="writing-comment"
          onChange={(e: any) => {
            setComment(e.target.value);
            dispatch(addCommentData(e.target.value));
          }}
          multiline
          rows={6}
          value={comment}
          variant="outlined"
        />
      </div>
      <div className="tag-container">
        <div>
          <h3>Add the hasgtags</h3>
          <div className="add-tag-container">
            <TextField
              id="outlined-helperText"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              variant="outlined"
            />
            <button onClick={addToTagList}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="select-tag-container">
          {state.tags &&
            state.tags.map((tag: string) => (
              <div
                onClick={(e: any) => addToSelected(e)}
                key={tag}
                id={tag.toString()}
                className="hashtags-group"
              >
                #{tag}
                {}
                <DeleteBtn
                  key={tag}
                  onClick={(e: any) => deleteTag(e)}
                  id={tag}
                >
                  x
                </DeleteBtn>
              </div>
            ))}
        </div>
      </div>
      {isLogin ? (
        <UploadButton id="upload-btn" onClick={(e: any) => uploadHandler(e)}>
          Upload
        </UploadButton>
      ) : (
        <UploadButton
          id="upload-btn"
          onClick={(e: any) => {
            swal({
              title: "체험하기를 종료하시겠습니까?",
              icon: "warning",
              dangerMode: true,
              closeOnClickOutside: false,
              buttons: ["No", true],
            }).then((willLogout) => {
              if (willLogout) {
                dispatch(resetAfterUpload());
                const nav = document.getElementById(
                  "nav-container"
                ) as HTMLElement;
                nav.style.visibility = "visible";
                history.push("/");
              } else {
                console.log("체험하기 종료 취소");
              }
            });
          }}
        >
          EXIT
        </UploadButton>
      )}
      {/* <UploadButton id="upload-btn" onClick={(e: any) => uploadHandler(e)}>
        Upload
      </UploadButton> */}
    </CustomContainer>
  );
}

export default CustomBar;
