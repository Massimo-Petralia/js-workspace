export interface CategoryInterface {
    id: number,
    name: string,
    parentId: number | null,
    level: number,
    children?: CategoryInterface[]
}


