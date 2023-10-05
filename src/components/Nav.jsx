import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavBox>
      <LogoImage src={logo} />
      <h3>
        SmartThings <br />
        ImageCapture Result
      </h3>
    </NavBox>
  );
};

export default Nav;

const NavBox = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  padding: 0 20px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 50px;
  margin-right: 20px;
`;
