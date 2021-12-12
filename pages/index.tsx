//Basic
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
//Component
import BigImageGalleryList from "../components/BigImageGalleryList";
import { PageMaxNoCSSLayout, PageMainContentMargin } from "../styles/design-system";
import SegmentedControl from "../components/SegmentedControl";
import MoblieSegmentedControl from "../components/MoblieSegmentedControl";
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
    <PageMaxNoCSSLayout>
      <Compontent1Wrap>
        <MoblieSegmentedControl
          options={CatagoryList}
          setValue={(newValue) => setUserCatagoryId(newValue)}
        />
      </Compontent1Wrap>
      <Compontent2Wrap>
        <BigImageGalleryList
          projectList={projectThumnailList}
          selectedCatagoryId={currentCatagoryId}
        />
      </Compontent2Wrap>
    </PageMaxNoCSSLayout>
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
  margin: 120px 0px 24px 0px;
`

const Compontent2Wrap = styled.div`
  clear: both;
`
export default IndexPage;
