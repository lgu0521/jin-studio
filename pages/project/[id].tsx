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
            <ContentSection className="rkdms">
              {projectContet
                ? projectContet.content.map((item: any, i: number) =>
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
                          placeholder="blur"
                          blurDataURL="/image/blur.png"
                        />
                      </ImageWrap>
                    ) : null}
                  </div>
                )
                : null}
            </ContentSection>
          </PageMainContentMargin>
        </PageMaxNoCSSLayout>
      </BackgroundColorWithPageFullWidthLayout>
      <PageMaxNoCSSLayout>
        <BigImageGalleryList
          projectList={projectThumnailList}
          selectedCatagoryId="all"
        />
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

const ContentSection = styled.div`
  margin-bottom: 140px;
  text-align: center;
  // 프로젝트 옆 마진 설정
  @media only screen and (max-width: 600px) {
    padding: 100px 0px;
  }
  @media only screen and (min-width: 600px) {
    padding: 100px 0px;
  }
  @media only screen and (min-width: 768px) {
    padding: 100px 0px;
  }
  @media only screen and (min-width: 992px) {
    padding: 100px 100px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 100px 200px;
  }
`;
const BackgroundColorWithPageFullWidthLayout = styled(PageFullWidthLayout)`
  background-color: ${(props) => props.theme.colors.bg_content};
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
export default ProjectContent;
