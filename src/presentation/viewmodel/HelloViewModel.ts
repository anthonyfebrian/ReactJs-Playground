import { BehaviorSubject, Observable } from "rxjs";
import { HelloUiState } from "../uistate/HelloUiState";
import { injectable } from "inversify";

@injectable()
export class HelloViewModel {
    private _uiState = new BehaviorSubject(
        new HelloUiState(
            "Hello Page viewmodel.tsx"
        )
    );
    public readonly uiState: Observable<HelloUiState> = this._uiState.asObservable();

    constructor() {
        console.log("HelloViewModel created");
    }

    onButtonClicked() {
        const uiState = this._uiState.getValue();

        this._uiState.next(uiState.copy({
            title: "Button clicked git",
        }));

        console.log("Button clicked");
    }
}

