import { Observable } from "rxjs";

export interface HelloRepository {
    getHello(): Observable<string>;
}