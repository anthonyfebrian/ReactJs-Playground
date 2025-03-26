import { Observable } from "rxjs";
import { HelloRepository } from "../../../domain/repository/HelloRepository";
import { GetDetailUseCase } from "../GetDetailUseCase";
import { inject } from "inversify";
import { HELLO_REPOSITORY_ID } from "../../../di/HelloContainerKey";

export class GetDetailUseCaseImpl implements GetDetailUseCase {
    constructor(@inject(HELLO_REPOSITORY_ID) private readonly repository: HelloRepository) { }

    invoke(id: number): Observable<string> {
        return this.repository.getDetail(id);
    }
}