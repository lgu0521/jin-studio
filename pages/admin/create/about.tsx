import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import S from "../../../styles/AdminPage.style";
import {
    PageMaxNoCSSLayout,
    Title2,
    PageMainContentMargin,
} from "../../../styles/design-system";
import ImageGalleryUpload from "../../../components/ImageGalleryUpload";
import ImageUpload from "../../../components/ImageUpload";
import WriteUpload from "../../../public/fonts/writeUpload";
import GetImageStorage from "../../../modules/GetImageStorage";
import { NextPage } from "next";

type formItem = {
    order: number;
    type: string;
    item?: string | any[] | any;
};


const AdminCreateNotice: NextPage = () => {
    const [formItemList, setFormItemList] = useState<formItem[]>([]);
    const onSubmit = async () => {
        const itemList: any[] = [];
        await Promise.all(
            formItemList.map(async (item, i) => {
                switch (item.type) {
                    case "image":
                        const imageStorage = await GetImageStorage(item.item, "image" + i);
                        itemList.push({ ...item, item: imageStorage, });
                        break;
                    case "gallery":
                        const imageList: any[] = [];
                        await Promise.all(item.item.map(async (file: File, i: number) => {
                            const imageStorage = await GetImageStorage(file, "image" + i);
                            imageList.push({ ...imageStorage, order: i });
                        }));
                        itemList.push({ ...item, item: imageList });
                        break;
                    case "write":
                        itemList.push({ ...item, item: { markDownContent: item.item }, });
                        break;
                }
            })
        );

        formItemList.map((item, index) => {
            item.order = (index as number) + 1;
        });

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/about/create", {
            method: "POST",
            body: JSON.stringify({
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
        console.log(nowformItem);
        setFormItemList(nowformItem);
    };

    return (
        <PageMaxNoCSSLayout>
            <PageMainContentMargin>
                <Title2
                    style={{
                        fontWeight: 600,
                        marginBottom: "60px",
                        color: "rgb(12,50,59)",
                    }}
                >
                    About 정보를 입력해주세요
                </Title2>
                <button onClick={() => formItemAdd("image")}>이미지 추가</button>
                <button onClick={() => formItemAdd("write")}>글 추가</button>
                <button onClick={() => formItemAdd("gallery")}>갤러리 추가</button>
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
        </PageMaxNoCSSLayout>
    );
};

export default AdminCreateNotice;
