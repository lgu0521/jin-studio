//Basic
import { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import { AboutDTO } from '../interfaces/about.dto';
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
interface Props {
  About: AboutDTO;
}

const AboutPage: NextPage<Props> = ({ About }) => {

  const TuiNoSSRWrapper = dynamic<ViewerProps>(
    () => import("../modules/ViewEditor"),
    {
      ssr: false,
      loading: () => <p>Loading . . .</p>,
    }
  );
  const TuiWrapper = React.forwardRef((props: ViewerProps, ref) => (
    <TuiNoSSRWrapper {...props} />
  ));
  TuiWrapper.displayName = "Editor";
  return (
    <>
      <PageMaxNoCSSLayout>
        <PageMainContentMargin>
          <ContentSection className="rkdms">
            {About
              ? About.content.map((item: any, i: number) =>
                <div key={i}>
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
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="contain"
                      />
                    </ImageWrap>
                  ) : null}
                </div>
              )
              : null}
          </ContentSection>
        </PageMainContentMargin>
      </PageMaxNoCSSLayout>
    </>
  )
};

export const getStaticProps: GetStaticProps = async () => {
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


const ContentSection = styled.div`
  padding: 0px 200px;
  margin-bottom: 140px;
  text-align: center;
`;

const ImageWrap = styled.div`
width: 100%;
height: auto;
`;

const GalleryWrap = styled.div`
  display: inline-block;
  width: 100%;
  object-fit: contain;
`;

export default AboutPage;
