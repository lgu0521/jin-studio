import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
type Props = {
  id: string;
  defaultImage: string | null;
  onImageUpload: (file: File) => void;
};
const ImageUpload = ({ id, defaultImage, onImageUpload }: Props) => {
  const [myImage, setMyImage] = useState<string>(defaultImage ? defaultImage : '');

  const addImage = (e: any) => {
    onImageUpload(e.target.files[0]);
    const nowImageUrl = URL.createObjectURL(e.target.files[0]);
    setMyImage(nowImageUrl);
  };

  return (
    <>
      <ImageUploadWrap>
        <InputLabel htmlFor={id}>
          <span>이미지 추가</span>
        </InputLabel>
        <InputBox id={id} type="file" onChange={addImage} />
        {myImage ? (
          <ImageWrap>
            <Image src={myImage} height={150} width={150} />
          </ImageWrap>
        ) : null}
      </ImageUploadWrap>
    </>
  );
};
const ImageWrap = styled.div`
  margin: 0px 10px;
`;
const ImageUploadWrap = styled.div`
  display: flex;
  width: 100%;
  margin: 5px 0px;
  padding: 10px 20px;
  background-color: rgba(99, 114, 131, 0.02);
  border-radius: 10px;
  border: 1px solid #d2d4de;
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

export default ImageUpload;
