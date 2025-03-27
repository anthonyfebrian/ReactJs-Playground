import { useEffect, useState } from "react";
import { helloContainer } from "../../di/HelloContainer";
import MyButton from "../../MyButton";
import { HelloUiState, HelloUiStateLoading, HelloUiStateSuccess } from "../uistate/HelloUiState";
import { HelloViewModel } from "../viewmodel/HelloViewModel";

interface HelloPageProps {
    viewModel?: HelloViewModel,
    navToDetail: (id: number) => void,
}

function HelloPage({
    viewModel = helloContainer.get(HelloViewModel),
    navToDetail,
}: HelloPageProps) {
    const [vm] = useState(viewModel);
    const [uiState, setUiState] = useState<HelloUiState | null>(null);

    useEffect(() => {
        const subs = vm.uiState.subscribe((uiState) => {
            console.log("Changes in HelloPage", uiState)
            setUiState(uiState)
        });

        return () => {
            subs.unsubscribe()
            vm.dispose()
        }
    }, [vm]);

    if (uiState == null) {
        return (<div>
            <h1>Null</h1>
        </div>)
    }

    return (
        <HelloContent
            uiState={uiState}
            onClik={() => vm.onButtonClicked()}
            onClickNav={navToDetail} />
    )



}

interface HelloContentProps {
    uiState: HelloUiState
    onClik: () => void
    onClickNav: (id: number) => void
}

function HelloContent({
    uiState,
    onClik,
    onClickNav
}: HelloContentProps) {

    if (uiState instanceof HelloUiStateLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HelloSuccess
                uiState={uiState as HelloUiStateSuccess}
                onClik={onClik}
                onClickNav={onClickNav} />
        </div>
    )
}

function HelloSuccess({
    uiState,
    onClik,
    onClickNav,
}: HelloSuccessProps) {
    return (
        <div>
            <h1>{uiState.title}</h1>
            <MyButton
                text="oke"
                disabled={false}
                onClick={onClik}
            />

            <MyButton
                text="Nav to detail"
                onClick={function (): void {
                    onClickNav(1234)
                }}
            />
        </div>
    )
}
interface HelloSuccessProps {
    uiState: HelloUiStateSuccess
    onClik: () => void
    onClickNav: (id: number) => void
}

export default HelloPage;