import { Observable } from "rxjs";

export interface GetDetailUseCase {
    invoke(id: number): Observable<string>;
}