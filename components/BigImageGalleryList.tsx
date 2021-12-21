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
      <ImageGalleryUl>
        {projectList.map((project, i) => (
          <ImageGalleryli
            key={i}
            selectedCatagory={selectedCatagoryId}
            projectCatagory={project.catagory}
          >
            <Link href={"/project/" + project.id}>
              <a>
                <AnimationImageWrap projectTitle={project.title}>
                  <Image
                    layout="responsive"
                    src={project.thumbnail.downloadUrl}
                    objectFit="cover"
                    alt=""
                    width={100}
                    height={100}
                    placeholder="blur"
                    blurDataURL="/image/blur.png"
                  />
                </AnimationImageWrap>
              </a>
            </Link>
          </ImageGalleryli>
        ))}
      </ImageGalleryUl>
  );
};


const ImageGalleryUl = styled.ul`
  display: grid;
  width: 100%;
  height: 100%;
  margin: auto;
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
  }
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 13px;
  }
`;

const ImageGalleryli = styled.li<{ selectedCatagory: string; projectCatagory: string; }>`
  display: ${(props) =>
    props.selectedCatagory == "all"
      ? "block"
      : props.selectedCatagory != props.projectCatagory
        ? "none"
        : "block"};
`;


const AnimationImageWrap = styled.div<{projectTitle: string}>`
  position: relative;
  cursor: pointer;
  overflow: hidden;
    :before{
      content: '${(props) => props.projectTitle? props.projectTitle : '제목 없음'}';
      position: absolute;
      width: 100%;
      z-index: 1;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      transition: .1s;
      transition-property: .2s;
      margin-top: -200px;
      opacity: 0;
      @media only screen and (max-width: 310px) {
        font-size: ${(props) => props.theme.fontSizes.title7};
      }
      @media only screen and (min-width: 310px) {
        font-size: ${(props) => props.theme.fontSizes.title7};
      }
      @media only screen and (min-width: 600px) {
        font-size: ${(props) => props.theme.fontSizes.title5};
      }
      @media only screen and (min-width: 768px) {
        font-size: ${(props) => props.theme.fontSizes.title4};
      }
      @media only screen and (min-width: 992px) {
        font-size: ${(props) => props.theme.fontSizes.title3};
      }
      @media only screen and (min-width: 1200px) {
        font-size: ${(props) => props.theme.fontSizes.title3};
      }
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
      transition: .1s;
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
