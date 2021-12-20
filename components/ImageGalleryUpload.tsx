import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import DeleteFirestore from "../modules/DeleteFirestore";

type Props = {
  id: string;
  defaultImages: any;
  onImageUpload: (file: any[]) => void;
  deleteItem:(item:any)=>void;
};

const ImageGalleryUpload = ({ id, defaultImages, onImageUpload,deleteItem }: Props) => {
  const [myImage, setMyImage] = useState<any>(defaultImages ? defaultImages : []);
  const [imageFileList, setImageFileList] = useState<any[]>(defaultImages ? defaultImages : []);

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
    //localFile
    const items = [...myImage];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMyImage(items);

    //ObjectFile
    const fileItems = [...imageFileList];
    const [reorderedItemFileList] = fileItems.splice(result.source.index, 1);
    fileItems.splice(result.destination.index, 0, reorderedItemFileList);
    setImageFileList(fileItems);
    console.log(fileItems);
    onImageUpload(fileItems);
  };

  const WillDeleteFormDeleteContentArray = (contentIndex: number, content: any) => {
    const nowformItem = [...myImage];
    nowformItem.splice(contentIndex, 1);
    setMyImage(nowformItem);

    const nowFileItem = [...imageFileList];
    nowFileItem.splice(contentIndex, 1);
    setImageFileList(nowFileItem);

    deleteItem(content);
  }

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
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {myImage.map((item: any, index: number) => (
                    <Draggable key={id + item.order} draggableId={id + item.order} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          <button onClick={() =>WillDeleteFormDeleteContentArray(index, item)}>삭제</button>
                          <Image src={item.downloadUrl} height={100} width={100} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : null}
      </ImageGalleryWrap>
    </>
  );
};

const ImageGalleryWrap = styled.div`
  width: 100%;
  margin: 5px 0px;
  padding: 10px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  border-radius: 10px;
  border: 1px solid #d2d4de;
  overflow-x: scroll;
  ::-webkit-scrollbar {display: none;}
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
