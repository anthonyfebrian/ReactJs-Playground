import { Container } from "inversify";
import { HelloViewModel } from "../presentation/viewmodel/HelloViewModel";

const helloContainer = new Container()
helloContainer.bind<HelloViewModel>(HelloViewModel).toSelf()

export { helloContainer }