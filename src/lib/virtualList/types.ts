export interface VListItemProps {
    key: string;
    value: string;
}

export interface VListProps {
    rowHeight?: number | ((record: any, index: number) => number);
    dataSource: Array<VListItemProps>;
    height: number;
    width: number;
}

export interface VListState {
    startIndex: number;
    stopIndex: number;
    visibleData: Array<VListItemProps>;
}
