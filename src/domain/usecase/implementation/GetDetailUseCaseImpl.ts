import { inject } from "inversify";
import { Observable } from "rxjs";
import { HelloContainerKey } from "../../../di/HelloContainerKey";
import { HelloRepository } from "../../../domain/repository/HelloRepository";
import { GetDetailUseCase } from "../GetDetailUseCase";

export class GetDetailUseCaseImpl implements GetDetailUseCase {
    constructor(@inject(HelloContainerKey.HELLO_REPOSITORY_ID) private readonly repository: HelloRepository) { }

    invoke(id: number): Observable<string> {
        return this.repository.getDetail(id);
    }
}