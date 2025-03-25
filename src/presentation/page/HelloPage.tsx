import React, { useEffect, useState } from "react";
import MyButton from "../../MyButton";
import { HelloUiState } from "../uistate/HelloUiState";
import { HelloViewModel } from "../viewmodel/HelloViewModel";

const vm: HelloViewModel = new HelloViewModel();

function HelloPage(
) {
    
    const [uiState, setUiState] = useState<HelloUiState>(new HelloUiState());

    useEffect(() => {
        const subs = vm.uiState.subscribe((uiState) => {
            console.log("Changes in HelloPage", uiState)
            setUiState(uiState)
        });

        return () => subs.unsubscribe()
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

export default HelloPage;