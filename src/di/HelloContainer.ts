import { Container } from "inversify";
import { HelloViewModel } from "../presentation/viewmodel/HelloViewModel";
import { HelloDataSource } from "../data/remote/datasource/HelloDataSource";
import { HelloDataSourceImpl } from "../data/remote/datasource/implementation/HelloDataSourceImpl";

const helloContainer = new Container()

helloContainer.bind<HelloDataSource>('HelloDataSource')
.to(HelloDataSourceImpl)
.inSingletonScope()

helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()

export { helloContainer }