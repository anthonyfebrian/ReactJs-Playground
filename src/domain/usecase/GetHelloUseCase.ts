import { Observable } from "rxjs";

export interface GetHelloUseCase {
    invoke(): Observable<string>
}