import { Result } from "../../core/data/Result";
import { Observable } from "rxjs";
import { User } from "../entity/User";

export interface HelloRepository {
    getHello(): Observable<Result<string>>;

    getDetail(id: number): Observable<string>;

    login(email:string, password:string): Observable<Result<User>>
}