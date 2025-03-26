import { inject } from "inversify";
import { from, map, Observable } from "rxjs";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { HelloRepository } from "../../domain/repository/HelloRepository";
import { HelloDataSource } from "../remote/datasource/HelloDataSource";

export class HelloRepositoryImpl implements HelloRepository {

    constructor(
        @inject(HelloContainerKey.HELLO_DATA_SOURCE_ID) private dataSource: HelloDataSource,
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