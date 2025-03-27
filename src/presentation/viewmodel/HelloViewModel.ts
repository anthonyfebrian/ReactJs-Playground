import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { GetHelloUseCase } from "../../domain/usecase/GetHelloUseCase";
import { HelloUiState } from "../uistate/HelloUiState";
import { ResultSuccess } from "../../core/data/Result";

@injectable()
export class HelloViewModel {
    private _uiState = new BehaviorSubject(
        new HelloUiState(
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

            if(result instanceof ResultSuccess) {
                this._uiState.next({
                    ... this._uiState.getValue(),
                    title: result.data
                })    
            }
        })
    }

    dispose() {
        console.log("Dispose HelloViewModel")
        this.subscription?.unsubscribe()
        this.subscription = null
    }
}

