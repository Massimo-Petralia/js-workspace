export interface CategoryInterface {
    id: number,
    name: string,
    parent_id: number | null,
    level: number,
    marketplace_category: string,
    children?: CategoryInterface[]
}


