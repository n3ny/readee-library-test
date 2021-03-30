import React, { useRef, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-multi-carousel';
import { useFullScreenHandle, FullScreen } from 'react-full-screen';
import HTMLFlipBook from 'react-pageflip';
import RangeSlider from 'react-bootstrap-range-slider';
import btnNext from './btnNext~KFWoJnpD.png';
import btnPrev from './btnPrevPage~BSVBbfnU.png';
import btnSearch from './btnSearch~DLNMBOGf.png';
import fullscreen from './btnFullscreen~KzGfHZvw.png';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'react-multi-carousel/lib/styles.css';

var stylesPage = {"area-zoom":"_2LZes","area-page":"_3hE4h","page":"_22Kko","page-content":"_20SI2","body-page":"_2ka3f","page--left":"_4d9I9","page-cover":"_1BmcO"};

var Page = React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement("div", {
    className: stylesPage["page"],
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: stylesPage["page-content"]
  }, /*#__PURE__*/React.createElement("div", {
    className: stylesPage["area-page"]
  }, props.children)));
});
var Page$1 = React.memo(Page);

var stylesCover = {"page":"_X30Wy","page-content":"_34xT-","page--left":"_3jDOj","page-cover":"_1442s","body-cover":"_3vNjz"};

var PageCover = React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement("div", {
    className: stylesCover["page"],
    ref: ref,
    "data-density": "soft"
  }, /*#__PURE__*/React.createElement("div", {
    className: stylesCover["page-content"]
  }, props.children));
});

var styles = {"container":"_3LI8S","arrow-right":"_vXkK8","arrow-left":"_3Ux7A"};

var styles$1 = {"actions-bar":"_11RDM","container-controls":"_3G_XH","form-control":"_2_kMD","range-slider-section":"_35tfT","full-screen-section":"_1j8nc","pagination-section":"_36IKj","btn-prev":"_JJQ1C","btn-next":"_3pr_k","span-total-pages":"_h96ct","btn-search":"_1btDp"};

var styles$2 = {"container-loading":"_3whpy","container-progress":"_1wLg8","container-progress-opacity":"_FLJi8","loading":"_32ru3"};

var styles$3 = {"carousel-container":"_2-4Ba","react-multi-carousel-list":"_11WD_","react-multi-carousel-item":"_tc2dk","react-multi-carousel-track":"_1g1RT","thumbnail":"_1fPuB","thumbnail-container":"_1hr-r","slider-section":"_1N9S0","thumbnail-img":"_2UnAW","arrow-right":"_2e6gI","arrow-left":"_2b0M1"};

function FlipPages(props) {
  var flipBook = useRef(null);

  var assigRef = function assigRef(ref) {
    flipBook = ref;

    if (flipBook) {
      props.assigRef(flipBook);
    }
  };

  useEffect(function () {
    if (!navigator.maxTouchPoints && props.page === 0) {
      document.getElementById("container").style.transform = "translateX(-13.4%)";
    } else if (props.page === props.totalPage - 1) {
      document.getElementById("container").style.transform = "translateX(13.4%)";
    } else {
      document.getElementById("container").style.transform = "translateX(0%)";
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "container",
    className: styles["container"]
  }, !navigator.maxTouchPoints && props.page !== 0 && /*#__PURE__*/React.createElement("a", {
    onClick: props.prevButtonClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles["arrow-left"]
  })), /*#__PURE__*/React.createElement(HTMLFlipBook, {
    width: props.size.width,
    height: props.size.height,
    showCover: true,
    maxShadowOpacity: 0.5,
    swipeDistance: 30,
    onFlip: props.handleCarrousel,
    useMouseEvents: true,
    flipNext: {
      corner: ['top', 'bottom']
    },
    ref: assigRef,
    mobileScrollSupport: true
  }, /*#__PURE__*/React.createElement(PageCover, null, /*#__PURE__*/React.createElement("div", {
    className: stylesCover["body-cover"],
    style: {
      backgroundImage: "url(" + props.book[0] + ")"
    }
  })), props.flipbookPages.map(props.pagesFlipbook), /*#__PURE__*/React.createElement(PageCover, null, /*#__PURE__*/React.createElement("div", {
    className: stylesCover["body-cover"],
    style: {
      backgroundImage: "url(" + props.book[props.book.length - 1] + ")"
    }
  }))), !navigator.maxTouchPoints && props.page !== props.totalPage - 1 && /*#__PURE__*/React.createElement("a", {
    onClick: props.nextButtonClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles["arrow-right"]
  })));
}

var MAXSCALE = 5;
var MINSCALE = 1;
var SCALABILITY = 0.1;

function ActionsMenu(props) {
  var _useState = useState(1),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState({}),
      search = _useState2[0],
      setSearch = _useState2[1];

  var scalability_ = 1;
  var _scrollTimeout = null;
  var node;
  var rotation = 0;
  var posX = 0;
  var posY = 0;
  node = document.getElementById('container');

  var render = function render() {
    window.requestAnimationFrame(function () {
      var val = "translate3D(" + posX + "px, " + posY + "px, 0px) rotate(" + rotation + "deg) scale(" + value + ")";
      document.getElementById('container').style.transform = val;
    });
  };

  var object = document.getElementsByClassName("bg-img-page");

  if (object.length > 0) {
    for (var key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        var element = object[key];
        element.addEventListener("click", function (event) {
          event.stopPropagation();
          console.log("click-zoom", event);

          if (event.target.className === "area-zoom") {
            console.log("area-zoom", event);
          }
        });
      }
    }
  }

  document.addEventListener("mousewheel", function (event) {
    console.log("wheel");

    if (event.ctrlKey == true) {
      event.preventDefault();

      if (event.deltaY > 0) {
        scalability_ -= 0.1;

        if (scalability_ >= MINSCALE && scalability_ <= MAXSCALE) {
          console.log('Down', scalability_);
          var Page = document.getElementById('container');
          Page.style.transform = "scale(" + scalability_ + ")";
        }
      } else {
        scalability_ += 0.1;

        if (scalability_ >= MINSCALE && scalability_ <= MAXSCALE) {
          console.log('Up', scalability_);
          var Page = document.getElementById('container');
          Page.style.transform = "scale(" + scalability_ + ")";
        }
      }

      clearTimeout(_scrollTimeout);
      _scrollTimeout = setTimeout(function () {
        console.log("zoom", scalability_);
        setValue(scalability_);
        props.onHandleScale(scalability_);
      }, 250);
    } else {
      posX -= event.deltaX * 2;
      posY -= event.deltaY * 2;
      render();
    }
  }, {
    passive: false
  });
  document.addEventListener("DOMMouseScroll", function (event) {
    console.log("wheel");

    if (event.ctrlKey == true) {
      event.preventDefault();

      if (event.detail > 0) {
        scalability_ -= 0.1;

        if (scalability_ >= MINSCALE && scalability_ <= MAXSCALE) {
          console.log('Down', scalability_);
          var Page = document.getElementById('container');
          Page.style.transform = "scale(" + scalability_ + ")";
        }
      } else {
        scalability_ += 0.1;

        if (scalability_ >= MINSCALE && scalability_ <= MAXSCALE) {
          console.log('Up', scalability_);
          var Page = document.getElementById('container');
          Page.style.transform = "scale(" + scalability_ + ")";
        }
      }
    }
  }, {
    passive: false
  });

  var zoomInOut = function zoomInOut(changeEvent) {
    console.log("timer");
    var scale = changeEvent.target.value;

    if (scale >= MINSCALE && scale <= MAXSCALE) {
      var Page = document.getElementById('container');
      Page.style.transform = "scale(" + scale + ")";
      console.log("zoomSlide", scale);
      setValue(scale);
      props.onHandleScale(scale);
    }
  };

  var handleFullScreen = function handleFullScreen() {
    if (props.onFullScreen) {
      props.onFullScreen();
    }
  };

  var currentPages = props.currentPage === 0 || parseInt(props.currentPage) + 1 === parseInt(props.totalPages) ? parseInt(props.currentPage) + 1 : parseInt(props.currentPage) + 1 + " - " + (parseInt(props.currentPage) + 2);

  var handleChange = function handleChange(event) {
    var _data;

    var data = (_data = {}, _data[event.target.name] = event.target.value, _data);
    setSearch(data);
  };

  var handleSubmit = function handleSubmit(target) {
    if (target.key === 'Enter' || !!!target.key) {
      if (props.onHandleSearch) {
        props.onHandleSearch(search);
        setSearch({});
        document.getElementById('searchForm').reset();
      }
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles$1["actions-bar"]
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1["container-controls"]
  }, /*#__PURE__*/React.createElement("form", {
    className: "row",
    id: "searchForm",
    autoComplete: "off"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$1["range-slider-section"]
  }, /*#__PURE__*/React.createElement(RangeSlider, {
    value: value,
    tooltip: "off",
    size: "sm",
    variant: "light",
    min: MINSCALE,
    max: MAXSCALE,
    step: SCALABILITY,
    onChange: zoomInOut
  })), /*#__PURE__*/React.createElement("a", {
    className: styles$1["full-screen-section"],
    onClick: handleFullScreen
  }, /*#__PURE__*/React.createElement("img", {
    src: fullscreen,
    width: "15px"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$1["pagination-section"]
  }, /*#__PURE__*/React.createElement("a", {
    className: styles$1["btn-prev"],
    onClick: props.onHandlePrev
  }, /*#__PURE__*/React.createElement("img", {
    src: btnPrev,
    width: "15px"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: styles$1["form-control"],
    id: "currentPages",
    name: "page",
    placeholder: currentPages,
    onChange: handleChange,
    onKeyDown: handleSubmit
  }), /*#__PURE__*/React.createElement("span", {
    className: styles$1["span-total-pages"]
  }, " /  " + props.totalPages), /*#__PURE__*/React.createElement("a", {
    className: styles$1["btn-next"],
    onClick: props.onHandleNext
  }, /*#__PURE__*/React.createElement("img", {
    src: btnNext,
    width: "15px"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: styles$1["form-control"],
    id: "inputSeach",
    name: "words",
    placeholder: "Search",
    onChange: handleChange,
    onKeyDown: handleSubmit
  }), /*#__PURE__*/React.createElement("a", {
    className: styles$1["btn-search"],
    onClick: handleSubmit
  }, /*#__PURE__*/React.createElement("img", {
    src: btnSearch,
    width: "15px"
  })))));
}

var responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 6,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 6,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 6,
    slidesToSlide: 1
  }
};

var getMagazine = function getMagazine(data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(data);
    }, 4000);
  });
};

function Loading(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$2["container-loading"]
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2["container-progress"],
    style: {
      backgroundImage: "url(" + props.cover + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2["container-progress-opacity"]
  })));
}

function Magazine(props) {
  var handle = useFullScreenHandle();
  var flipBook = useRef(null);
  var carouselRef = useRef(null);

  var _useState = useState(0),
      totalPage = _useState[0],
      setTotalPage = _useState[1];

  var _useState2 = useState(0),
      page = _useState2[0],
      setPage = _useState2[1];

  var _useState3 = useState([]),
      flipbookPages = _useState3[0],
      setFlipbookPages = _useState3[1];

  var _useState4 = useState([]),
      setMagazinePages = _useState4[1];

  useEffect(function () {
    if (totalPage === 0) {
      getMagazine(props.book).then(function (data) {
        setMagazinePages(data);
        setTotalPage(data.length);

        var _pages = data.slice(1, data.length - 1);

        setFlipbookPages(_pages);
      });
    }
  });

  var handleFullScreen = function handleFullScreen() {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  var prevButtonClick = function prevButtonClick() {
    flipBook.getPageFlip().flipPrev();
  };

  var nextButtonClick = function nextButtonClick() {
    flipBook.getPageFlip().flipNext();
  };

  var handleScale = function handleScale(value) {
    console.log('scale', value);
    document.getElementById("carousel-container").style.display = "block";

    if (value >= 1.3) {
      document.getElementById("carousel-container").style.display = "none";
    } else {
      document.getElementById("carousel-container").style.display = "block";
    }
  };

  var handleSearch = function handleSearch(data) {
    console.log("search", data, parseInt(data.page));
    var flipToPage = page;

    if (!!data.page) {
      var _data = parseInt(data.page);

      var opt = isNaN(_data) ? "NaN" : _data > totalPage ? "OverMax" : _data < 1 ? "DownMin" : "InsideRange";

      switch (opt) {
        case "OverMax":
          flipToPage = totalPage - 1;
          break;

        case "DownMin":
          flipToPage = 0;
          break;

        case "InsideRange":
          flipToPage = _data - 1;
          break;

        default:
          return;
      }

      flipBook.getPageFlip().flip(flipToPage);
    } else if (!!data.words) alert("buscando coincidencias");
  };

  var handleCarrousel = function handleCarrousel(event) {
    if (!navigator.maxTouchPoints) {
      var nextPageCarrousel = event.data > 1 ? Math.trunc(event.data / 2 + 1) : event.data;
      carouselRef.current.goToSlide(nextPageCarrousel);
      onPage(event);
    }
  };

  var onPage = function onPage(e) {
    setPage(e.data);
  };

  var handleAssigRef = function handleAssigRef(ref) {
    flipBook = ref;
  };

  var pagesFlipbook = function pagesFlipbook(item, index) {
    return /*#__PURE__*/React.createElement(Page$1, {
      key: index,
      page: index + 1,
      source: item
    }, /*#__PURE__*/React.createElement("div", {
      className: stylesPage["body-page"],
      style: {
        backgroundImage: "url(" + item + ")"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: stylesPage["area-zoom"]
    })));
  };

  var renderThumbnail = function renderThumbnail(page, index) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        boxShadow: "inset 7px 0 30px -7px rgba(0,0,0,0.3)",
        backgroundImage: "url(" + page + ")",
        backgroundSize: "cover",
        width: "50px",
        height: "50px"
      }
    });
  };

  var dobleThumbnail = function dobleThumbnail(page, index) {
    if (index > 0 && isOdd(index) && index < props.book.length - 1) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: styles$3["thumbnail-img"]
      }, renderThumbnail(page), renderThumbnail(props.book[index + 1]));
    } else {
      return null;
    }
  };

  var handleFlip = function handleFlip(currentPage) {
    var nextPageFlipbook = currentPage > 1 ? currentPage * 2 - 1 : currentPage;
    flipBook.getPageFlip().flip(nextPageFlipbook);
  };

  var isOdd = function isOdd(num) {
    return num % 2 !== 0;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !(flipbookPages.length > 0) && /*#__PURE__*/React.createElement(Loading, {
    cover: props.cover
  }), flipbookPages.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "full-screenable-node"
  }, /*#__PURE__*/React.createElement(FullScreen, {
    handle: handle
  }, !navigator.maxTouchPoints && /*#__PURE__*/React.createElement(ActionsMenu, {
    currentPage: page,
    totalPages: totalPage,
    onFullScreen: handleFullScreen,
    onHandlePrev: prevButtonClick,
    onHandleNext: nextButtonClick,
    onHandleScale: handleScale,
    onHandleSearch: handleSearch
  }), /*#__PURE__*/React.createElement(FlipPages, {
    size: props.size,
    book: props.book,
    page: page,
    totalPage: totalPage,
    pagesFlipbook: pagesFlipbook,
    assigRef: handleAssigRef,
    flipbookPages: flipbookPages,
    handleCarrousel: handleCarrousel,
    nextButtonClick: nextButtonClick,
    prevButtonClick: prevButtonClick
  }), !navigator.maxTouchPoints && /*#__PURE__*/React.createElement("div", {
    id: "carousel-container",
    className: styles$3["carousel-container"]
  }, !navigator.maxTouchPoints && page !== 0 && /*#__PURE__*/React.createElement("a", {
    onClick: prevButtonClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3["arrow-left"]
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$3["slider-section"]
  }, /*#__PURE__*/React.createElement(Carousel, {
    ref: carouselRef,
    swipeable: true,
    centerMode: false,
    focusOnSelect: true,
    beforeChange: handleFlip,
    draggable: true,
    showDots: false,
    responsive: responsive,
    ssr: true,
    infinite: false,
    autoPlaySpeed: 1000,
    keyBoardControl: true,
    customTransition: "all .5",
    transitionDuration: 500,
    containerClass: "carousel-container",
    removeArrowOnDeviceType: ["tablet", "mobile"],
    deviceType: props.deviceType,
    dotListClass: "custom-dot-list-style",
    itemClass: "carousel-item-padding-40-px"
  }, renderThumbnail(props.book[0]), props.book.map(dobleThumbnail), renderThumbnail(props.book[props.book.length - 1]))), !navigator.maxTouchPoints && page !== totalPage - 1 && /*#__PURE__*/React.createElement("a", {
    onClick: nextButtonClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3["arrow-right"]
  }))))));
}

var ExampleComponent = function ExampleComponent(_ref) {
  var pages = _ref.pages,
      cover = _ref.cover,
      size = _ref.size;
  return /*#__PURE__*/React.createElement(Magazine, {
    book: pages,
    cover: cover,
    size: size
  });
};

export { ExampleComponent };
//# sourceMappingURL=index.modern.js.map
