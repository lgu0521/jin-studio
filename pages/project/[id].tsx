import { GetServerSideProps, NextPage } from "next";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Params } from "next/dist/server/router";
import styled from "styled-components";
import S from '../../styles/AdminPage.style';
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
import { useRouter } from "next/router";
import { useAuth } from "../../modules/AuthProvider";
import ErrorPage from "../../components/404Page";

interface Props {
  projectThumnailList: ProjectSimpleDTO[],
  projectContet: ProjectDTO,
  id: string
}

const ProjectContent: NextPage<Props> = ({ projectThumnailList, projectContet, id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const TuiNoSSRWrapper = dynamic<ViewerProps>(
    () => import("../../modules/ViewEditor"),
    {
      ssr: false,
      loading: () => <ErrorPage/>,
    }
  );
  const TuiWrapper = React.forwardRef((props: ViewerProps, ref) => (
    <TuiNoSSRWrapper {...props} />
  ));
  TuiWrapper.displayName = "Editor";
  return (
    <>
      {
        user ? <S.Button onClick={() => router.push('/admin/modify/' + id)}>수정하기</S.Button> : null
      }
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
                          showStatus={true}
                          infiniteLoop
                          showIndicators={false}
                          dynamicHeight={true}
                          showArrows={false}
                          useKeyboardArrows
                          transitionTime={600}
                          thumbWidth={110}
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
      projectContet,
      id
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
    max-height: 40vh;
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
  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
  @media only screen and (min-width: 600px) {
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 769px) {
    margin-bottom: 10px;
  }
  @media only screen and (min-width: 780px) {
    margin-bottom: 15px;
  }
`;

const ContentSection = styled.div`
  text-align: center;
  @media only screen and (max-width: 600px) {
    padding: 30px 0px 15px;
    margin-bottom: 30px;
  }
  @media only screen and (min-width: 600px) {
    margin: 60px 0px 45px;
    padding: 60px 0px;
  }
  @media only screen and (min-width: 768px) {
    margin: 80px 0px 65px;
    padding: 80px 0px;
  }
  @media only screen and (min-width: 992px) {
    margin: 100px 0px 85px;
    padding: 100px 100px;
  }
  @media only screen and (min-width: 1200px) {
    margin: 120px 0px 105px;
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
