import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import S from "../../../styles/AdminPage.style";
import { PageMaxNoCSSLayout, Title2, PageMainContentMargin } from "../../../styles/design-system";
import ImageGalleryUpload from "../../../components/ImageGalleryUpload";
import ImageUpload from "../../../components/ImageUpload";
import WriteUpload from "../../../public/fonts/writeUpload";
import GetImageStorage from "../../../modules/GetImageStorage";
import { GetStaticProps, NextPage } from "next";
import { ProjectCatagoryDTO } from "../../../interfaces/project-catagory.dto";

type formItem = {
  order: number;
  type: string;
  item?: string | any[] | any;
};

type StaticProps = {
  CatagoryList: ProjectCatagoryDTO[]
}

const AdminCreateProject: NextPage<StaticProps> = ({ CatagoryList }) => {
  const [formItemList, setFormItemList] = useState<formItem[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectCatagory, setProjectCatagory] = useState<string>('');
  const [projectThumbnailLocalUrl, setProjectThumbnailLocalUrl] = useState<formItem>({order: 0, type: "image"});

  // 문제 없음
  const onSubmit = async () => {
    const finalItemList: any[] = [];
    //썸네일 이미지 저장
    const projectThumbnail = await GetImageStorage(projectThumbnailLocalUrl.item, "thumbnail");

    await Promise.all(
      formItemList.map(async (item, i) => {
        switch (item.type) {
          case "image":
            const imageStorage = await GetImageStorage(item.item, "image" + i);
            finalItemList.push({ ...item, item: imageStorage, });
            break;
          case "gallery":
            const imageList: any[] = [];
            await Promise.all(item.item.map(async (file: File, i: number) => {
              const imageStorage = await GetImageStorage(file, "image" + i);
              imageList.push({ ...imageStorage, order: i });
            }));
            finalItemList.push({ ...item, item: imageList });
            break;
          case "write":
            finalItemList.push({ ...item, item: { markDownContent: item.item }, });
            break;
        }
      })
    );

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project/create", {
      method: "POST",
      body: JSON.stringify({
        title: projectTitle,
        catagory: projectCatagory,
        thumbnail: projectThumbnail,
        content: finalItemList,
      }),
    });
  };

  // 문제없음
  const formItemAdd = (type: string) => {
    const nowformItem = [...formItemList];
    switch (type) {
      case "image":
        nowformItem.push({ order: nowformItem.length, type: "image" });
        break;
      case "gallery":
        nowformItem.push({ order: nowformItem.length, type: "gallery" });
        break;
      case "write":
        nowformItem.push({ order: nowformItem.length, type: "write" });
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
    nowformItem.map((item, index) => item.order = index);
    setFormItemList(nowformItem);
  };

  return (
    <PageMaxNoCSSLayout>
      <PageMainContentMargin>
        <Title2 style={{ fontWeight: 600, color: "rgb(12,50,59)" }}>
          아래 버튼을 클릭해서 원하는 페이지 구성을 만들어보세요!
        </Title2>
        <button onClick={() => formItemAdd("image")}>이미지 추가</button>
        <button onClick={() => formItemAdd("write")}>글 추가</button>
        <button onClick={() => formItemAdd("gallery")}>갤러리 추가</button>
        <S.InputWrap>
          <S.Label>프로젝트 제목</S.Label>
          <S.Input onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} />
        </S.InputWrap>
        <S.InputWrap>
          <S.Label>프로젝트 썸네일 이미지</S.Label>
          <S.Description>권장사이즈 : 800 x 400px / 지원파일 : jpg.png (최대 2MB)</S.Description>
          <ImageUpload id="thumbnail-image" item={projectThumbnailLocalUrl} />
        </S.InputWrap>
        <S.InputWrap>
          <S.Label>프로젝트 카테고리</S.Label>
          <S.Select onChange={(e) => setProjectCatagory(e.target.value)} value={projectCatagory}>
            {CatagoryList.map((item, i) => (
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
                            <ImageUpload id={"image" + item.order} item={item} />
                          </S.InputWrap>
                        ) : item.type == "write" ? (
                          <S.InputWrap>
                            <S.Label>공지사항 내용</S.Label>
                            <WriteUpload defaultValue={item} />
                          </S.InputWrap>
                        ) : item.type == "gallery" ? (
                          <S.InputWrap>
                            <S.Label>이미지 갤러리</S.Label>
                            <S.Description>권장사이즈 : 800 x 400px / 지원파일 : jpg.png (최대 2MB) </S.Description>
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
        <S.Button type="submit" onClick={onSubmit}>저장</S.Button>
      </PageMainContentMargin>
    </PageMaxNoCSSLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resCatagoryList = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/catagory");
  const CatagoryList: ProjectCatagoryDTO[] = await resCatagoryList.json();

  if (!CatagoryList) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      CatagoryList
    }
  }
}

export default AdminCreateProject;
