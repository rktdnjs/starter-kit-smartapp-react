import { useState } from "react"
import axios from "axios"
import ImageLinkList from "../components/ImageLinkList";

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
    }

    const handleTokenInput = (tokenInput) => {
        setToken(tokenInput.target.value);
    }

    const getImageFromURL = () => {
      const imageURL = url;
      const PATToken = token;

      fetch(imageURL, {
        method: 'GET',
        headers: {
          "Authorization" : `Bearer ${PATToken}`
        },
      })
      .then((response) => {
        console.log(response)
        return response.blob(); // 이미지 데이터를 Blob으로 변환
      })
      .then((imageBlob) => {
            
        console.log(imageBlob);
        const objectURL = URL.createObjectURL(imageBlob);
        console.log(objectURL);
        document.querySelector('img').src = objectURL;
        document.querySelector('a').href = objectURL;
      })
    }
  
    const getDataFromURL = () => {
      axios.get('http://localhost:3005/api/image')
        .then(response => {
          setData(response.data);
          console.log(data);
        })
        .catch(error => {
          console.log("데이터를 가져오는 중 에러가 발생했습니다!.. : ", error);
        })
    }

    return (
        <div>
            <h3>SmartThings ImageCapture Result</h3>
            <button onClick={getDataFromURL}>서버에서 캡쳐 결과 URL 불러오기</button>
            <button onClick={getImageFromURL}>선택한 이미지 불러오기</button>
            <div>이미지를 불러오기 위해서 Samsung SmartThings에서 토큰을 발급받아 입력해주세요!</div>
            <div>
                <span>토큰 번호 : </span>
                <input onChange={handleTokenInput} placeholder="토큰 입력"/>
            </div>
            <div>아래 URL중 어떤 이미지를 불러올까요?</div>
            <div>선택한 URL 번호 : {index}번 URL을 선택하셨습니다! </div>
            <ImageLinkList data={data} onClick={handleClick} />
            <a className="download" download="img.jpg" href="#">이미지 다운로드</a>
            <hr></hr>
            <img src="" alt="" />
        </div>
    );
};

export default ImageCapturePage;
