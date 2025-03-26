import { HelloDataSource } from "../HelloDataSource";

export class HelloDataSourceImpl implements HelloDataSource {
    
    async getHello(): Promise<string> {
        return 'Hello from DataSource';
    }

    async getDetail(id: number): Promise<string> {
        return `${id} From datasource`;
    }
}