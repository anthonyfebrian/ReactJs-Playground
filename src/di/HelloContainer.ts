import { Container, Factory } from "inversify";
import { HelloDataSource } from "../data/remote/datasource/HelloDataSource";
import { HelloDataSourceImpl } from "../data/remote/datasource/implementation/HelloDataSourceImpl";
import { HelloRepositoryImpl } from "../data/repository/HelloRepositoryImpl";
import { HelloRepository } from "../domain/repository/HelloRepository";
import { GetDetailUseCase } from "../domain/usecase/GetDetailUseCase";
import { GetHelloUseCase } from "../domain/usecase/GetHelloUseCase";
import { GetDetailUseCaseImpl } from "../domain/usecase/implementation/GetDetailUseCaseImpl";
import { GetHelloUseCaseImpl } from "../domain/usecase/implementation/GetHelloUseCaseImpl";
import DetailViewModel from "../presentation/viewmodel/DetailViewModel";
import { HelloViewModel } from "../presentation/viewmodel/HelloViewModel";
import { GET_DETAIL_USE_CASE_ID, GET_HELLO_USE_CASE_ID, HELLO_DATA_SOURCE_ID, HELLO_REPOSITORY_ID } from "./HelloContainerKey";



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

helloContainer.bind<GetDetailUseCase>(GET_DETAIL_USE_CASE_ID)
    .to(GetDetailUseCaseImpl)


/**
 * Presentation
 */

helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()
helloContainer.bind<Factory<DetailViewModel>>(DetailViewModel).toFactory((context) => {
    return (id: number) => {
        const useCase = context.get<GetDetailUseCase>(GET_DETAIL_USE_CASE_ID)
        return new DetailViewModel(id, useCase);
    };
});

export { helloContainer };
