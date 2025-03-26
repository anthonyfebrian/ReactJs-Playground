import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { GetHelloUseCase } from "../../domain/usecase/GetHelloUseCase";
import { cloneClass } from "../../utils/CloneClass";
import { HelloUiState } from "../uistate/HelloUiState";

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
        const uiState = cloneClass(this._uiState.getValue());

        this.subscription?.unsubscribe()

        this. subscription = this.useCase.invoke().subscribe((data) => {
            
            uiState.title = data
            this._uiState.next(uiState)
        })
    }

    dispose() {
        console.log("Dispose HelloViewModel")
        this.subscription?.unsubscribe()
        this.subscription = null
    }
}

