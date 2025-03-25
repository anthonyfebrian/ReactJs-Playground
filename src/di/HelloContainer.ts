import { Container } from "inversify";
import { HelloViewModel } from "../presentation/viewmodel/HelloViewModel";
import { HelloDataSource } from "../data/remote/datasource/HelloDataSource";
import { HelloDataSourceImpl } from "../data/remote/datasource/implementation/HelloDataSourceImpl";
import { HelloRepository } from "../domain/repository/HelloRepository";
import { HelloRepositoryImpl } from "../data/repository/HelloRepositoryImpl";



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

/**
 * Presentation
 */

helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()

export { helloContainer }