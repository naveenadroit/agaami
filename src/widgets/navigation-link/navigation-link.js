var anchor = (function () {
    var init = function () {
        _anchorfunction();
    },
    _anchorfunction = function () {
        let anchorelink = document.querySelectorAll("[anchor-wrapper]");
        if(anchorelink){
            $(anchorelink).find('a').click(function(){
                var link = $(this).attr('href');
                var target = $('section').attr('id')
                
            })

        }
        
    }
    return {
        init: init
    };
})();

$().ready(function () {
    anchor.init();
});