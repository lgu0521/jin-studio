//Basic
import { GetStaticProps, NextPage } from "next";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
//Component
import { PageMaxNoCSSLayout, PageMainContentMargin, Title5 } from "../styles/design-system";
import styled from "styled-components";
import gitImage from '../public/image/Loading.gif';
import BigImageGalleryList from "../components/BigImageGalleryList";

const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>contant - Studio Zinzin</title>
      </Head>
      <PageMaxNoCSSLayout>
        <CustomPageMainContentMargin>
          <ImageWrap>
            <Image src={gitImage} height={200} width={200} layout='responsive' />
          </ImageWrap>
          <ContactList>
            <Contact>
              <a href="mailto:heyjin429@gmail.com" target="_blank" rel="noreferrer">
                <MediaImageWrap>
                  <Image src="/svg/gmail.svg" width={75} height={75} objectFit='contain' layout='responsive' />
                </MediaImageWrap>
                <Typography>heyjin429@gmail.com</Typography>
              </a>
            </Contact>
            <Contact>
              <a href="https://www.youtube.com/channel/UCOzsnzYzy2zsL5sofpFL35A" target="_blank" rel="noreferrer">
                <MediaImageWrap>
                  <Image src="/svg/youtube.svg" width={75} height={75} objectFit='contain' layout='responsive' />
                </MediaImageWrap>
                <Typography>studiozinzin</Typography>
              </a>
            </Contact>
            <Contact>
              <a href="https://www.instagram.com/forest_goodluck" target="_blank" rel="noreferrer">
                <MediaImageWrap>
                  <Image src="/svg/instagram.svg" width={75} height={75} objectFit='contain' layout='responsive' />
                </MediaImageWrap>
                <Typography>@forest_goodluck</Typography>
              </a>
            </Contact>
            <Contact>
              <a href="https://www.instagram.com/studiozinzin" target="_blank" rel="noreferrer">
                <MediaImageWrap>
                  <Image src="/svg/instagram.svg" width={75} height={75} objectFit='contain' layout='responsive' />
                </MediaImageWrap>
                <Typography>@studiozinzin</Typography>
              </a>
            </Contact>
          </ContactList>
        </CustomPageMainContentMargin>
      </PageMaxNoCSSLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  //await fetch('/api/project') 예정
  return {
    props: {},
  };
};

export default ContactPage;

const MediaImageWrap = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    width: 26px;
  }
  @media only screen and (min-width: 600px) {
    width: 34px;
  }
  @media only screen and (min-width: 768px) {
    width: 34px;
  }
  @media only screen and (min-width: 992px) {
    width: 34px;
  }
  @media only screen and (min-width: 1200px) {
    width: 34px;
  }
`
const CustomPageMainContentMargin = styled(PageMainContentMargin)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-top: 0px;
  height: 70vh;
  @media only screen and (max-width: 767px) {
    gap: 0px;
    flex-direction: column-reverse;
    align-content: center;
    height: 80vh;
  }
  @media only screen and (min-width: 768px) {
    gap: 0px;
  }
  @media only screen and (min-width: 992px) {
    gap: 100px;
  }
`
const ContactList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows:min-content;
  align-self: center;
`
const Typography = styled(Title5)`
  font-weight: 700;
  color: #C5C4C4;
`

const Contact = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #E5E5E5;
  cursor: pointer;
  :hover{
    background-color: #E5E5E5;
    border: 1px solid #C5C4C4;
    ${Typography}{
        color: #898A8D;
    }
  }
  @media only screen and (max-width: 600px) {
    width: 130px;
    height: 95px;
    margin: 3px;
  }
  @media only screen and (min-width: 600px) and (max-width: 767px) {
    width: 175px;
    height: 125px;
    margin: 7px;
  }
  @media only screen and (min-width: 768px) {
    width: 175px;
    height: 125px;
    margin: 7px;
  }
  @media only screen and (min-width: 992px) {
    width: 185px;
    height: 135px;
    margin: 7px;
  }
`

const ImageWrap = styled.div`
  align-self: flex-end;
  @media only screen and (max-width: 600px) {
    width: 180px;
    align-self: flex-start;
  }
  @media only screen and (min-width: 600px) and (max-width: 767px) {
    width: 250px;
    align-self: flex-start;
  }
  @media only screen and (min-width: 768px) {
    width: 300px;
  }
  @media only screen and (min-width: 992px) {
    width: 330px;
  }
  @media only screen and (min-width: 1200px) {
    width: 350px;
  }
`
