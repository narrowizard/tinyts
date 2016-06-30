interface ISortableConfig {
    containerSelector: string,
    itemPath: string,
    itemSelector: string,
    placeholder: string,
    afterMove?: () => void,
    stop: (event, ui) => void
}

interface JQuery {
    sortable(config?: ISortableConfig);
}
