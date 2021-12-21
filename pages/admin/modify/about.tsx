//Basic
import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
//Style
import S from "../../../styles/AdminPage.style";
import { PageMaxNoCSSLayout } from "../../../styles/design-system";
//Component
import ProjectContentCUView from "../../../components/ProjectContentCUView";
//Module
import { useAuth } from "../../../modules/AuthProvider";
import ChangeImageStorage from "../../../modules/ChangeImageStorage";
//DTO
import { ProjectDTO, ProjectTmpContentDTO } from "../../../interfaces/project.dto";
import { AboutDTO } from "../../../interfaces/about.dto";

type GetStaticProps = {
    aboutContet: AboutDTO
}

const AdminModifyAbout: NextPage<GetStaticProps> = ({ aboutContet }) => {
    const [winReady, setwinReady] = useState(false);
    useEffect(() => { setwinReady(true); }, []);

    const [formItemList, setFormItemList] = useState<ProjectTmpContentDTO[]>(aboutContet.content ? aboutContet.content : []);
    const deleteContentList:any[] = [];
    
    const router = useRouter();
    const { user } = useAuth();

    const WillDeleteFormDeleteContentArray = (content: any) => {
        deleteContentList.push(content);
    }

    const ImplementDeleteFormDeleteContentArray = async () => {
        await Promise.all(deleteContentList.map(async (content: any, i: number) => {
            if (content.downloadUrl) {
                await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/delete/image", {
                    method: "POST",
                    body: JSON.stringify(content),
                });
            }
        }));
    }

    const onSubmit = async () => {
        var newThumnail: any;
        // 삭제할 이미지 검사
        await ImplementDeleteFormDeleteContentArray();
        //content order 정렬
        await Promise.all(await formItemList.map((item, index) => item.order = index));
        // 이미지 스토리지에 저장
        const finalItemList = await ChangeImageStorage(formItemList);
        // API 전송
        const updateRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/about/update", {
            method: "POST",
            body: JSON.stringify({
                id: 'o6Vq7IMXHY46anrHrbDm',
                content: finalItemList,
            }),
        });

        if (updateRes.ok) {
            router.push("/about");
        }
    };

    return (
        user && winReady ?
            <PageMaxNoCSSLayout>
              <ProjectContentCUView projectContents={formItemList} toDeleteContent={(content) => { WillDeleteFormDeleteContentArray(content)}} onChangeProjectContents={(contents)=> setFormItemList(contents)} />
              <S.Button type="submit" onClick={onSubmit}>저장</S.Button>
          </PageMaxNoCSSLayout>: <p>404</p>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const resprojectContet = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/about/o6Vq7IMXHY46anrHrbDm');
    const aboutContet: AboutDTO = await resprojectContet.json();

    if (!aboutContet) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            aboutContet
        }
    }
}

export default AdminModifyAbout;