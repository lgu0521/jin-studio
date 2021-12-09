import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { PageMaxNoCSSLayout, Title1, Title2 } from "../styles/design-system";
import Logo from '../public/svg/logo.svg';

type Props = {
  children?: ReactNode;
  title?: string;
  logo: string;
};

const Layout = ({
  logo,
  children,
  title = "This is the default title",
}: Props) => {
  console.log(logo);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <PageMaxNoCSSLayout>
          <Nav>
            <Link href="/">
              <a>
                <Logo />
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
        </PageMaxNoCSSLayout>
      </header>
      {children}
      <footer>
        <FooterLayout>
          <Title2>All content copy right ZinZinstudio 2012-2021 ©</Title2>
        </FooterLayout>
      </footer>
    </div>
  );
};
const ImagrWrap = styled.div`
width: 200px;
height: 100%;
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
`;

export default Layout;
