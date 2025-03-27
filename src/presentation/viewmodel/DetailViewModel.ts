import { GetDetailUseCase } from "@/domain/usecase/GetDetailUseCase";
import { injectable } from "inversify";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { DetailUiState } from "../uistate/DetailUiState";

@injectable()
class DetailViewModel {
    private _uiState!: BehaviorSubject<DetailUiState>;
    public readonly uiState!: Observable<DetailUiState>;

    private subscription: Subscription | null = null
    constructor(
        id: number,
        private useCase: GetDetailUseCase
    ) {
        console.log("DetailViewModel created")
        this._uiState = new BehaviorSubject(new DetailUiState(id));
        this.uiState = this._uiState.asObservable();

        this.getDetail()
    }

    async getDetail() {
        console.log("getDetail")
        const uiState = {
            ...this._uiState.getValue(),
        }
        

        this.subscription?.unsubscribe()

        this.subscription = this.useCase.invoke(uiState.id).subscribe((data) => {
            this._uiState.next(
                {
                    ...this._uiState.getValue(),
                    title: data
                }
            )
        })
    }

    onInputChanged(input: string) {
        const uiState = {
            ...this._uiState.getValue(),
            input: input
        }
        this._uiState.next(uiState)
    }

    dispose() {
        this.subscription?.unsubscribe()
    }
}

export default DetailViewModel