import { HelloDataSource } from "../HelloDataSource";

export class HelloDataSourceImpl implements HelloDataSource {
    async getHello(): Promise<string> {
        return 'Hello from DataSource';
    }
}