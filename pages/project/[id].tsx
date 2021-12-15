import { GetServerSideProps, NextPage } from "next";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Params } from "next/dist/server/router";
import styled from "styled-components";
import $ from "jquery";
import {
  PageFullWidthLayout,
  PageMainContentMargin,
  PageMaxNoCSSLayout,
} from "../../styles/design-system";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BigImageGalleryList from "../../components/BigImageGalleryList";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ViewerProps } from "@toast-ui/react-editor";
import React from "react";
import { ProjectDTO, ProjectSimpleDTO } from "../../interfaces/project.dto";

interface Props {
  projectThumnailList: ProjectSimpleDTO[],
  projectContet: ProjectDTO
}

const ProjectContent: NextPage<Props> = ({ projectThumnailList, projectContet }) => {

  const TuiNoSSRWrapper = dynamic<ViewerProps>(
    () => import("../../modules/ViewEditor"),
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
      <BackgroundColorWithPageFullWidthLayout>
        <PageMaxNoCSSLayout>
          <PageMainContentMargin>
            <ContentSection>
              {projectContet
                ? projectContet.content.map((item: any, i: number) =>
                  <ContentDetail key={i}>
                    {item.type == "write" ? (
                      <TuiWrapper initialValue={item.item.markDownContent} />
                    ) : item.type == "gallery" ? (
                      <GalleryWrap>
                        <Carousel
                          showThumbs={true}
                          showStatus={false}
                          infiniteLoop
                          showIndicators={false}
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
      </BackgroundColorWithPageFullWidthLayout>
      <PageMaxNoCSSLayout>
        <ImageGalleryWrap>
        <BigImageGalleryList
          projectList={projectThumnailList}
          selectedCatagoryId="all"
        />
        </ImageGalleryWrap>
      </PageMaxNoCSSLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }: Params) => {
  const { id } = params;
  const resprojectThumnailList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project/thumnail");
  const projectThumnailList: ProjectSimpleDTO[] = await resprojectThumnailList.json();
  const resprojectContet = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/project/${id}`);
  const projectContet: ProjectDTO = await resprojectContet.json();

  if (!projectThumnailList && projectContet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectThumnailList,
      projectContet
    },
  };
};

const ImageGalleryWrap = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (max-width: 600px) {
    max-height: 30vh;
  }
  @media only screen and (min-width: 600px) {
    max-height: 60vh;
  }
  @media only screen and (min-width: 768px) {
    max-height: 90vh;
  }
  @media only screen and (min-width: 992px) {
    max-height: 110vh;
  }
  @media only screen and (min-width: 1200px) {
    max-height: 130vh;
  }
`;

const ContentDetail = styled.div`
    margin-bottom: 15px;
`;

const ContentSection = styled.div`
  text-align: center;
  @media only screen and (max-width: 600px) {
    padding: 30px 0px 15px;
    margin-bottom: 30px;
  }
  @media only screen and (min-width: 600px) {
    margin-bottom: 60px 0px 45px;
    padding: 60px 0px;
  }
  @media only screen and (min-width: 768px) {
    margin-bottom: 80px 0px 65px;
    padding: 80px 0px;
  }
  @media only screen and (min-width: 992px) {
    margin-bottom: 100px 0px 85px;
    padding: 100px 100px;
  }
  @media only screen and (min-width: 1200px) {
    margin-bottom: 120px 0px 105px;
    padding: 120px 200px;
  }
`;
const BackgroundColorWithPageFullWidthLayout = styled(PageFullWidthLayout)`
  background-color: ${(props) => props.theme.colors.bg_content};
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
export default ProjectContent;
