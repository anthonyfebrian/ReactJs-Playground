import { UserResponse } from "../../entity/response/UserResponse";
import { HelloDataSource } from "../HelloDataSource";

export class HelloDataSourceImpl implements HelloDataSource {
    private dummyUsers = [
        {
            email: "admin@admin.com",
            password: "1234",
            name: "admin",
        },
        {
            email: "guest@guest.com",
            password: "1234",
            name: "guest",
        }
    ]

    async getHello(): Promise<string> {
        return 'Hello from DataSource';
    }

    async getDetail(id: number): Promise<string> {
        return `${id} From datasource`;
    }

    async login(email: string, password: string): Promise<UserResponse> {
        const user = this.dummyUsers.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error("Invalid email or password.");
        }

         //RESEARCH PURPOSE!!! In real case password must not returned or saved on entity
        return { email: user.email, password: password, name: user.name }
    }
}