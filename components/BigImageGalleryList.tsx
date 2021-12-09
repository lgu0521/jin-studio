import { ProjectSimpleDTO } from "../interfaces/project.dto";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

interface Props {
  projectList: ProjectSimpleDTO[];
  selectedCatagoryId: string;
}
const BigImageGalleryList = ({ projectList, selectedCatagoryId }: Props) => {
  console.log(selectedCatagoryId);
  return (
    <ImageGalleryWrap>
      <ImageGalleryUl>
        {projectList.map((project, i) => (
          <ImageGalleryli
            key={i}
            selectedCatagory={selectedCatagoryId}
            projectCatagory={project.catagory}
          >
            <Link href={"/project/" + project.id}>
              <a>
                <AnimationImageWrap>
                  <Image
                    layout="responsive"
                    src={project.thumbnail.downloadUrl}
                    objectFit="cover"
                    alt=""
                    width={100}
                    height={100}
                  />
                </AnimationImageWrap>
              </a>
            </Link>
          </ImageGalleryli>
        ))}
      </ImageGalleryUl>
    </ImageGalleryWrap>
  );
};

const ImageGalleryWrap = styled.div`
  max-height: 130vh;
  border-bottom: 3px solid ${(props) => props.theme.colors.line};
  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ImageGalleryUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  width: 100%;
  height: 100%;
  margin: auto;
`;

const ImageGalleryli = styled.li<{ selectedCatagory: string; projectCatagory: string; }>`
  display: ${(props) =>
    props.selectedCatagory == "0"
      ? "block"
      : props.selectedCatagory != props.projectCatagory
        ? "none"
        : "block"};
`;


const AnimationImageWrap = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
    :before{
      content:'하마가 꿀꺽';
      position: absolute;
      width: 100%;
      z-index: 1;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 22px;
      transition: .3s;
      transition-property: .2s;
      margin-top: -200px;
      opacity: 0;
    }

    :after{
      content: '';
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      width:100%;
      height: 100%;
      background-color: rgb(0,0,0,.8);
      transition: .3s;
      opacity: 0;
      margin-top: 200px;
    }

    :hover:before{
      margin-top: 0;
      opacity: 1;
    }
    :hover:after{
      margin-top: 0;
      opacity: 1;
    }
`

export default BigImageGalleryList;
