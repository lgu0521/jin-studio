//Basic
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
//Component
import {
  PageMaxNoCSSLayout,
  PageMainContentMargin,
  Title1,
} from "../styles/design-system";
import Custom404 from "../components/404";
interface Props {}

const ContactPage: NextPage<Props> = ({}) => {
  const [currentCatagoryId, setUserCatagoryId] = useState<string>("0");

  return (
    <PageMaxNoCSSLayout>
      <PageMainContentMargin>
        <Custom404/>
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
