import { Container } from "inversify";
import { HelloViewModel } from "../presentation/viewmodel/HelloViewModel";
import { HelloDataSource } from "../data/remote/datasource/HelloDataSource";
import { HelloDataSourceImpl } from "../data/remote/datasource/implementation/HelloDataSourceImpl";
import { HelloRepository } from "../domain/repository/HelloRepository";
import { HelloRepositoryImpl } from "../data/repository/HelloRepositoryImpl";
import { GetHelloUseCase } from "../domain/usecase/GetHelloUseCase";
import { GetHelloUseCaseImpl } from "../domain/usecase/implementation/GetHelloUseCaseImpl";



const helloContainer = new Container()

/**
 * Data
 */
helloContainer.bind<HelloDataSource>('HelloDataSource')
.to(HelloDataSourceImpl)
.inSingletonScope()

/**
 * Domain
 */

helloContainer.bind<HelloRepository>('HelloRepository')
.to(HelloRepositoryImpl)
.inSingletonScope()

helloContainer.bind<GetHelloUseCase>('GetHelloUseCase')
.to(GetHelloUseCaseImpl)


/**
 * Presentation
 */

helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()

export { helloContainer }