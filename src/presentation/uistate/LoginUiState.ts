
type LoginUiState = {
    email: string
    password: string
}

function initLoginUiState(): LoginUiState {
    return {
        email: "",
        password: ""
    }
}

export { LoginUiState, initLoginUiState }