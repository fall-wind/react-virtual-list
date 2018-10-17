import * as React from 'react';
import { VListProps, VListState, VListItemProps } from './types';

require('./index.styl');

const defaultProps = {
    rowHeight: 30,
};

class VirtualList extends React.Component<VListProps, VListState> {
    constructor(props: VListProps) {
        super(props);
        this.state = {
            visibleData: [],
            startIndex: 0,
            stopIndex: 0,
        };
    }

    static CommonList: any

    static defaultProps = defaultProps;

    contentRef: any;

    scrollContainerRef: any;

    componentDidMount() {
        this.updateVisibleData();
    }

    getContentHeight = () => {
        const { rowHeight, dataSource } = this.props;
        let contentHeight = 0;
        if (typeof rowHeight === 'function') {
            contentHeight = dataSource.reduce((pre, cur, index) => pre + rowHeight(cur, index), 0);
        } else {
            contentHeight = (rowHeight || 30) * dataSource.length;
        }
        return contentHeight;
    };

    // getItemHeight = (record, index) => {
    //     const {} = this.props
    // }

    updateVisibleData = (scrollTop?: number) => {
        const { dataSource, height } = this.props;
        const {
            visibleData: preData,
            startIndex: preStartIndex,
            stopIndex: preStopIndex,
        } = this.state;
        scrollTop = scrollTop || 0;
        const visibleCount = Math.ceil(height / defaultProps.rowHeight);
        const startIndex = Math.floor(scrollTop / defaultProps.rowHeight);
        const stopIndex = startIndex + visibleCount;
        const visibleData = dataSource.slice(startIndex, stopIndex);
        // console.error(dataSource, endIndex, this.scrollContainerRef.scrollTop, visibleData)
        if (visibleData === preData && preStartIndex === startIndex && stopIndex === preStopIndex) {
            return;
        }
        this.setState(
            {
                visibleData,
                startIndex,
                stopIndex,
            },
            () => {
                if (this.contentRef) {
                    this.contentRef.style.webkitTransform = `translate3d(0, ${startIndex *
                        defaultProps.rowHeight}px, 0)`;
                }
            }
        );
    };

    onScroll = (e: any) => {
        if (e.target === this.scrollContainerRef) {
            this.handleScrollEvent(e.target);
        }
    };

    setContentRef = (ref: any) => {
        this.contentRef = ref;
    };

    setScrollContainerRef = (ref: any) => {
        this.scrollContainerRef = ref;
    };

    handleScrollEvent = (target: any) => {
        const { scrollTop } = target;
        this.updateVisibleData(scrollTop);
    };

    render() {
        const { height, width } = this.props;
        const { visibleData } = this.state;
        return (
            <div
                onScroll={this.onScroll}
                ref={this.setScrollContainerRef}
                style={{ height, width }}
                className="v-list-warp"
            >
                <div className="v-list-phantom" style={{ height: this.getContentHeight() }} />
                <div className="v-list-content" ref={this.setContentRef}>
                    {visibleData.map(it => (
                        <div style={{ height: 30 }} key={it.key} className="vlist-item">
                            {it.value}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

class CommonList extends React.Component<VListProps, any> {
    render() {
        const { height, width, dataSource } = this.props;

        return (
            <div style={{ height, width }} className="v-list-warp">
                <div className="v-list-phantom" />
                <div className="v-list-content">
                    {dataSource.map(it => (
                        <div style={{ height: 30 }} key={it.key} className="vlist-item">
                            {it.value}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

VirtualList.CommonList = CommonList

export default VirtualList;
