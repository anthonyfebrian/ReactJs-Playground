
export class HelloUiState {
    constructor(
        public title: string = "Hello Page from uistate .tsx",
    ) { }

    copy({
        title = this.title
    }) {
        return new HelloUiState(
            title,
        );
    }
}