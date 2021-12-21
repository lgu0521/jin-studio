import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import S from "../styles/AdminPage.style";
import { Title1 } from "../styles/design-system";
import ImageGalleryUpload from "./ImageGalleryUpload";
import ImageUpload from "./ImageUpload";
import WriteUpload from "../public/fonts/writeUpload";

type formItem = {
    order: number;
    type: string;
    item?: string | any[] | any;
};

type Props = {
    projectContents: formItem[],
    toDeleteContent: (item: any) => void,
    onChangeProjectContents: (contents: formItem[]) => void
}

const ProjectContentCUView = ({ projectContents, toDeleteContent, onChangeProjectContents }: Props) => {
    const [nowContents, setNowContents] = useState<formItem[]>(projectContents);

    useEffect(() => {
        onChangeProjectContents(nowContents);
    }, [nowContents]);

    const addProjectContent = (type: string) => {
        const updateContens = [...nowContents];
        switch (type) {
            case "image":
                updateContens.push({ order: updateContens.length, type: "image", item: {} });
                break;
            case "gallery":
                updateContens.push({ order: updateContens.length, type: "gallery", item: [] });
                break;
            case "write":
                updateContens.push({ order: updateContens.length, type: "write", item: {} });
                break;
        }
        setNowContents(updateContens);
    };

    const willDeleteFormDeleteContentArray = (contentIndex: number, itemOfcontent: any) => {
        willDeleteFormDrag(contentIndex);

        if (Array.isArray(itemOfcontent)) {
            itemOfcontent.map((item, i) => {
                toDeleteContent(item);
            })
        } else {
            toDeleteContent(itemOfcontent);
        }

    }

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;
        const updateContens = [...nowContents];
        const [reorderedItem] = updateContens.splice(result.source.index, 1);
        updateContens.splice(result.destination.index, 0, reorderedItem);

        setNowContents(updateContens);
    };

    const willDeleteFormDrag = (contentIndex: number) => {
        const updateContens = [...nowContents];
        updateContens.splice(contentIndex, 1);
        setNowContents(updateContens);
    }

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Title1 style={{ fontWeight: 400, color: "rgb(12,50,59)" }}>
                    아래 버튼을 클릭해서 원하는 페이지 구성을 만들어보세요🙂
                </Title1>
                <S.ButtonWrap>
                    <S.SelectButton onClick={() => addProjectContent("image")}>단일 이미지</S.SelectButton>
                    <S.SelectButton onClick={() => addProjectContent("write")}>글 작성</S.SelectButton>
                    <S.SelectButton onClick={() => addProjectContent("gallery")}>갤러리 이미지</S.SelectButton>
                </S.ButtonWrap>
                <Droppable droppableId="myProject">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {nowContents.map((item, index) => (
                                <Draggable key={"draggable" + item.order} draggableId={"draggable" + item.order} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                            <div style={{ position: 'relative' }}>
                                                <S.DeleteButtonIcon onClick={() => willDeleteFormDeleteContentArray(index, item.item)} />
                                                {item.type == "image" ? (
                                                    <S.InputWrap>
                                                        <S.Label>단일 이미지</S.Label>
                                                        <S.Description>권장사이즈 : 800 x auto / 지원파일 : jpg.png (최대 2MB)</S.Description>
                                                        <ImageUpload id={"image" + item.order} defaultImage={item.item ? item.item.downloadUrl : null} onImageUpload={(file: File) => item.item = file} />
                                                    </S.InputWrap>
                                                ) : item.type == "write" ? (
                                                    <S.InputWrap>
                                                        <S.Label>공지사항 내용</S.Label>
                                                        <S.Description>Markdown 형식으로 자유롭게 작성하세요.</S.Description>
                                                        <WriteUpload defaultValue={item} />
                                                    </S.InputWrap>
                                                ) : item.type == "gallery" ? (
                                                    <S.InputWrap>
                                                        <S.Label>이미지 갤러리</S.Label>
                                                        <S.Description>권장사이즈 : 800 x auto / 지원파일 : jpg.png (최대 2MB) </S.Description>
                                                        <ImageGalleryUpload id={"imageGallery" + item.order} defaultImages={item.item} onImageUpload={(file: FileList[]) => item.item = file}
                                                            deleteItem={(content) => toDeleteContent(content)}
                                                        />
                                                    </S.InputWrap>
                                                ) : null}
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

export default ProjectContentCUView;