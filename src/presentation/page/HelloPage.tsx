import { useEffect, useState } from "react";
import { helloContainer } from "../../di/HelloContainer";
import MyButton from "../../MyButton";
import { HelloUiState } from "../uistate/HelloUiState";
import { HelloViewModel } from "../viewmodel/HelloViewModel";

function HelloPage(
    {
        viewModel = helloContainer.get(HelloViewModel),
        navToDetail,
    }: HelloPageProps
) {
    const [vm] = useState(viewModel);
    const [uiState, setUiState] = useState<HelloUiState>(new HelloUiState());

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

    return (
        <div>
            <h1>{uiState.title}</h1>
            <MyButton
                text="oke"
                disabled={false}
                onClick={function (): void {
                    vm.onButtonClicked()
                }}
            />

            <MyButton
                text="Nav to detail"
                onClick={function (): void {
                    navToDetail(13579)
                }}
            />
        </div>

    )
}

interface HelloPageProps {
    viewModel?: HelloViewModel,
    navToDetail: (id: number) => void,
}

export default HelloPage;