import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Tag, Input, Tooltip } from 'antd';
import swal from "sweetalert";

const CustomContainer = styled.div`
  font-family: 'KoHo', sans-serif;
  border: 1px solid black;
  border-radius: 5px;
  grid-column: 6 / 7;
  grid-row: 2 / 7;
  padding: 10px 5px;
`

const UploadButton = styled.button`
  font-family: 'KoHo', sans-serif;
  border: 1px solid black;
  background: none;
  border-radius: 5px;
  padding: 5px 5px;
  margin-right: 5px; 
  float: right;
  text-align: center;
`

function CustomBar () {
  const dispatch = useDispatch();
  const [tags, setTaglist] = useState(['취준생', '면접', '프론트엔드']);
  const [tag, setTag] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTag, setSelectedTag] = useState<string[]>([]);

  // 선택된 해쉬 태그 배열
  console.log(selectedTag);

  const addToTagList = function () {
    if(tag && tags.indexOf(tag) === -1) {
      setTaglist([...tags, tag]);
      setTag("");
    }
    if(!tag) {
      swal("태그를 입력해주세요", "" , "error");
    }
    if(tags.indexOf(tag) !== -1) {
      swal("이미 존재하는 태그 입니다.", "" , "error");
    }
    if(tags.length > 8) {
      swal("태그는 8 개 이상 만들 수 없습니다", "" , "error");
    }
  }

  const addToSelected = function (e:any) {
    // selected 배열에 추가. (선택 된 해쉬태그)
    const ele = document.getElementById(e.target.id);
    if(!ele?.classList.contains("selected-tag") && selectedTag.indexOf(e.target.id) === -1) {
      if(selectedTag.length < 3) {
        ele?.classList.add("selected-tag");
        setSelectedTag([...selectedTag, e.target.id]);
      }else {
        ele?.classList.remove("selected-tag"); 
        swal("태그는 3개까지 선택할 수 있습니다.", "" , "error");
      }
    }else {
      ele?.classList.remove("selected-tag"); 
      selectedTag.splice(selectedTag.indexOf(e.target.id), 1);
    }
  }
  return(
      <CustomContainer>
        <h2>New Post</h2>
        <h3>Write a comment</h3>
        <h4>Keep a record of today's study!</h4>
        <textarea 
        onChange={(e:any) => setComment(e.target.value)} 
        className="writing-comment" 
        placeholder="코멘트를 작성해보세요."></textarea>
        <div className="add-tag">
          <h3>Add the hasgtags</h3>
          <div className="add-tag-container">
            <input onChange={(e) => setTag(e.target.value)} value={tag}></input>
            <button onClick={addToTagList}><i className="fas fa-plus"></i></button>
          </div>
        </div>
        <div>
          { tags.map(tag => 
            <button onClick={(e:any) => addToSelected(e)} 
            key={tag} 
            id={tag}
            className="hashtags-group">#{tag}</button>
          )}
        </div>
        <UploadButton>Upload</UploadButton>
       </CustomContainer>
  )
}

export default CustomBar;
