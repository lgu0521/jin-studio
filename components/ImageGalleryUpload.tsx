import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";

type Props = {
  id: string;
  defaultImages: any;
  onImageUpload: (file: FileList[]) => void;
};

const ImageGalleryUpload = ({ id, defaultImages, onImageUpload }: Props) => {
  resetServerContext();
  const [myImage, setMyImage] = useState<any>(defaultImages ? defaultImages : []);
  const [imageFileList, setImageFileList] = useState<FileList[]>([]);

  const addImage = (e: any) => {
    const nowSelectImageList = e.target.files;
    const nowImageUrlList = [...myImage];
    const nowImageFileList = [...imageFileList];
    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl = {
        downloadUrl: URL.createObjectURL(nowSelectImageList[i]),
        order: i
      };
      nowImageUrlList.push(nowImageUrl);
      nowImageFileList.push(nowSelectImageList[i]);
    }
    setImageFileList(nowImageFileList);
    setMyImage(nowImageUrlList);
    onImageUpload(nowImageFileList);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = [...myImage];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onImageUpload(items);
    setMyImage(items);
  };

  return (
    <>
      <ImageGalleryWrap>
        <InputLabel htmlFor={id}>
          <span>이미지 추가</span>
        </InputLabel>
        <InputBox id={id} type="file" multiple onChange={addImage} />
        {myImage ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="galleryImage">
              {(provided) => (
                <DroppableUl {...provided.droppableProps} ref={provided.innerRef}>
                  {myImage.map((item: any, index: number) => (
                    <Draggable key={"imageDraggable" + item.order} draggableId={"imageDraggable" + item.order} index={index}>
                      {(provided) => (
                        <DroppableLi ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          <Image src={item.downloadUrl} height={100} width={100} />
                        </DroppableLi>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </DroppableUl>
              )}
            </Droppable>
          </DragDropContext>
        ) : null}
      </ImageGalleryWrap>
    </>
  );
};
const DroppableUl = styled.ul``;
const DroppableLi = styled.li``;
const ImageGalleryWrap = styled.div`
  width: 100%;
  margin: 5px 0px;
  padding: 10px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  border-radius: 10px;
  border: 1px solid #d2d4de;
  overflow-x: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const InputBox = styled.input`
  display: none;
`;

const InputLabel = styled.label`
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  background-color: white;
  border: 1px dashed black;
  border-radius: 10px;
  span {
    display: none;
  }
  ::after {
    content: "";
    position: absolute;
    background: url("/image-add.png");
    width: 48px;
    height: 48px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  :hover {
    border: 2px solid black;
  }
`;

export default ImageGalleryUpload;
