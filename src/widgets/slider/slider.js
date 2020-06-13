import Swiper from 'swiper/dist/js/swiper.js';

export default function siblingHover() {

    return {
        init: () => {
          // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
          let vh = window.innerHeight * 0.01;
          // Then we set the value in the --vh custom property to the root of the document
          document.documentElement.style.setProperty('--vh', `${vh}px`);
          // We listen to the resize event
          window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
          });
          
            var interleaveOffset = 0.5;
            var $calloutactionsWrappers = $('.call-actions-wrapper');
            $calloutactionsWrappers.animate({opacity: 0}, 1);
            
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 0,
                slidesPerView: 5,
                loop: false,
                freeMode: false,
                // loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                centeredSlides: false,
                // navigation: {
                //     nextEl: '.gallery-thumbs .swiper-button-next',
                //     prevEl: '.gallery-thumbs .swiper-button-prev',
                // },
                breakpoints: {
                    991: {
                        slidesPerView: 1,
                        // loopedSlides: 1,
                        allowTouchMove: false
                    }
                },
                
            });
            setTimeout(function(){
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 0,
                loop: false,
                speed: 1500,
                // loopedSlides: 5, //looped slides should be the same
                thumbs: {
                    swiper: galleryThumbs,
                },
                navigation: {
                    nextEl: '.gallery-thumbs .swiper-button-next',
                    prevEl: '.gallery-thumbs .swiper-button-prev',
                },
                breakpoints: {
                    991: {
                        slidesPerView: 1,
                        // loopedSlides: 1,
                    },

                },
                on: {
                    init: function(){

                      var textWrappers = document.querySelectorAll('.swiper-slide-active .animate-text');
                      var $callactionsWrappers = $('.swiper-slide-active .call-actions-wrapper');
        

                      // loop through the text to animate and replace letters with spans 
                      [].forEach.call(textWrappers, function(txt) {
                        if($(window).width() > 1024 && !/(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent)){
                        txt.innerHTML = txt.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                        }
                      });
                      
                      // Intilize the animation on the active slide 
                      anime.timeline({loop: false})
                        .add({
                          targets: '.swiper-slide-active .animate-text .letter',
                          autoplay: true,
                          translateX: [40,0],
                          translateZ: 0,
                          opacity: [0,1],
                          easing: "easeInCubic",
                          duration: 5,
                          delay: (el, i) => 100 + 5 * i,
                          begin: function(anim) {
                            [].forEach.call(textWrappers, function(txt) {
                              txt.classList.remove("d-none");
                            });

                          },
                          complete: function(anim){
                            [].forEach.call($callactionsWrappers, function(ele){
                              var $ele = $(ele); 
                              $ele.animate({opacity: 1}, 500);

                            });
                            
                          }
                          
                        });



                        

                    },
                    progress: function() {
                      var swiper = this;
                      for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress;
                        var innerOffset = swiper.width * interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".container").style.transform =
                          "translate3d(" + innerTranslate + "px, 0, 0)";
                      }      
                    },
                    touchStart: function() {
                      var swiper = this;
                      for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                      }
                    },
                    setTransition: function(speed) {
                      var swiper = this;
                      for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".container").style.transition =
                          speed + "ms";
                      }
                    },
                    slideChangeTransitionStart: function(){
                      
                      var textWrappers = document.querySelectorAll('.swiper-slide-active .animate-text');
                      var $callactionsWrappers = $('.swiper-slide-active .call-actions-wrapper');
        

                      // loop through the text to animate and replace letters with spans 
                      [].forEach.call(textWrappers, function(txt) {
                        if($(window).width() > 1024 && !/(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent)){
                        txt.innerHTML = txt.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                        }
                      });
                      
                      // Intilize the animation on the active slide 
                      anime.timeline({loop: false})
                        .add({
                          targets: '.swiper-slide-active .animate-text .letter',
                          autoplay: true,
                          translateX: [40,0],
                          translateZ: 0,
                          opacity: [0,1],
                          easing: "easeInCubic",
                          duration: 5,
                          delay: (el, i) => 100 + 5 * i,
                          begin: function(anim) {
                            [].forEach.call(textWrappers, function(txt) {
                              txt.classList.remove("d-none");
                            });

                          },
                          complete: function(anim){
                            [].forEach.call($callactionsWrappers, function(ele){
                              var $ele = $(ele); 
                              $ele.animate({opacity: 1}, 500);

                            });
                            
                          }
                          
                        });
                    }
                  }
            });
           
            }, 500);
            $('body').on('click','.swiper-button-disabled',(e)=>{
              console.log('here');
              e.preventDefault();
              return false;
            });

            $('#banner [data-video-toggler]').on('click',function(){
              $('#banner #videoModal video').attr('src',$(this).data('video-src-url'));
              $('#banner #videoModal').modal('show');
              var video = document.querySelector('#banner #videoModal video');
              video.play();
            })
            $('#banner #videoModal').on('hide.bs.modal',()=>{
              console.log('closed!');
              var video = document.querySelector('#banner #videoModal video');
              video.pause();
            })
        },

    }
}
