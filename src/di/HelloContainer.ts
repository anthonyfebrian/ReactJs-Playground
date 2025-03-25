import { Container } from "inversify";
import { HelloDataSource } from "../data/remote/datasource/HelloDataSource";
import { HelloDataSourceImpl } from "../data/remote/datasource/implementation/HelloDataSourceImpl";
import { HelloRepositoryImpl } from "../data/repository/HelloRepositoryImpl";
import { HelloRepository } from "../domain/repository/HelloRepository";
import { GetHelloUseCase } from "../domain/usecase/GetHelloUseCase";
import { GetHelloUseCaseImpl } from "../domain/usecase/implementation/GetHelloUseCaseImpl";
import { HelloViewModel } from "../presentation/viewmodel/HelloViewModel";
import { GET_HELLO_USE_CASE_ID, HELLO_DATA_SOURCE_ID, HELLO_REPOSITORY_ID } from "./HelloContainerKey";



const helloContainer = new Container()

/**
 * Data
 */
helloContainer.bind<HelloDataSource>(HELLO_DATA_SOURCE_ID)
    .to(HelloDataSourceImpl)
    .inSingletonScope()

/**
 * Domain
 */

helloContainer.bind<HelloRepository>(HELLO_REPOSITORY_ID)
    .to(HelloRepositoryImpl)
    .inSingletonScope()

helloContainer.bind<GetHelloUseCase>(GET_HELLO_USE_CASE_ID)
    .to(GetHelloUseCaseImpl)


/**
 * Presentation
 */

helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()

export { helloContainer };
