import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";
import { PageMaxNoCSSLayout, Title1, Title2, Title3 } from "../styles/design-system";
import Logo from '../public/svg/logo.svg';
import { useAuth } from "../modules/AuthProvider";

type Props = {
  children?: ReactNode;
  title?: string;
  logo: string;
};

const Layout = ({ logo, children, title = "This is the default title" }: Props) => {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <PcPageMaxNoCSSLayout>
          <Nav>
            <Link href="/">
              <a>
                <LogoWrap>
                  <Logo />
                </LogoWrap>
              </a>
            </Link>
            <NavUl>
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
        </PcPageMaxNoCSSLayout>
        <MobilePageMaxNoCSSLayout>
          <MobileNav>
            <Link href="/">
              <a>
                <LogoWrap>
                  <Logo />
                </LogoWrap>
              </a>
            </Link>
          </MobileNav>
          <MobileNavUl>
            <MobileNavLi>
              <Link href="/about">
                <a>
                  <Title1>about</Title1>
                </a>
              </Link>
            </MobileNavLi>
            <MobileNavLi>
              <Link href="/contact">
                <a>
                  <Title1>contact</Title1>
                </a>
              </Link>
            </MobileNavLi>
            <MobileNavLi>
              <a href="http://www.multifunction.co.kr/official.php/home/info/2427" target="_blank">
                <Title1>shop</Title1>
              </a>
            </MobileNavLi>
          </MobileNavUl>
        </MobilePageMaxNoCSSLayout>
      </header>
      {children}
      <footer>
        <FooterLayout>
          <Title3>All content copy right ZinZinstudio 2012-2021 ©</Title3>
        </FooterLayout>
      </footer>
    </div>
  );
};

const MobileNav = styled.nav`
  width: 100%;
  background-color: white;
  height: 36px;
`
const MobileNavUl = styled.ul`
  text-align: right;
`
const MobileNavLi = styled.li`
  padding: 5px;
  border-bottom: 3px solid black;
`
const Nav = styled.nav`
  display: flex;
  flex: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 180px;
`;

const NavUl = styled.ul`
  display: flex;
  flex: row;
  justify-content: flex-end;
  align-items: flex-end;
  font-weight: 700;
`;

const NavLi = styled.li`
  margin-left: 30px;
`;

const FooterLayout = styled(PageMaxNoCSSLayout)`
  margin-top: 10px;
  height: 180px;
  text-align: right;
  font-weight: 700;
`;

const LogoWrap = styled.div`
  @media only screen and (max-width: 600px) {
    width: 200px;
  }
  @media only screen and (min-width: 600px) {
    width: 200px;
  }
  @media only screen and (min-width: 768px) {
    width: 300px;
  }
  @media only screen and (min-width: 992px) {
    width: 353px;
  }
  @media only screen and (min-width: 1200px) {
    width: 373px;
  }
`

const MobilePageMaxNoCSSLayout = styled(PageMaxNoCSSLayout)`
  display: none;
  @media only screen and (max-width: 600px) {
    display: block !important;
  }
  @media only screen and (min-width: 600px)and (max-width: 767px) {
    display: block !important;
  }
`

const PcPageMaxNoCSSLayout = styled(PageMaxNoCSSLayout)`
  display: none;
  @media only screen and (min-width: 768px) {
    display: block !important;
  }
  @media only screen and (min-width: 1200px) {
    display: block !important;
  }
`
export default Layout;
