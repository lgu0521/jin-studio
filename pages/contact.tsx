//Basic
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
//Component
import {
  PageMaxNoCSSLayout,
  PageMainContentMargin,
} from "../styles/design-system";

interface Props {}

const ContactPage: NextPage<Props> = ({}) => {
  const [currentCatagoryId, setUserCatagoryId] = useState<string>("0");

  return (
    <PageMaxNoCSSLayout>
      <PageMainContentMargin>
        <p>Contact 페이지 입니다</p>
      </PageMainContentMargin>
    </PageMaxNoCSSLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  //await fetch('/api/project') 예정
  return {
    props: {},
  };
};

export default ContactPage;
