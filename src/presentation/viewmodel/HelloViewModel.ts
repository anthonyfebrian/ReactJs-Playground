import { HelloRepository } from "@/domain/repository/HelloRepository";
import { inject, injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";
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
        @inject('HelloRepository') private repository: HelloRepository,
    ) { }

    async onButtonClicked() {
        const uiState = this._uiState.getValue();

        this.repository.getHello().subscribe((data) => {
            this._uiState.next(uiState.copy({
                title:  data
            }));
        })

        console.log("Button clicked");
    }
}

