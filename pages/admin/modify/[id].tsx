import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import S from "../../../styles/AdminPage.style";
import {
    PageMaxNoCSSLayout,
    Title2,
    PageMainContentMargin,
} from "../../../styles/design-system";
import ImageGalleryUpload from "../../../components/ImageGalleryUpload";
import ImageUpload from "../../../components/ImageUpload";
import WriteUpload from "../../../components/writeUpload";
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
    useEffect(() => {
        setwinReady(true);
    }, []);
    const [formItemList, setFormItemList] = useState<formItem[]>(projectContet.content ? projectContet.content : []);
    const [projectTitle, setProjectTitle] = useState<string>(projectContet.title);
    const [projectCatagory, setProjectCatagory] = useState<string>(projectContet.catagory);
    const [projectThumbnailLocalUrl, setProjectThumbnailLocalUrl] = useState<formItem>({
        order: 0,
        type: "image",
        item: {
            downloadUrl: projectContet.thumbnail.downloadUrl
        }
    });

    const onSubmit = async () => {
        const itemList: any[] = [];
        var projectThumbnail;
        if (projectThumbnailLocalUrl.item.downloadUrl) {
            projectThumbnail = projectContet.thumbnail;
        } else {
            projectThumbnail = await GetImageStorage(projectThumbnailLocalUrl.item, "thumbnail");
        }

        await Promise.all(
            formItemList.map(async (item, i) => {
                switch (item.type) {
                    case "image":
                        var imageStorage;
                        if (item.item.downloadUrl) {
                            imageStorage = item.item;
                        } else {
                            imageStorage = await GetImageStorage(item.item, "image" + i);
                        }
                        itemList.push({ ...item, item: imageStorage, });
                        break;
                    case "gallery":
                        const imageList: any[] = [];
                        await Promise.all(item.item.map(async (file: File, i: number) => {
                            if (item.item.downloadUrl) {
                                imageStorage = item.item;
                            } else {
                                imageStorage = await GetImageStorage(item.item, "gallery" + i);
                            }
                            imageList.push({ ...imageStorage, order: i });
                        }));
                        itemList.push({ ...item, item: imageList });
                        break;
                    case "write":
                        if (item.item.markDownContent) {
                            itemList.push({ ...item, item: item.item, });
                        } else {
                            itemList.push({ ...item, item: { markDownContent: item.item }, });
                        }
                        break;
                }
            })
        );

        formItemList.map((item, index) => {
            item.order = (index as number);
        });

        const res = await fetch("http://localhost:3001/api/project/update", {
            method: "POST",
            body: JSON.stringify({
                id: projectContet.id,
                title: projectTitle,
                catagory: projectCatagory,
                thumbnail: projectThumbnail,
                content: itemList,
            }),
        });
    };

    const formItemAdd = (type: string) => {
        const nowformItem = [...formItemList];
        switch (type) {
            case "image":
                nowformItem.push({
                    order: nowformItem.length,
                    type: "image"
                });
                break;
            case "gallery":
                nowformItem.push({
                    order: nowformItem.length,
                    type: "gallery"
                });
                break;
            case "write":
                nowformItem.push({
                    order: nowformItem.length,
                    type: "write"
                });
                break;
        }
        setFormItemList(nowformItem);
    };

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
                <Title2
                    style={{
                        fontWeight: 600,
                        marginBottom: "60px",
                        color: "rgb(12,50,59)",
                    }}
                >
                    추가할 공지사항 정보를 입력해주세요
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
                    <S.Description>
                        사진 첨부시, 반드시 FireBase에서 이미지 업로드 후
                        URL을 넣어주세요.
                    </S.Description>
                    <ImageUpload id="thumbnail-image" item={projectThumbnailLocalUrl} />
                </S.InputWrap>
                <S.InputWrap>
                    <S.Label>프로젝트 카테고리</S.Label>
                    <S.Description>
                        사진 첨부시, 반드시 FireBase에서 이미지 업로드 후
                        URL을 넣어주세요.
                    </S.Description>
                    <S.Select onChange={(e) => setProjectCatagory(e.target.value)} value={projectCatagory}>
                        {catagoryList.map((item, i) => (
                            <option value={item.name} key={i}>
                                {item.name}
                            </option>
                        ))}
                    </S.Select>
                </S.InputWrap>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="myImage">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {formItemList.map((item, index) => (
                                    <Draggable key={"draggable" + item.order} draggableId={"draggable" + item.order} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                            >
                                                {item.type == "image" ? (
                                                    <S.InputWrap>
                                                        <S.Label>단일 이미지</S.Label>
                                                        <S.Description>
                                                            사진 첨부시, 반드시 FireBase에서 이미지 업로드 후
                                                            URL을 넣어주세요.
                                                        </S.Description>
                                                        <ImageUpload id={"image" + item.order} item={item} />
                                                    </S.InputWrap>
                                                ) : item.type == "write" ? (
                                                    <S.InputWrap>
                                                        <S.Label>공지사항 내용</S.Label>
                                                        <S.Description>
                                                            사진 첨부시, 반드시 FireBase에서 이미지 업로드 후
                                                            URL을 넣어주세요.
                                                        </S.Description>
                                                        <WriteUpload item={item} />
                                                    </S.InputWrap>

                                                ) : item.type == "gallery" ? (
                                                    <S.InputWrap>
                                                        <S.Label>이미지 갤러리</S.Label>
                                                        <S.Description>
                                                            사진 첨부시, 반드시 FireBase에서 이미지 업로드 후
                                                            URL을 넣어주세요.
                                                        </S.Description>
                                                        <ImageGalleryUpload id={"imageGallery" + item.order} item={item} />
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
                <S.Button type="submit" onClick={onSubmit}>
                    저장
                </S.Button>
            </PageMainContentMargin>
        </PageMaxNoCSSLayout>) : <p>Loading</p>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params, }: Params) => {
    const { id } = params;
    resetServerContext();
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
