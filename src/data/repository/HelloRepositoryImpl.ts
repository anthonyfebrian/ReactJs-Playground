import { inject } from "inversify";
import { from, map, Observable } from "rxjs";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { HelloRepository } from "../../domain/repository/HelloRepository";
import { HelloDataSource } from "../remote/datasource/HelloDataSource";
import { Result, ResultLoading, ResultSuccess } from "../../core/data/Result";

export class HelloRepositoryImpl implements HelloRepository {

    constructor(
        @inject(HelloContainerKey.HELLO_DATA_SOURCE_ID) private dataSource: HelloDataSource,
    ) {}
    
    
    getHello(): Observable<Result<string>> {
        return new Observable<Result<string>>((observer) => {
            console.log("masuk repo")
            observer.next(new ResultLoading());
            setTimeout(() => {
                this.dataSource.getHello().then((data) => {
                    console.log("berhasil get data")
                    observer.next(new ResultSuccess(data+ "From Repository"))
                    observer.complete();
                }).catch((error) => {
                    observer.error(error);
                });
            }, 1000);
        });
    }

    getDetail(id: number): Observable<string> {
        return from(this.dataSource.getDetail(id))
        .pipe(map((data) => {
            return data + " From Repository";
        }));
    }
}