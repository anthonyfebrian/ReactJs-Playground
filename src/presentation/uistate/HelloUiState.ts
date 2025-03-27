
abstract class HelloUiState { }

class HelloUiStateLoading extends HelloUiState { }

class HelloUiStateSuccess extends HelloUiState {
    constructor(public title: string) { super() }
}

export { HelloUiState , HelloUiStateLoading, HelloUiStateSuccess}