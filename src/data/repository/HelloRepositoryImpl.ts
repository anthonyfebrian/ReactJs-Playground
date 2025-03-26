import { HelloRepository } from "../../domain/repository/HelloRepository";
import { inject } from "inversify";
import { from, map, Observable } from "rxjs";
import { HelloDataSource } from "../remote/datasource/HelloDataSource";
import { HELLO_DATA_SOURCE_ID } from "../../di/HelloContainerKey";

export class HelloRepositoryImpl implements HelloRepository {

    constructor(
        @inject(HELLO_DATA_SOURCE_ID) private dataSource: HelloDataSource,
    ) {}
    
    
    getHello(): Observable<string> {
        return from(this.dataSource.getHello())
        .pipe(map((data) => {
            return data + " From Repository";
        }));
    }

    getDetail(id: number): Observable<string> {
        return from(this.dataSource.getDetail(id))
        .pipe(map((data) => {
            return data + " From Repository";
        }));
    }
}