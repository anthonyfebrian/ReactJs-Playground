import { injectable } from "inversify";
import { HelloDataSource } from "../HelloDataSource";

@injectable()
export class HelloDataSourceImpl implements HelloDataSource {
    async getHello(): Promise<string> {
        return 'Hello from DataSource';
    }
}