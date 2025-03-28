import { inject, injectable } from "inversify";
import { create } from "mutative";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginUiState, initLoginUiState } from "../uistate/LoginUiState";
import { HelloContainerKey } from "../../di/HelloContainerKey";
import { LoginUseCase } from "../../domain/usecase/LoginUseCase";

@injectable()
export class LoginViewModel {
    private _uiState = new BehaviorSubject<LoginUiState>(initLoginUiState());
    public readonly uiState: Observable<LoginUiState> = this._uiState.asObservable();

    constructor(
        @inject(HelloContainerKey.LOGIN_USE_CASE_ID) private useCase: LoginUseCase
    ) { }

    onEmailChange(email: string) {
        const uiState = this._uiState.getValue()
        const newUiState = create(uiState, (draft) => {
            draft.email = email
        })
        this._uiState.next(newUiState)
    }

    onPasswordChange(password: string) {
        const uiState = this._uiState.getValue()
        const newUiState = create(uiState, (draft) => {
            draft.password = password
        })
        this._uiState.next(newUiState)
    }
}