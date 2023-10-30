import React from "react";
import styled from "styled-components";

const ImageLinkList = ({ data, onClick }) => {
  return (
    <LinkListBox>
      {data.map((url, index) => (
        <div key={index} onClick={() => onClick(url, index + 1)}>
          {index + 1 + " index ⇒ " + url}
        </div>
      ))}
    </LinkListBox>
  );
};

export default ImageLinkList;

const LinkListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
