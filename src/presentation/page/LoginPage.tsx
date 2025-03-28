import { useEffect, useState } from "react";
import { helloContainer } from "../../di/HelloContainer";
import { LoginUiState } from "../uistate/LoginUiState";
import { LoginViewModel } from "../viewmodel/LoginViewModel";


interface LoginProps {
    viewModel?: LoginViewModel
}
function LoginPage({
    viewModel = helloContainer.get(LoginViewModel)
}: LoginProps) {
    const [vm] = useState(viewModel);
    const [uiState, setUiState] = useState<LoginUiState | null>(null)

    useEffect(() => {
        const subs = vm.uiState.subscribe((newUiState) => {
            console.log("new uistate", newUiState)

            setUiState(newUiState)
        })

        return () => {
            subs.unsubscribe()
        }
    }, [vm])

    if (uiState != null) {
        return (
            <LoginContent
                uiState={uiState}
                onEmailChange={(email) => {
                    vm.onEmailChange(email)
                }}
                onPasswordChange={(password) => {
                    vm.onPasswordChange(password)
                }}
            />
        )
    }

    return (<div />)
}

interface LoginContentProps {
    uiState: LoginUiState,
    onEmailChange: (email: string) => void
    onPasswordChange: (password: string) => void
}
function LoginContent(props: LoginContentProps) {

    return (<div>
        <h1>Hello from LoginContent</h1>
        <form>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={props.uiState.email}
                    onChange={(e) => props.onEmailChange(e.target.value)}
                />
                {props.uiState.email && (
                    <button
                        type="button"
                        onClick={(e) => { props.onEmailChange("") }}
                        style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            fontSize: "16px",
                        }}
                    >❌</button>
                )}

            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={props.uiState.password}
                    onChange={(e) => props.onPasswordChange(e.target.value)}
                />
                {props.uiState.password && (
                    <button
                        type="button"
                        onClick={(e) => { props.onPasswordChange("") }}
                        style={{
                            marginLeft: "10px",
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            fontSize: "16px",
                        }}
                    >❌</button>
                )}
            </div>
        </form>
    </div>)
}

export default LoginPage