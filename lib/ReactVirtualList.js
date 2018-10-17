(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global.ReactVirtualList = factory(global.React));
}(this, (function (React) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".v-list-warp {\n    overflow: auto;\n    position: relative;\n    border: 1px solid #aaa;\n}\n\n.v-list-phantom {\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    z-index: -1;\n}\n\n.v-list-content {\n    left: 0;\n    right: 0;\n    top: 0;\n    position: absolute;\n}\n\n.v-list-item {\n    padding: 5px;\n    color: #666;\n    line-height: 30px;\n    box-sizing: border-box;\n}";
  styleInject(css);

  const defaultProps = {
      rowHeight: 30
  };
  class VirtualList extends React.Component {
      constructor(props) {
          super(props);
          this.getContentHeight = () => {
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
          this.updateVisibleData = scrollTop => {
              const { dataSource, height } = this.props;
              const { visibleData: preData, startIndex: preStartIndex, stopIndex: preStopIndex } = this.state;
              scrollTop = scrollTop || 0;
              const visibleCount = Math.ceil(height / defaultProps.rowHeight);
              const startIndex = Math.floor(scrollTop / defaultProps.rowHeight);
              const stopIndex = startIndex + visibleCount;
              const visibleData = dataSource.slice(startIndex, stopIndex);
              // console.error(dataSource, endIndex, this.scrollContainerRef.scrollTop, visibleData)
              if (visibleData === preData && preStartIndex === startIndex && stopIndex === preStopIndex) {
                  return;
              }
              this.setState({
                  visibleData,
                  startIndex,
                  stopIndex
              }, () => {
                  if (this.contentRef) {
                      this.contentRef.style.webkitTransform = `translate3d(0, ${startIndex * defaultProps.rowHeight}px, 0)`;
                  }
              });
          };
          this.onScroll = e => {
              if (e.target === this.scrollContainerRef) {
                  this.handleScrollEvent(e.target);
              }
          };
          this.setContentRef = ref => {
              this.contentRef = ref;
          };
          this.setScrollContainerRef = ref => {
              this.scrollContainerRef = ref;
          };
          this.handleScrollEvent = target => {
              const { scrollTop } = target;
              this.updateVisibleData(scrollTop);
          };
          this.state = {
              visibleData: [],
              startIndex: 0,
              stopIndex: 0
          };
      }
      componentDidMount() {
          this.updateVisibleData();
      }
      render() {
          const { height, width } = this.props;
          const { visibleData } = this.state;
          return React.createElement("div", { onScroll: this.onScroll, ref: this.setScrollContainerRef, style: { height, width }, className: "v-list-warp" }, React.createElement("div", { className: "v-list-phantom", style: { height: this.getContentHeight() } }), React.createElement("div", { className: "v-list-content", ref: this.setContentRef }, visibleData.map(it => React.createElement("div", { style: { height: 30 }, key: it.key, className: "vlist-item" }, it.value))));
      }
  }
  VirtualList.defaultProps = defaultProps;
  class CommonList extends React.Component {
      render() {
          const { height, width, dataSource } = this.props;
          return React.createElement("div", { style: { height, width }, className: "v-list-warp" }, React.createElement("div", { className: "v-list-phantom" }), React.createElement("div", { className: "v-list-content" }, dataSource.map(it => React.createElement("div", { style: { height: 30 }, key: it.key, className: "vlist-item" }, it.value))));
      }
  }
  VirtualList.CommonList = CommonList;

  return VirtualList;

})));
