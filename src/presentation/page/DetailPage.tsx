import { Factory } from "inversify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { helloContainer } from "../../di/HelloContainer";
import { DetailUiState } from "../uistate/DetailUiState";
import DetailViewModel from "../viewmodel/DetailViewModel";


function DetailPage({
    viewModel
}: DetailPageProps) {
    // Get the id from the URL
    const { id } = useParams();

    // Get the factory from the container then create the view model
    const factory = helloContainer.get<Factory<DetailViewModel>>(DetailViewModel);
    const [vm] = useState(viewModel ?? factory(id));

    const [uiState, setUiState] = useState(new DetailUiState(-1));

    //
    useEffect(() => {
        const subs = vm.uiState.subscribe((uiState) => {
            setUiState(uiState)
        });

        return () => {
            subs.unsubscribe()
            vm.dispose()
        }
    }, [vm]);

    // useEffect(() => {
    //     vm.getDetail()
    //     return () => { }
    // }, [])

    return (
        <div>
            <h1>{uiState.title}</h1>
            <input
                type="text"
                onChange={(e) => {
                    const input = e.target.value
                    vm.onInputChanged(input)
                }}></input>
            <h2>{uiState.input}</h2>
        </div>

    )
}

interface DetailPageProps {
    viewModel?: DetailViewModel
}

export default DetailPage;