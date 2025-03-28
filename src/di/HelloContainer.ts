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
import { HelloContainerKey } from "./HelloContainerKey";
import { LoginViewModel } from "../presentation/viewmodel/LoginViewModel";



const helloContainer = new Container()

/**
 * Data
 */
helloContainer.bind<HelloDataSource>(HelloContainerKey.HELLO_DATA_SOURCE_ID)
    .to(HelloDataSourceImpl)
    .inSingletonScope()

/**
 * Domain
 */

helloContainer.bind<HelloRepository>(HelloContainerKey.HELLO_REPOSITORY_ID)
    .to(HelloRepositoryImpl)
    .inSingletonScope()

helloContainer.bind<GetHelloUseCase>(HelloContainerKey.GET_HELLO_USE_CASE_ID)
    .to(GetHelloUseCaseImpl)

helloContainer.bind<GetDetailUseCase>(HelloContainerKey.GET_DETAIL_USE_CASE_ID)
    .to(GetDetailUseCaseImpl)


/**
 * Presentation
 */

helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()
helloContainer.bind<Factory<DetailViewModel>>(DetailViewModel).toFactory((context) => {
    return (id: number) => {
        const useCase = context.get<GetDetailUseCase>(HelloContainerKey.GET_DETAIL_USE_CASE_ID)
        return new DetailViewModel(id, useCase);
    };
});
helloContainer.bind<LoginViewModel>(LoginViewModel).toSelf()

export { helloContainer };
