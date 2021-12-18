import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import S from "../../../styles/AdminPage.style";
import { PageMaxNoCSSLayout, Title1, PageMainContentMargin } from "../../../styles/design-system";
import ImageGalleryUpload from "../../../components/ImageGalleryUpload";
import ImageUpload from "../../../components/ImageUpload";
import WriteUpload from "../../../public/fonts/writeUpload";
import GetImageStorage from "../../../modules/GetImageStorage";
import { GetServerSideProps, NextPage } from "next";
import { Params } from "next/dist/server/router";
import { useRouter } from "next/router";
import { AboutDTO } from "../../../interfaces/about.dto";

type formItem = {
    order: number;
    type: string;
    item?: string | any[] | any;
};

type StaticProps = {
    AboutContent: AboutDTO
}

const AdminModifyProject: NextPage<StaticProps> = ({ AboutContent }) => {
    const [winReady, setwinReady] = useState(false);
    const router = useRouter();
    useEffect(() => { setwinReady(true); }, []);
    const [formItemList, setFormItemList] = useState<formItem[]>(AboutContent.content ? AboutContent.content : []);
    const onSubmit = async () => {
        const finalItemList: any[] = [];
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
        await Promise.all(formItemList.map((item, index) => item.order = index));
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/about/update", {
            method: "POST",
            body: JSON.stringify({
                id: "o6Vq7IMXHY46anrHrbDm",
                content: finalItemList,
            }),
        });

        if (res.ok) {
            router.push("/about");
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
                nowformItem.push({ order: nowformItem.length, type: "gallery", item: [] });
                break;
            case "write":
                nowformItem.push({ order: nowformItem.length, type: "write", item: {} });
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Title1 style={{ fontWeight: 400, color: "rgb(12,50,59)" }}>
                        아래 버튼을 클릭해서 원하는 페이지 구성을 만들어보세요🙂
                    </Title1>
                    <S.ButtonWrap>
                        <S.SelectButton onClick={() => formItemAdd("image")}>단일 이미지</S.SelectButton>
                        <S.SelectButton onClick={() => formItemAdd("write")}>글 작성</S.SelectButton>
                        <S.SelectButton onClick={() => formItemAdd("gallery")}>갤러리 이미지</S.SelectButton>
                    </S.ButtonWrap>
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
                                                        <ImageUpload id={"image" + item.order} defaultImage={item.item.downloadUrl ? item.item.downloadUrl : null} onImageUpload={(file: File) => item.item = file} />
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
                                                        <ImageGalleryUpload id={"imageGallery" + item.order} defaultImages={item.item} onImageUpload={(file: FileList[]) => item.item = file} />
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
    const resAboutContent = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/about/o6Vq7IMXHY46anrHrbDm`);
    const AboutContent: AboutDTO = await resAboutContent.json();

    if (!AboutContent) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            AboutContent
        }
    }
}

export default AdminModifyProject;