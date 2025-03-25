import { inject } from "inversify";
import { map, Observable } from "rxjs";
import { HELLO_REPOSITORY_ID } from "../../../di/HelloContainerKey";
import { HelloRepository } from "../../../domain/repository/HelloRepository";
import { GetHelloUseCase } from "../GetHelloUseCase";

export class GetHelloUseCaseImpl implements GetHelloUseCase {
    constructor(
        @inject(HELLO_REPOSITORY_ID) private repository: HelloRepository
    ) {}

    invoke(): Observable<string> {
        return this.repository.getHello()
        .pipe(map((data) => {
            return data + " From UseCase";
        }));
    }
}