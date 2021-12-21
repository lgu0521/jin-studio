import GetImageStorage from "./GetImageStorage";

type formItem = {
    order: number;
    type: string;
    item?: string | any[] | any;
};

const ChangeImageStorage = async (willChangeItemList: formItem[]): Promise<formItem[]> => {
    const changedItemList: any[] = [];
    await Promise.all(willChangeItemList.map(async (item, i) => {
        switch (item.type) {
            case "image":
                if (!item.item.downloadUrl) {
                    item.item = await GetImageStorage(item.item, "image" + i);
                }
                changedItemList.push({ ...item });
                break;
            case "gallery":
                const imageList: any[] = [];
                await Promise.all(item.item.map(async (imageStorage: any, i: number) => {
                    if (!imageStorage.downloadUrl) {
                        imageStorage = await GetImageStorage(imageStorage, "gallery" + i);
                    }
                    imageList.push({ ...imageStorage, order: i });
                }));
                changedItemList.push({ ...item, item: imageList });
                break;
            case "write":
                if (item.item.markDownContent) {
                    changedItemList.push({ ...item });
                } else {
                    changedItemList.push({ ...item, item: { markDownContent: item.item } });
                }
                break;
        }
    }));

    return changedItemList;

}

export default ChangeImageStorage;