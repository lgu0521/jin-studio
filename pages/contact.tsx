//Basic
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Head from 'next/head';
//Component
import {
  PageMaxNoCSSLayout, PageMainContentMargin} from "../styles/design-system";
import Custom404 from "../components/404";
interface Props { }

const ContactPage: NextPage<Props> = ({ }) => {
  const [currentCatagoryId, setUserCatagoryId] = useState<string>("0");

  return (
    <>
      <Head>
        <title>contant - Studio Zinzin</title>
      </Head>
      <PageMaxNoCSSLayout>
        <PageMainContentMargin>
          <Custom404 />
        </PageMainContentMargin>
      </PageMaxNoCSSLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  //await fetch('/api/project') 예정
  return {
    props: {},
  };
};

export default ContactPage;
