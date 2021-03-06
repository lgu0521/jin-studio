//Basic
import { useState, useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Params } from "next/dist/server/router";
import { useRouter } from "next/router";
//Style
import S from "../../../styles/AdminPage.style";
import { PageMaxNoCSSLayout } from "../../../styles/design-system";
import "react-datepicker/dist/react-datepicker.css";
//Component
import ImageUpload from "../../../components/ImageUpload";
import ProjectContentCUView from "../../../components/ProjectContentCUView";
//Module
import { useAuth } from "../../../modules/AuthProvider";
import GetImageStorage from "../../../modules/GetImageStorage";
import ChangeImageStorage from "../../../modules/ChangeImageStorage";
import DatePicker from 'react-datepicker';

//DTO
import { ProjectCatagoryDTO } from "../../../interfaces/project-catagory.dto";
import { ProjectDTO, ProjectTmpContentDTO } from "../../../interfaces/project.dto";
import DeleteFirestore from "../../../modules/DeleteFirestore";
import Custom404 from "../../../components/404";

type GetStaticProps = {
    catagoryList: ProjectCatagoryDTO[];
    projectContet: ProjectDTO
}

const AdminModifyProject: NextPage<GetStaticProps> = ({ catagoryList, projectContet }) => {
    const [winReady, setwinReady] = useState(false);
    useEffect(() => { setwinReady(true); }, []);

    const [formItemList, setFormItemList] = useState<ProjectTmpContentDTO[]>(projectContet.content ? projectContet.content : []);
    const [projectTitle, setProjectTitle] = useState<string>(projectContet.title ? projectContet.title : '');
    const [projectCatagory, setProjectCatagory] = useState<string>(projectContet.catagory ? projectContet.catagory : '');
    const [projectCreateDate, setProjectCreateDate] = useState<any>(projectContet.datetime ? new Date(projectContet.datetime) : new Date());
    const [projectThumbnailLocalUrl, setProjectThumbnailLocalUrl] = useState<any>(projectContet.thumbnail ? { ...projectContet.thumbnail } : null);
    const deleteContentList: any[] = [];
    console.log(projectContet.datetime);
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
        if (projectTitle == '') {
            alert('???????????? ????????? ??????????????????');
            return;
        }
        if (projectThumbnailLocalUrl == null) {
            alert('???????????? ????????? ???????????? ???????????????');
            return;
        }
        // ????????? ????????? ??????
        await ImplementDeleteFormDeleteContentArray();
        // ????????? ????????? ??????
        if (!projectThumbnailLocalUrl.downloadUrl) { newThumnail = await GetImageStorage(projectThumbnailLocalUrl, "thumbnail"); }
        //content order ??????
        await Promise.all(await formItemList.map((item, index) => item.order = index));
        // ????????? ??????????????? ??????
        const finalItemList = await ChangeImageStorage(formItemList);
        // API ??????
        const updateRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project/update", {
            method: "POST",
            body: JSON.stringify({
                id: projectContet.id,
                title: projectTitle,
                catagory: projectCatagory,
                thumbnail: newThumnail ? newThumnail : projectThumbnailLocalUrl,
                content: finalItemList,
                datetime: projectCreateDate
            }),
        });

        if (updateRes.ok) {
            const { docId } = await updateRes.json();
            router.push("/project/" + docId);
        }
    };

    return (
        user && winReady ?
            <PageMaxNoCSSLayout>
                <S.EssentialSection>
                    <S.InputWrap>
                        <S.Label>???????????? ??????</S.Label>
                        <S.Description>?????? 12??????????????? ??????????????????.(???????????? ??????)</S.Description>
                        <S.Input onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} />
                    </S.InputWrap>
                    <S.InputWrap>
                        <S.Label>???????????? ????????????</S.Label>
                        <S.Select onChange={(e) => setProjectCatagory(e.target.value)} value={projectCatagory}>
                            {catagoryList.map((item, i) => (
                                <option value={item.id} key={i}>
                                    {item.name}
                                </option>
                            ))}
                        </S.Select>
                    </S.InputWrap>
                    <S.InputWrap>
                        <S.Label>???????????? ????????? ?????????</S.Label>
                        <S.Description>??????????????? : 300 x 300px / ???????????? : jpg,png (?????? 1MB)</S.Description>
                        <ImageUpload id="thumbnail-image" defaultImage={projectThumbnailLocalUrl ? projectThumbnailLocalUrl.downloadUrl : null} onImageUpload={(file: File) => setProjectThumbnailLocalUrl(file)} />
                    </S.InputWrap>
                    <S.InputWrap>
                        <S.Label>???????????? ?????? ??????</S.Label>
                        <S.Description>???????????? ?????? ????????? ??????????????????</S.Description>
                        <S.CalendarWrap>
                        <DatePicker
                            selected={projectCreateDate}
                            onChange={setProjectCreateDate}
                            showTimeInput
                            dateFormat="Pp"
                        />
                        </S.CalendarWrap>
                    </S.InputWrap>
                </S.EssentialSection>
                <ProjectContentCUView projectContents={formItemList} toDeleteContent={(content) => { WillDeleteFormDeleteContentArray(content) }} onChangeProjectContents={(contents) => setFormItemList(contents)} />
                <S.ButtonWrap>
                    <DeleteFirestore documentId={projectContet.id} cellectionName='project' />
                    <S.SelectButton type="submit" onClick={onSubmit}>??????</S.SelectButton>
                </S.ButtonWrap>
            </PageMaxNoCSSLayout> :<Custom404/>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params, }: Params) => {
    const { id } = params;
    const resCatagoryList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/catagory");
    const catagoryList: ProjectCatagoryDTO[] = await resCatagoryList.json();
    const resprojectContet = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/project/${id}`);
    const projectContet: ProjectDTO = await resprojectContet.json();

    if (!catagoryList && !projectContet) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            catagoryList,
            projectContet
        }
    }
}

export default AdminModifyProject;