export interface HelloDataSource {
    getHello(): Promise<string>;

    getDetail(id: number): Promise<string>;
}