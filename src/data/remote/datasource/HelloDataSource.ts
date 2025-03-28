import { UserResponse } from "../entity/response/UserResponse";

export interface HelloDataSource {
    getHello(): Promise<string>;

    getDetail(id: number): Promise<string>;

    login(email:string, password:string): Promise<UserResponse>
}