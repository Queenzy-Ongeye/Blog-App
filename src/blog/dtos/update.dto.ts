export interface UpdateBlogDto {
    _id: string;
    clientPrps: {
        title?: string;
        content?: string;
    }
}