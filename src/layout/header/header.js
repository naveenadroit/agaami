var header = (function () {
    var init = function () {
        // _headerInit();
        // _functionMenu();
        _stopPropagation();
    },
    
    // _headerInit = function () {
    //     window.onscroll = function() {addClasstoElementOnScroll()};
    // },
    _stopPropagation = function () {
        $('[stop-propagation]').on("click", function (e) {
            e.stopPropagation();
        });
    }
    return {
        init: init
    };
})();

$().ready(function () {
    header.init();
});
window.onscroll = function() {addClasstoElementOnScroll()};
var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
function addClasstoElementOnScroll(){
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky-top");
    } else {
        navbar.classList.remove("sticky-top");
    }
}