import { inject } from "inversify";
import { Observable } from "rxjs";
import { Result } from "../../../core/data/Result";
import { HelloContainerKey } from "../../../di/HelloContainerKey";
import { HelloRepository } from "../../../domain/repository/HelloRepository";
import { GetHelloUseCase } from "../GetHelloUseCase";

export class GetHelloUseCaseImpl implements GetHelloUseCase {
    constructor(
        @inject(HelloContainerKey.HELLO_REPOSITORY_ID) private repository: HelloRepository
    ) {}

    invoke(): Observable<Result<string>> {
        return this.repository.getHello()
    }
}