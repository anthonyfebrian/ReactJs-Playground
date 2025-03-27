import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { GetHelloUseCase } from "../../domain/usecase/GetHelloUseCase";
import { HelloUiState, HelloUiStateLoading, HelloUiStateSuccess } from "../uistate/HelloUiState";
import { ResultLoading, ResultSuccess } from "../../core/data/Result";

@injectable()
export class HelloViewModel {
    private _uiState = new BehaviorSubject<HelloUiState>(
        new HelloUiStateSuccess(
            "Hello Page viewmodel.tsx"
        )
    );
    public readonly uiState: Observable<HelloUiState> = this._uiState.asObservable();

    private subscription: Subscription | null = null

    constructor(
        @inject(HelloContainerKey.GET_HELLO_USE_CASE_ID) private useCase: GetHelloUseCase
    ) { }

    async onButtonClicked() {
        this.subscription?.unsubscribe()

        this. subscription = this.useCase.invoke().subscribe((result) => {
            console.log("HelloViewModel", result)

            if(result instanceof ResultLoading) {
                this._uiState.next(new HelloUiStateLoading())
            }

            if(result instanceof ResultSuccess) {
                this._uiState.next(new HelloUiStateSuccess(result.data))    
            }
        })
    }

    dispose() {
        console.log("Dispose HelloViewModel")
        this.subscription?.unsubscribe()
        this.subscription = null
    }
}

