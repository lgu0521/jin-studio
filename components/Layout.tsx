import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { PageMaxNoCSSLayout, Title1, Title3 } from "../styles/design-system";
import Logo from '../public/svg/header_logo.svg';
import Hamberger from '../public/svg/hamberger.svg';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const [clickBtn, setClickBtn] = useState(false);
  const sideClickRef = useRef<any>();
  useEffect(() =>{
    window.addEventListener('mousedown', handlerSideCilck);
    return () =>{
      window.removeEventListener('mousedown', handlerSideCilck);
    }
  }, []);

  const handlerSideCilck = (e:MouseEvent) =>{
    if(!sideClickRef.current.contains(e.target)){
      setClickBtn(false);
    }
  };

  return (
    <div>
      <Head>
        <title>studiozinzin</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Nav ref={sideClickRef}>
          <LogoDiv>
          <Link href="/">
            <a>
              <LogoWrap onClick={()=> setClickBtn(false)}>
                <Logo />
              </LogoWrap>
            </a>
          </Link>
          <Icon isClick={clickBtn}>
          <Hamberger onClick={()=> setClickBtn(!clickBtn)} />
          </Icon>
          </LogoDiv>
          <NavUl isClick={clickBtn} onClick={()=> setClickBtn(false)}>
            <NavLi>
              <Link href="/about">
                <a>
                  <Title1>about</Title1>
                </a>
              </Link>
            </NavLi>
            <NavLi>
              <Link href="/contact">
                <a>
                  <Title1>contact</Title1>
                </a>
              </Link>
            </NavLi>
            <NavLi>
              <a href="http://www.multifunction.co.kr/official.php/home/info/2427" target="_blank">
                <Title1>shop</Title1>
              </a>
            </NavLi>
          </NavUl>
        </Nav>
      </header>
      {children}
      <footer>
        <FooterLayout>
          <div style={{borderTop: "3px solid black"}}>
          <Title3>All content copyright ZinZinstudio 2012-2021 ©</Title3>
          </div>
        </FooterLayout>
      </footer>
    </div>
  );
};

const Nav = styled.nav`
  display: inline-block;
  width: 100%;
  @media only screen and (max-width: 767px) {
    position: fixed;
    top: 0px;
    background-color: white;
    z-index: 9988;
  }
  @media only screen and (min-width: 768px) {
    display: flex !important;
    flex: row;
    justify-content: space-between;
    align-items: flex-end;
    height: 180px;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0px 25px;
  }
`;
const Icon = styled.div<{isClick: boolean}>`
  @media only screen and (min-width: 767px) {
    display: none;
  }
  transition: .3s;
  transform:  ${(props)=> props.isClick? 'rotate(0.25turn)': 'rotate(0turn)'};;
`
const NavUl = styled.ul<{isClick: boolean}>`
  @media only screen and (max-width: 767px) {
    display: ${(props)=> props.isClick? 'block': 'none'};
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    flex: row;
    justify-content: flex-end;
    align-items: flex-end;
    font-weight: 700;
  }
`;

const NavLi = styled.li`
  @media only screen and (max-width: 767px) {
    :nth-child(1){
      border-top: 1px solid black;
    }
    text-align: right;
    font-weight: 700;
    padding: 14px 30px;
    border-bottom: 1px solid black;
  }
  @media only screen and (min-width: 768px) {
    margin-left: 30px;
  }
`;

const LogoDiv = styled.div`
  @media only screen and (max-width: 767px) {
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

`
const FooterLayout = styled(PageMaxNoCSSLayout)`
  width: 100%;
  background-color: white;
  text-align: right;
  font-weight: 700;
  @media only screen and (max-width: 600px) {
    height: 60px;
  }
  @media only screen and (min-width: 600px) {
    height: 90px;
  }
  @media only screen and (min-width: 768px) {
    height: 120px;
  }
  @media only screen and (min-width: 992px) {
    height: 150px;
  }
  @media only screen and (min-width: 1200px) {
    height: 180px;
  }
`;


const LogoWrap = styled.div`
  @media only screen and (max-width: 299px) {
    width: 160px;
  }
  @media only screen and (min-width: 300px) {
    width: 200px;
  }
  @media only screen and (min-width: 600px) {
    width: 300px;
  }
  @media only screen and (min-width: 768px) {
    width: 373px;
  }
  @media only screen and (min-width: 992px) {
    width: 353px;
  }
  @media only screen and (min-width: 1200px) {
    width: 373px;
  }
`

export default Layout;
