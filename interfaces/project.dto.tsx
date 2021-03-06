import { ImageStoreageDTO, ImageStoreageWithOrderDTO } from "./image-storage.dto";
import { ProjectContentDTO } from "./project-content.dto";

export interface ProjectDTO extends ProjectSimpleDTO {
  content: ProjectContentItemDTO[];
  datetime: any;
}

export type ProjectSimpleDTO = {
  id: string;
  title: string;
  catagory: string;
  thumbnail: ImageStoreageDTO;
};

export type ProjectContentItemDTO = {
  type: string;
  order: number;
  item: ImageStoreageWithOrderDTO[] | ProjectContentDTO | ImageStoreageDTO;
};

export type ProjectTmpContentDTO = {
  type: string;
  order: number;
  item?: string | any[] | any;
};

export type NoticeDetailDTO = {
  id: string;
  title: string;
  content: string;
  datetime: any;
  isNotice: boolean;
};
