import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ImageLinkList from "../components/ImageLinkList";
import styled from "styled-components";
import Swal from "sweetalert2";

const ImageCapturePage = () => {
  const [data, setData] = useState([]);
  const [url, setURL] = useState();
  const [index, setIndex] = useState();
  const [token, setToken] = useState(null);

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

    if (token == null) {
      Swal.fire({
        text: "Please enter the token issued by SmartThings Developer to load the image!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      sessionStorage.setItem("token", token);

      fetch(imageURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PATToken}`,
        },
      })
        .then((response) => {
          console.log(response);
          return response.blob(); // Converting image data to Blob
        })
        .then((imageBlob) => {
          console.log(imageBlob);
          const objectURL = URL.createObjectURL(imageBlob);
          console.log(objectURL);
          document.querySelector(".result").src = objectURL;
          document.querySelector(".download").href = objectURL;
        });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const getDataFromURL = () => {
    axios
      .get("http://localhost:3005/api/image")
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        alert("Error importing data!.. : ", error);
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
          Get Token (SmartThings Developer)
        </a>
      </Button>
      <Button onClick={getDataFromURL}>Load capture results URL from server</Button>
      <Button onClick={getImageFromURL}>Load selected images</Button>
      <Button>
        <a className="download" download="img.jpg" href="#" style={{ textDecoration: "none", color: "#000" }}>
          Image Download
        </a>
      </Button>
      <SectionDiv>
        <div>Please get a token from Samsung SmartThings and enter it to import the image!</div>
        <div>
          <span>Token Value : </span>
          <input onChange={handleTokenInput} placeholder="Please enter the token here." type="password" />
        </div>
        <div>Which image of the URL below should I call?</div>
        <div>Selected URL number : You have selected URL number {index}! </div>
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
