import { HelloRepository } from "@/domain/repository/HelloRepository";
import { inject } from "inversify";
import { from, map, Observable } from "rxjs";
import { HelloDataSource } from "../remote/datasource/HelloDataSource";

export class HelloRepositoryImpl implements HelloRepository {

    constructor(
        @inject('HelloDataSource') private dataSource: HelloDataSource,
    ) {}
    
    getHello(): Observable<string> {
        return from(this.dataSource.getHello())
        .pipe(map((data) => {
            return data + " From Repository";
        }));
    }
}