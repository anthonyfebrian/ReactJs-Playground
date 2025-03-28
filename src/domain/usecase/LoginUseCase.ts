import { Result } from "../../core/data/Result";
import { Observable } from "rxjs";
import { User } from "../entity/User";

export interface LoginUseCase {
    invoke(email: string, password: string): Observable<Result<User>>
}