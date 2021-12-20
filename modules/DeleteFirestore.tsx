import { useRouter } from "next/router";
import { ImageStoreageWithOrderDTO } from "../interfaces/image-storage.dto";
import { ProjectContentItemDTO } from "../interfaces/project.dto";
import getUseCallProject from '../swr/getUseCallProject';

type Props = {
    documentId: string,
    cellectionName: string
}
const DeleteFirestore = ({ documentId, cellectionName }: Props) => {
    const { project, isLoading, isError } = getUseCallProject(documentId, cellectionName);
    const router = useRouter();
    if (isLoading) return <p>Loaiding</p>;
    if (isError) return <p>isError</p>;

    const ImageCheckInProjectContent = async () => {
        await Promise.all(project.content.map(async (content: ProjectContentItemDTO, i: number) => {
            console.log(project.content);
            if (Array.isArray(content.item)) {
                await Promise.all(content.item.map(async (galleryItem: ImageStoreageWithOrderDTO) => {
                    await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/delete/image", {
                        method: "POST",
                        body: JSON.stringify(galleryItem),
                    })
                }));
            } else {
                if (content.type == 'image') {
                    await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/delete/image", {
                        method: "POST",
                        body: JSON.stringify(content.item),
                    });
                }
            }
        }));

        await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/delete/image", {
            method: "POST",
            body: JSON.stringify(project.thumbnail),
        });
        return true;
    }

    const implementsDelete = async () => {
        const isDeleteImages = await ImageCheckInProjectContent();
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/delete/" + documentId);
        if (res.ok) {
            router.push('/');
        }

    }

    return (
        <button onClick={() => implementsDelete()}>삭제</button>
    );
}

export default DeleteFirestore;