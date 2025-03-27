import { Result } from "../../core/data/Result";
import { Observable } from "rxjs";

export interface HelloRepository {
    getHello(): Observable<Result<string>>;

    getDetail(id: number): Observable<string>;
}