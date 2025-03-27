import { Result } from "../../core/data/Result";
import { Observable } from "rxjs";

export interface GetHelloUseCase {
    invoke(): Observable<Result<string>>
}