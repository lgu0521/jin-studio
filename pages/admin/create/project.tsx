//Basic
import { useState, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
//Style
import S from "../../../styles/AdminPage.style";
import { PageMaxNoCSSLayout } from "../../../styles/design-system";
//Component
import ImageUpload from "../../../components/ImageUpload";
import ProjectContentCUView from "../../../components/ProjectContentCUView";
//Module
import { useAuth } from "../../../modules/AuthProvider";
import GetImageStorage from "../../../modules/GetImageStorage";
import ChangeImageStorage from "../../../modules/ChangeImageStorage";
//DTO
import { ProjectCatagoryDTO } from "../../../interfaces/project-catagory.dto";
import { ProjectTmpContentDTO } from "../../../interfaces/project.dto";
import Custom404 from "../../../components/404";

type StaticProps = {
  CatagoryList: ProjectCatagoryDTO[]
}

const AdminCreateProject: NextPage<StaticProps> = ({ CatagoryList }) => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => { setwinReady(true); }, []);

  const [formItemList, setFormItemList] = useState<ProjectTmpContentDTO[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectCatagory, setProjectCatagory] = useState<string>('');
  const [projectThumbnailLocalUrl, setProjectThumbnailLocalUrl] = useState<any>(null);
  const deleteContentList: any[] = [];

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

  // 문제 없음
  const onSubmit = async () => {
    if (projectTitle == '') {
      alert('프로젝트 제목을 입력해주세요');
      return;
    }
    if (projectThumbnailLocalUrl == null) {
      alert('프로젝트 썸네일 이미지를 넣어주세요');
      return;
    }
    // 삭제할 이미지 검사
    await ImplementDeleteFormDeleteContentArray();
    // 썸네일 이미지 저장
    const newThumnail = await GetImageStorage(projectThumbnailLocalUrl, "thumbnail");
    //content order 정렬
    await Promise.all(await formItemList.map((item, index) => item.order = index));
    // 이미지 스토리지에 저장
    const finalItemList = await ChangeImageStorage(formItemList);
    // API 전송
    const updateRes = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project/create", {
      method: "POST",
      body: JSON.stringify({
        title: projectTitle,
        catagory: projectCatagory == ''? '4WVJdAiJPVaBe9LGy039': projectCatagory,
        thumbnail: newThumnail,
        content: finalItemList,
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
            <S.Label>프로젝트 제목</S.Label>
            <S.Description>최대 12글자이내로 작성해주세요.(띄어쓰기 포함)</S.Description>
            <S.Input onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} />
          </S.InputWrap>
          <S.InputWrap>
            <S.Label>프로젝트 카테고리</S.Label>
            <S.Select onChange={(e) => setProjectCatagory(e.target.value)} value={projectCatagory} defaultValue={CatagoryList[0].id}>
              {CatagoryList.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.name}
                </option>
              ))}
            </S.Select>
          </S.InputWrap>
          <S.InputWrap>
            <S.Label>프로젝트 썸네일 이미지</S.Label>
            <S.Description>권장사이즈 : 300 x 300px / 지원파일 : jpg.png (최대 1MB)</S.Description>
            <ImageUpload id="thumbnail-image" defaultImage={projectThumbnailLocalUrl ? projectThumbnailLocalUrl.downloadUrl : null} onImageUpload={(file: File) => setProjectThumbnailLocalUrl(file)} />
          </S.InputWrap>
        </S.EssentialSection>
        <ProjectContentCUView projectContents={formItemList} toDeleteContent={(content) => { WillDeleteFormDeleteContentArray(content) }} onChangeProjectContents={(contents) => setFormItemList(contents)} />
        <S.Button type="submit" onClick={onSubmit}>저장</S.Button>
      </PageMaxNoCSSLayout> : <Custom404/>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resCatagoryList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/catagory");
  const CatagoryList: ProjectCatagoryDTO[] = await resCatagoryList.json();

  if (!CatagoryList) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      CatagoryList
    }
  }
}

// const CustomPageMainContentMargin = styled(PageMainContentMargin)`
//   @media only screen and (max-width: 600px) {
//     margin-bottom: ${(props) => props.theme.margins.base};
//   }
//   @media only screen and (min-width: 600px) {
//     margin-bottom: ${(props) => props.theme.margins.lg};
//   }
//   @media only screen and (min-width: 768px) {
//     margin-bottom: ${(props) => props.theme.margins.xl};
//   }
//   @media only screen and (min-width: 992px) {
//     margin-bottom: ${(props) => props.theme.margins.xxl};
//   }
//   @media only screen and (min-width: 1200px) {
//     margin-bottom: ${(props) => props.theme.margins.xxxl};
//   }
// `

export default AdminCreateProject;
