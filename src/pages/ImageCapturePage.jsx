import { useState } from "react";
import axios from "axios";
import ImageLinkList from "../components/ImageLinkList";
import styled from "styled-components";

const ImageCapturePage = () => {
  const [data, setData] = useState([]);
  const [url, setURL] = useState();
  const [index, setIndex] = useState();
  const [token, setToken] = useState();

  // token = process.env.REACT_APP_PAT_TOKEN
  // 토큰을 일일이 입력하지 않고, 환경 변수 파일에서 "REACT_APP_PAT_TOKEN = 토큰 정보" 등록 하고 기능 사용하는 방식도 가능

  const handleClick = (targetURL, targetIndex) => {
    setURL(targetURL);
    setIndex(targetIndex);
  };

  const handleTokenInput = (tokenInput) => {
    setToken(tokenInput.target.value);
  };

  const getImageFromURL = () => {
    const imageURL = url;
    const PATToken = token;

    fetch(imageURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PATToken}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.blob(); // 이미지 데이터를 Blob으로 변환
      })
      .then((imageBlob) => {
        console.log(imageBlob);
        const objectURL = URL.createObjectURL(imageBlob);
        console.log(objectURL);
        document.querySelector(".result").src = objectURL;
        document.querySelector("a").href = objectURL;
      });
  };

  const getDataFromURL = () => {
    axios
      .get("http://localhost:3005/api/image")
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        alert("데이터를 가져오는 중 에러가 발생했습니다!.. : ", error);
      });
  };

  return (
    <div>
      <Button>
        <a
          href="https://account.smartthings.com/tokens"
          target="_blank"
          style={{ textDecoration: "none", color: "#000" }}
        >
          토큰 발급 받기
        </a>
      </Button>
      <Button onClick={getDataFromURL}>서버에서 캡쳐 결과 URL 불러오기</Button>
      <Button onClick={getImageFromURL}>선택한 이미지 불러오기</Button>
      <Button>
        <a className="download" download="img.jpg" href="#" style={{ textDecoration: "none", color: "#000" }}>
          이미지 다운로드
        </a>
      </Button>
      <SectionDiv>
        <div>이미지를 불러오기 위해서 Samsung SmartThings에서 토큰을 발급받아 입력해주세요!</div>
        <div>
          <span>토큰 번호 : </span>
          <input onChange={handleTokenInput} placeholder="토큰을 입력해주세요." />
        </div>
        <div>아래 URL중 어떤 이미지를 불러올까요?</div>
        <div>선택한 URL 번호 : {index}번 URL을 선택하셨습니다! </div>
      </SectionDiv>
      <hr></hr>
      <ImageLinkList data={data} onClick={handleClick} />
      <hr></hr>
      <ImageDiv>
        <img className="result" src="" alt="" />
      </ImageDiv>
    </div>
  );
};

export default ImageCapturePage;

const Button = styled.button`
  width: 250px;
  height: 50px;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(206, 206, 206);
  }
`;

const SectionDiv = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  & > div {
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  & > div > input {
    margin-left: 10px;
    width: 600px;
    height: 20px;
    border-radius: 5px;
  }
`;

const ImageDiv = styled.div`
  margin-left: 20px;
  & > img {
    width: 1000px;
  }
`;
