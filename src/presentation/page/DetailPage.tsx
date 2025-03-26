import { helloContainer } from "../../di/HelloContainer";
import { Factory } from "inversify";
import { useParams } from "react-router-dom";
import DetailViewModel from "../viewmodel/DetailViewModel";
import { useEffect, useState } from "react";
import { DetailUiState } from "../uistate/DetailUiState";


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
            console.log("Changes in DetailPage", uiState)
            setUiState(uiState)
        });

        return () => {
            subs.unsubscribe()
            vm.dispose()
        }
    }, [vm]);

    return (<h1>Detail Page {uiState.title}</h1>)
}

interface DetailPageProps {
    viewModel?: DetailViewModel
}

export default DetailPage;