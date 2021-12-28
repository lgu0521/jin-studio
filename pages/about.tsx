//Basic
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import { AboutDTO } from '../interfaces/about.dto';
import Head from 'next/head';
//Component
import {
  PageMaxNoCSSLayout,
  PageMainContentMargin,
} from "../styles/design-system";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ViewerProps } from "@toast-ui/react-editor";
import React from "react";
import Boomerang from "../components/Boomerang";
interface Props {
  About: AboutDTO;
}

const AboutPage: NextPage<Props> = ({ About }) => {

  const TuiNoSSRWrapper = dynamic<ViewerProps>(
    () => import("../modules/ViewEditor"),
    {
      ssr: false,
      loading: () => <Boomerang />,
    }
  );
  const TuiWrapper = React.forwardRef((props: ViewerProps, ref) => (
    <TuiNoSSRWrapper {...props} />
  ));
  TuiWrapper.displayName = "Editor";
  return (
    <>
      <Head>
        <title>about - Studio Zinzin</title>
      </Head>
      <PageMaxNoCSSLayout>
        <PageMainContentMargin>
          <ContentSection className="rkdms">
            {About
              ? About.content.map((item: any, i: number) =>
                <ContentDetail key={i}>
                  {item.type == "write" ? (
                    <TuiWrapper initialValue={item.item.markDownContent} />
                  ) : item.type == "gallery" ? (
                    <GalleryWrap>
                      <Carousel
                        showThumbs={true}
                        showStatus={false}
                        infiniteLoop
                        // emulateTouch
                        // autoPlay
                        showArrows={false}
                        useKeyboardArrows
                        transitionTime={600}
                      // axis="vertical"
                      // selectedItem={1}
                      >
                        {item.item.map((image: any, i: number) => (
                          <div key={i}>
                            <img src={image.downloadUrl} alt="" />
                          </div>
                        ))}
                      </Carousel>
                    </GalleryWrap>
                  ) : item.type == "image" ? (
                    <ImageWrap>
                      <Image
                        src={item.item.downloadUrl}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL="/image/blur.png"
                        className="unset-image"
                      />
                    </ImageWrap>
                  ) : null}
                </ContentDetail>
              )
              : null}
          </ContentSection>
        </PageMainContentMargin>
      </PageMaxNoCSSLayout>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async () => {
  const resAbout = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/about/o6Vq7IMXHY46anrHrbDm");
  const About: AboutDTO = await resAbout.json();

  if (!About) {
    return {
      notFound: true,
    }
  }
  return {
    props: { About },
  };
};

const ContentDetail = styled.div`
    margin-bottom: 15px;
`;

const ContentSection = styled.div`
  text-align: center;
  @media only screen and (max-width: 600px) {
    padding: 0px 0px;
    margin-bottom: 30px;
  }
  @media only screen and (min-width: 600px) {
    margin-bottom: 60px;
    padding: 0px 0px;
  }
  @media only screen and (min-width: 768px) {
    margin-bottom: 80px;
    padding: 00px 0px;
  }
  @media only screen and (min-width: 992px) {
    margin-bottom: 100px;
    padding: 0px 100px;
  }
  @media only screen and (min-width: 1200px) {
    margin-bottom: 120px;
    padding: 0px 200px;
  }
`;

const ImageWrap = styled.div`
  width: 100%;
  span {
    position: relative !important;
    height: unset !important;
  }
`;

const GalleryWrap = styled.div`
  display: inline-block;
  width: 100%;
  object-fit: contain;
`;

export default AboutPage;
