import { map, Observable } from "rxjs";
import { GetHelloUseCase } from "../GetHelloUseCase";
import { HelloRepository } from "@/domain/repository/HelloRepository";
import { inject } from "inversify";

export class GetHelloUseCaseImpl implements GetHelloUseCase {
    constructor(
        @inject('HelloRepository') private repository: HelloRepository
    ) {}

    invoke(): Observable<string> {
        return this.repository.getHello()
        .pipe(map((data) => {
            return data + " From UseCase";
        }));
    }
}