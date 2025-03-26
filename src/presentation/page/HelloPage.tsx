import React, { useEffect, useState } from "react";
import MyButton from "../../MyButton";
import { HelloUiState } from "../uistate/HelloUiState";
import { HelloViewModel } from "../viewmodel/HelloViewModel";
import { helloContainer } from "../../di/HelloContainer";

function HelloPage(
    {
        viewModel = helloContainer.get(HelloViewModel)
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
            <MyButton text="oke" disabled={false} onClick={function (): void {
                vm.onButtonClicked()
            }} />
        </div>

    )
}

interface HelloPageProps {
    viewModel?: HelloViewModel
}

export default HelloPage;