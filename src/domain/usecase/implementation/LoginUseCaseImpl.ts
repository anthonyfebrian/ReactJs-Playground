import { Result } from "../../../core/data/Result";
import { User } from "../../../domain/entity/User";
import { Observable } from "rxjs";
import { LoginUseCase } from "../LoginUseCase";
import { HelloRepository } from "@/domain/repository/HelloRepository";
import { inject } from "inversify";
import { HelloContainerKey } from "../../../di/HelloContainerKey";

export class LoginUseCaseImpl implements LoginUseCase {
    constructor(@inject(HelloContainerKey.HELLO_REPOSITORY_ID) private repository: HelloRepository) { }
    invoke(email: string, password: string): Observable<Result<User>> {
        return this.repository.login(email, password)
    }
}