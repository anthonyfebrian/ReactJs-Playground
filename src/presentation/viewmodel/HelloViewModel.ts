import { GetHelloUseCase } from "../../domain/usecase/GetHelloUseCase";
import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";
import { HelloUiState } from "../uistate/HelloUiState";
import { GET_HELLO_USE_CASE_ID } from "../../di/HelloContainerKey";

@injectable()
export class HelloViewModel {
    private _uiState = new BehaviorSubject(
        new HelloUiState(
            "Hello Page viewmodel.tsx"
        )
    );
    public readonly uiState: Observable<HelloUiState> = this._uiState.asObservable();

    constructor(
        @inject(GET_HELLO_USE_CASE_ID) private useCase: GetHelloUseCase
    ) { }

    async onButtonClicked() {
        const uiState = this._uiState.getValue();

        this.useCase.invoke().subscribe((data) => {
            this._uiState.next(uiState.copy({
                title:  data
            }));
        })
    }
}

