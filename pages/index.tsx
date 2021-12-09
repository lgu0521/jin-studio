//Basic
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
//Component
import BigImageGalleryList from "../components/BigImageGalleryList";
import {
  PageMaxNoCSSLayout,
  PageMainContentMargin,
} from "../styles/design-system";
import SegmentedControl from "../components/SegmentedControl";
import { ProjectSimpleDTO } from "../interfaces/project.dto";
import { ProjectCatagoryDTO } from "../interfaces/project-catagory.dto";

interface Props {
  projectThumnailList: ProjectSimpleDTO[];
  CatagoryList: ProjectCatagoryDTO[];
}

const IndexPage: NextPage<Props> = ({ projectThumnailList, CatagoryList }) => {
  const [currentCatagoryId, setUserCatagoryId] = useState<string>("0");

  return (
    <PageMaxNoCSSLayout>
      <PageMainContentMargin style={{ position: "relative" }}>
        <SegmentedControl
          options={CatagoryList}
          setValue={(newValue) => setUserCatagoryId(newValue)}
        />
        <div style={{ clear: "both" }}>
          <BigImageGalleryList
            projectList={projectThumnailList}
            selectedCatagoryId={currentCatagoryId}
          />
        </div>
      </PageMainContentMargin>
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

export default IndexPage;
