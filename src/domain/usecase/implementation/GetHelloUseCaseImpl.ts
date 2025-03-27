import { inject } from "inversify";
import { map, Observable } from "rxjs";
import { HelloContainerKey } from "../../../di/HelloContainerKey";
import { HelloRepository } from "../../../domain/repository/HelloRepository";
import { GetHelloUseCase } from "../GetHelloUseCase";
import { Result, ResultSuccess } from "../../../core/data/Result";

export class GetHelloUseCaseImpl implements GetHelloUseCase {
    constructor(
        @inject(HelloContainerKey.HELLO_REPOSITORY_ID) private repository: HelloRepository
    ) {}

    invoke(): Observable<Result<string>> {
        return this.repository.getHello()
    }
}