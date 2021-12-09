import { ImageStoreageDTO, ImageStoreageWithOrderDTO } from "./image-storage.dto";
import { ProjectContentDTO } from "./project-content.dto";

export type AboutDTO = {
    id: string,
    content: ProjectContentItemDTO[];
}

export type ProjectContentItemDTO = {
    type: string;
    order: number;
    item: ImageStoreageWithOrderDTO[] | ProjectContentDTO | ImageStoreageDTO;
};
