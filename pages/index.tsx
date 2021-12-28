//Basic
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Head from 'next/head';
//Component
import BigImageGalleryList from "../components/BigImageGalleryList";
import { PageMaxNoCSSLayout, PageMainContentMargin } from "../styles/design-system";
import SegmentedControl from "../components/SegmentedControl";
import { ProjectSimpleDTO } from "../interfaces/project.dto";
import { ProjectCatagoryDTO } from "../interfaces/project-catagory.dto";
import styled from "styled-components";


interface Props {
  projectThumnailList: ProjectSimpleDTO[];
  CatagoryList: ProjectCatagoryDTO[];
}

const IndexPage: NextPage<Props> = ({ projectThumnailList, CatagoryList }) => {
  const [currentCatagoryId, setUserCatagoryId] = useState<string>("all");

  return (
    <>
    <Head>
      <title>Studio Zinzin</title>
    </Head>
    <MainPageMaxNoCSSLayout>
      <Compontent1Wrap>
        <SegmentedControl
          options={CatagoryList}
          setValue={(newValue) => setUserCatagoryId(newValue)}
        />
      </Compontent1Wrap>
      <ImageGalleryWrap>
        <BigImageGalleryList
          selectedCatagoryId={currentCatagoryId}
        />
        </ImageGalleryWrap>
    </MainPageMaxNoCSSLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resprojectThumnailList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project/thumnail");
  const projectThumnailList: ProjectSimpleDTO[] = await resprojectThumnailList.json();

  const resCatagoryList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/catagory");
  const CatagoryList: ProjectCatagoryDTO[] = await resCatagoryList.json();

  if (!projectThumnailList && !CatagoryList) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectThumnailList,
      CatagoryList
    },
  };
};

const Compontent1Wrap = styled.div`
  @media only screen and (max-width: 479px) {
    margin-bottom: 8px;
  }
  @media only screen and (min-width: 480px) {
    margin-bottom: 13px;
  }
  @media only screen and (min-width: 768px) {
    margin-bottom: 18px;
  }
  @media only screen and (min-width: 992px) {
    margin-bottom: 23px;
  }
  @media only screen and (min-width: 1200px) {
    margin-bottom: 25px;
  }
`
const ImageGalleryWrap = styled.div`
  @media only screen and (max-width: 600px) {
  }
  @media only screen and (min-width: 600px) {
  }
  @media only screen and (min-width: 768px) {
    overflow-y: scroll;
    max-height: 130vh;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
const MainPageMaxNoCSSLayout = styled(PageMaxNoCSSLayout)`
  @media only screen and (max-width: 600px) {
    margin-top: 30px;
  }
  @media only screen and (min-width: 600px) {
    margin-top: 45px;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 60px;
  }
  @media only screen and (min-width: 992px) {
    margin-top: 75px;
  }
  @media only screen and (min-width: 1200px) {
    margin-top: 90px;
  }
`
export default IndexPage;
