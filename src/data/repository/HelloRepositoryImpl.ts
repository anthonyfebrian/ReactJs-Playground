import { inject } from "inversify";
import { from, map, Observable } from "rxjs";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { HelloRepository } from "../../domain/repository/HelloRepository";
import { HelloDataSource } from "../remote/datasource/HelloDataSource";
import { Result, ResultFailed, ResultLoading, ResultSuccess } from "../../core/data/Result";
import { User } from "../../domain/entity/User";
import { mapUserResponseToDomain } from "../../utils/mapper/UserMapper";

export class HelloRepositoryImpl implements HelloRepository {

    constructor(
        @inject(HelloContainerKey.HELLO_DATA_SOURCE_ID) private dataSource: HelloDataSource,
    ) {}
    
    getHello(): Observable<Result<string>> {
        return new Observable<Result<string>>((observer) => {
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

    login(email: string, password: string): Observable<Result<User>> {
        return new Observable<Result<User>>((observer) => {
            observer.next(new ResultLoading());
            setTimeout(() => {
                this.dataSource.login(email, password).then((response) => {
                    console.log("berhasil get data")
                    const domainEntity = mapUserResponseToDomain(response)
                    observer.next(new ResultSuccess(domainEntity))
                    observer.complete();
                }).catch((error) => {
                    observer.next(new ResultFailed(error))
                    observer.complete()
                });
            }, 1000);
        });
    }
}