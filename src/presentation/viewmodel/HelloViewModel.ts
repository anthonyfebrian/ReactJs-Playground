import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";
import { HelloDataSource } from "../../data/remote/datasource/HelloDataSource";
import { HelloUiState } from "../uistate/HelloUiState";

@injectable()
export class HelloViewModel {
    private _uiState = new BehaviorSubject(
        new HelloUiState(
            "Hello Page viewmodel.tsx"
        )
    );
    public readonly uiState: Observable<HelloUiState> = this._uiState.asObservable();

    constructor(
        @inject('HelloDataSource') private dataSource: HelloDataSource,
    ) { }

    async onButtonClicked() {
        const uiState = this._uiState.getValue();

        this._uiState.next(uiState.copy({
            title: await this.dataSource.getHello()
        }));

        console.log("Button clicked");
    }
}

