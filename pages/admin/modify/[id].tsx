import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import S from "../../../styles/AdminPage.style";
import { PageMaxNoCSSLayout, Title2, PageMainContentMargin} from "../../../styles/design-system";
import ImageGalleryUpload from "../../../components/ImageGalleryUpload";
import ImageUpload from "../../../components/ImageUpload";
import WriteUpload from "../../../public/fonts/writeUpload";
import GetImageStorage from "../../../modules/GetImageStorage";
import { GetServerSideProps, NextPage } from "next";
import { ProjectCatagoryDTO } from "../../../interfaces/project-catagory.dto";
import { Params } from "next/dist/server/router";
import { ProjectDTO } from "../../../interfaces/project.dto";

type formItem = {
    order: number;
    type: string;
    item?: string | any[] | any;
};

type StaticProps = {
    catagoryList: ProjectCatagoryDTO[];
    projectContet: ProjectDTO
}

const AdminModifyProject: NextPage<StaticProps> = ({ catagoryList, projectContet }) => {
    const [winReady, setwinReady] = useState(false);
    useEffect(() => { setwinReady(true); }, []);
    const [formItemList, setFormItemList] = useState<formItem[]>(projectContet.content ? projectContet.content : []);
    const [projectTitle, setProjectTitle] = useState<string>(projectContet.title);
    const [projectCatagory, setProjectCatagory] = useState<string>(projectContet.catagory);
    const [projectThumbnailLocalUrl, setProjectThumbnailLocalUrl] = useState<any>({ ...projectContet.thumbnail });

    const onSubmit = async () => {
        const finalItemList: any[] = [];
        var newThumnail: any;
        if (!projectThumbnailLocalUrl.downloadUrl) {
            newThumnail = await GetImageStorage(projectThumbnailLocalUrl, "thumbnail");
        }
        await Promise.all(
            formItemList.map(async (item, i) => {
                switch (item.type) {
                    case "image":
                        if (!item.item.downloadUrl) {
                            item.item = await GetImageStorage(item.item, "image" + i);
                        }
                        finalItemList.push({ ...item });
                        break;
                    case "gallery":
                        const imageList: any[] = [];
                        await Promise.all(item.item.map(async (imageStorage: any, i: number) => {
                            if (!imageStorage.downloadUrl) {
                                imageStorage = await GetImageStorage(imageStorage, "gallery" + i);
                            }
                            imageList.push({ ...imageStorage, order: i });
                        }));
                        console.log(imageList);
                        finalItemList.push({ ...item, item: imageList });
                        break;
                    case "write":
                        if (item.item.markDownContent) {
                            finalItemList.push({ ...item, item: item.item, });
                        } else {
                            finalItemList.push({ ...item, item: { markDownContent: item.item }, });
                        }
                        break;
                }
            })
        );
        await formItemList.map((item, index) => item.order = index);

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project/update", {
            method: "POST",
            body: JSON.stringify({
                id: projectContet.id,
                title: projectTitle,
                catagory: projectCatagory,
                thumbnail: newThumnail? newThumnail : projectThumbnailLocalUrl,
                content: finalItemList,
            }),
        });

        if (res.ok) {
            const { docId } = await res.json();
            router.push("/project/"+docId);
          }
    };

    // 문제없음
    const formItemAdd = (type: string) => {
        const nowformItem = [...formItemList];
        switch (type) {
            case "image":
                nowformItem.push({ order: nowformItem.length, type: "image", item: {} });
                break;
            case "gallery":
                nowformItem.push({ order: nowformItem.length, type: "gallery", item: []  });
                break;
            case "write":
                nowformItem.push({ order: nowformItem.length, type: "write", item: {}  });
                break;
        }
        setFormItemList(nowformItem);
    };

    //문제없음
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const nowformItem = [...formItemList];
        const [reorderedItem] = nowformItem.splice(result.source.index, 1);
        nowformItem.splice(result.destination.index, 0, reorderedItem);
        setFormItemList(nowformItem);
    };

    return (
        winReady ? (<PageMaxNoCSSLayout>
            <PageMainContentMargin>
                <Title2 style={{ fontWeight: 600, color: "rgb(12,50,59)" }}>
                    아래 버튼을 클릭해서 원하는 페이지 구성을 만들어보세요!
                </Title2>
                <button onClick={() => formItemAdd("image")}>이미지 추가</button>
                <button onClick={() => formItemAdd("write")}>글 추가</button>
                <button onClick={() => formItemAdd("gallery")}>갤러리 추가</button>
                <S.InputWrap>
                    <S.Label>공지사항 제목</S.Label>
                    <S.Input onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} />
                </S.InputWrap>
                <S.InputWrap>
                    <S.Label>썸네일 이미지</S.Label>
                    <S.Description>권장사이즈 : 800 x 400px / 지원파일 : jpg.png (최대 2MB)</S.Description>
                    <ImageUpload id="thumbnail-image" defaultImage={projectThumbnailLocalUrl.downloadUrl} onImageUpload={(file:File)=> setProjectThumbnailLocalUrl(file)}/>
                </S.InputWrap>
                <S.InputWrap>
                    <S.Label>프로젝트 카테고리</S.Label>
                    <S.Select onChange={(e) => setProjectCatagory(e.target.value)} value={projectCatagory}>
                        {catagoryList.map((item, i) => (
                            <option value={item.id} key={i}>
                                {item.name}
                            </option>
                        ))}
                    </S.Select>
                </S.InputWrap>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="myProject">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {formItemList.map((item, index) => (
                                    <Draggable key={"draggable" + item.order} draggableId={"draggable" + item.order} index={index}>
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                {item.type == "image" ? (
                                                    <S.InputWrap>
                                                        <S.Label>단일 이미지</S.Label>
                                                        <S.Description>권장사이즈 : 800 x 400px / 지원파일 : jpg.png (최대 2MB)</S.Description>
                                                        <ImageUpload id={"image" + item.order} defaultImage={item.item.downloadUrl? item.item.downloadUrl: null} onImageUpload={(file:File)=> item.item = file}/>
                                                    </S.InputWrap>
                                                ) : item.type == "write" ? (
                                                    <S.InputWrap>
                                                        <S.Label>공지사항 내용</S.Label>
                                                        <WriteUpload defaultValue={item} />
                                                    </S.InputWrap>
                                                ) : item.type == "gallery" ? (
                                                    <S.InputWrap>
                                                        <S.Label>이미지 갤러리</S.Label>
                                                        <S.Description>권장사이즈 : 800 x 400px / 지원파일 : jpg.png (최대 2MB)</S.Description>
                                                        <ImageGalleryUpload id={"imageGallery" + item.order} defaultImages={item.item} onImageUpload={(file:FileList[])=> item.item = file}/>
                                                    </S.InputWrap>
                                                ) : null}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <S.Button type="submit" onClick={onSubmit}>저장</S.Button>
            </PageMainContentMargin>
        </PageMaxNoCSSLayout>) : <p>Loading</p>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params, }: Params) => {
    const { id } = params;
    const resCatagoryList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/catagory");
    const catagoryList: ProjectCatagoryDTO[] = await resCatagoryList.json();
    const resprojectContet = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/project/${id}`);
    const projectContet: ProjectDTO = await resprojectContet.json();

    if (!catagoryList && projectContet) {
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