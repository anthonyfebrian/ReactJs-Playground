import { injectable } from "inversify";
import { create } from "mutative";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { GetDetailUseCase } from "../../domain/usecase/GetDetailUseCase";
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
        const uiState = {
            ...this._uiState.getValue(),
        }


        this.subscription?.unsubscribe()

        this.subscription = this.useCase.invoke(uiState.id).subscribe((data) => {
            const newUiState = create(uiState, (draft) => {
                draft.title = data
            }, { mark: () => 'immutable' })
            this._uiState.next(newUiState)
        })
    }

    onInputChanged(input: string) {
        const uiState: DetailUiState = this._uiState.getValue()
        const newUiState = create(uiState, (draft) => {
            draft.input = input
        }, { mark: () => 'immutable' })

        this._uiState.next(newUiState)
    }

    dispose() {
        this.subscription?.unsubscribe()
    }
}

export default DetailViewModel