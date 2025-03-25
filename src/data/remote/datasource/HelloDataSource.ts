export interface HelloDataSource {
    getHello(): Promise<string>;
}