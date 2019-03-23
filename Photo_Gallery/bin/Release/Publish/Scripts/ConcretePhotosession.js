$(document).ready(function () {
    'use strict';

    $("#fh5co-header").addClass('navbar-fixed-top fh5co-animated slideInDown');



    // iPad and iPod detection	
    var isiPad = function () {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function () {
        return (
            (navigator.platform.indexOf("<i></i>Phone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    var fullHeight = function () {
        if (!isiPad() && !isiPhone()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            })
        }
    };

    var sliderMain = function () {

        $('#fh5co-home .flexslider').flexslider({
            animation: "fade",
            slideshowSpeed: 5000
        });

        $('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
        $(window).resize(function () {
            $('#fh5co-home .flexslider .slides > li').css('height', $(window).height());
        });

        $('.js-fh5co-next').on('click', function (event) {

            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this).closest('#fh5co-home').next().offset().top
            }, 800, 'easeOutExpo');

        });

    };

    var sliderTestimony = function () {

        $('#fh5co-testimony .flexslider').flexslider({
            animation: "slide",
            slideshowSpeed: 5000,
            directionNav: false,
            controlNav: true,
            smoothHeight: true,
            reverse: true
        });

    }

    var offcanvasMenu = function () {

        $('body').prepend('<div id="fh5co-offcanvas" />');
        $('#fh5co-offcanvas').append($('#fh5co-main-nav').clone());

        setTimeout(function () {
            $('#fh5co-offcanvas').prepend('<a href="#" class="js-fh5co-offcanvas-close fh5co-offcanvas-close" />');
            $('#fh5co-offcanvas #fh5co-main-nav').attr('id', '');
        }, 200);

    };

    var mainMenuSticky = function () {

        var sticky = $('.js-sticky');

        sticky.css('height', sticky.height());
        $(window).resize(function () {
            sticky.css('height', sticky.height());
        });

        var $section = $('.fh5co-main-nav');

        $section.waypoint(function (direction) {

            if (direction === 'down') {

                $section.css({
                    'position': 'fixed',
                    'top': 0,
                    'width': '100%',
                    'z-index': 99999
                }).addClass('fh5co-shadow');;

            }

        }, {
                offset: '0px'
            });

        $('.js-sticky').waypoint(function (direction) {
            if (direction === 'up') {
                $section.attr('style', '').removeClass('fh5co-shadow');
            }
        }, {
                offset: function () { return -$(this.element).height() + 69; }
            });

    };

    // Click outside of offcanvass
    var mobileMenuOutsideClick = function () {

        $(document).click(function (e) {
            var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle, .js-fh5co-offcanvas-close");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvas-visible')) {

                    $('body').removeClass('fh5co-overflow offcanvas-visible');

                    $('.js-fh5co-nav-toggle').removeClass('active');
                }
            }
        });

        $('body').on('click', '.js-fh5co-offcanvas-close', function (event) {

            if ($('body').hasClass('offcanvas-visible')) {
                $('body').removeClass('fh5co-overflow offcanvas-visible');
                $('.js-fh5co-nav-toggle').removeClass('active');
            }

            event.preventDefault();

        });

    };

    // Parallax
    var parallax = function () {

        $(window).stellar();

    };


    // Redirect page 
    var redirectPage = function (url) {

        window.location = url;

    }

    var pageTransition = function () {

        $("body").css("display", "none");


        $("body").fadeIn(2000);

        $("a.transition").click(function (event) {
            event.preventDefault();
            var linkLocation = this.href;

            $("body").fadeOut(2000, redirectPage);

            redirectPage(linkLocation);
        });

    };


    // Burger Menu
    var burgerMenu = function () {

        $('body').on('click', '.js-fh5co-nav-toggle', function (event) {

            var $this = $(this);

            $('body').toggleClass('fh5co-overflow offcanvas-visible');
            $this.toggleClass('active');
            event.preventDefault();

        });

    };
    var clickMenu = function () {
        var topVal = ($(window).width() < 769) ? 0 : 58;

        $(window).resize(function () {
            topVal = ($(window).width() < 769) ? 0 : 58;
        });

        if ($(this).attr('href') != "#") {
            $('#fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function (event) {
                var section = $(this).data('nav-section');


                if ($('div[data-section="' + section + '"]').length) {

                    $('html, body').animate({
                        scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
                    }, 500);

                }
                event.preventDefault();

            });
        }




    };

    // Reflect scrolling in navigation
    var navActive = function (section) {

        $('#fh5co-main-nav li, #fh5co-offcanvas li').removeClass('active');
        $('#fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');

    };

    var navigationSection = function () {

        var $section = $('div[data-section]');

        $section.waypoint(function (direction) {
            if (direction === 'down') {
                navActive($(this.element).data('section'));
            }

        }, {
                offset: '150px'
            });

        $section.waypoint(function (direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
                offset: function () { return -$(this.element).height() + 155; }
            });

    };



    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            el.addClass('fadeInUp animated');
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, { offset: '85%' });


    };


    // Document on load.
    $(function () {

        pageTransition();
        fullHeight();
        sliderMain();
        sliderTestimony();
        offcanvasMenu();
        mainMenuSticky();
        mobileMenuOutsideClick();
        parallax();
        burgerMenu();
        scrolledWindow();
        clickMenu();
        navigationSection();
        goToTop();



        // Animations
        contentWayPoint();
    });


    $('#login').click(function () {
        var popup_id = $('#' + $(this).attr("rel"));
        $(popup_id).show();
        $('.login_overlay_popup').show();
        $('.login_popup').show();
        $('.main').fadeIn();
        $('.login_popup').addClass('opend-popup');
        $('.main, .slideInDown').addClass('hideMain');
        $('#fh5co-header').addClass('hideMain');
    });

 





    // закрыть на крестик
    $('.js-login-close-campaign, .close').click(function () {
        console.log("close");
        $('.login_overlay_popup, .login_popup').removeClass("opend-popup");
        $('.login_overlay_popup, .login_popup').hide();
        $('.main, .slideInDown').removeClass('hideMain');
        $('#fh5co-header').removeClass('hideMain');

    });

    // закрыть по клику вне окна
    $(document).mouseup(function (e) {
        var popup = $('.popup, .login_popup');
        if (e.target != popup[0] && e.target != popup[1] && popup.has(e.target).length === 0) {
            $(' .popup, .login_popup').hide();
            $('.main, .slideInDown').removeClass('hideMain');
            $('#fh5co-header').removeClass('hideMain');
        }
    });

    var email = document.querySelector('#adminlogin'), password = document.querySelector('#adminpassword'), mySVG = document.querySelector('.svgContainer'), armL = document.querySelector('.armL'), armR = document.querySelector('.armR'), eyeL = document.querySelector('.eyeL'), eyeR = document.querySelector('.eyeR'), nose = document.querySelector('.nose'), mouth = document.querySelector('.mouth'), mouthBG = document.querySelector('.mouthBG'), mouthSmallBG = document.querySelector('.mouthSmallBG'), mouthMediumBG = document.querySelector('.mouthMediumBG'), mouthLargeBG = document.querySelector('.mouthLargeBG'), mouthMaskPath = document.querySelector('#mouthMaskPath'), mouthOutline = document.querySelector('.mouthOutline'), tooth = document.querySelector('.tooth'), tongue = document.querySelector('.tongue'), chin = document.querySelector('.chin'), face = document.querySelector('.face'), eyebrow = document.querySelector('.eyebrow'), outerEarL = document.querySelector('.earL .outerEar'), outerEarR = document.querySelector('.earR .outerEar'), earHairL = document.querySelector('.earL .earHair'), earHairR = document.querySelector('.earR .earHair'), hair = document.querySelector('.hair');
    var caretPos, curEmailIndex, screenCenter, svgCoords, eyeMaxHorizD = 20, eyeMaxVertD = 10, noseMaxHorizD = 23, noseMaxVertD = 10, dFromC, eyeDistH, eyeLDistV, eyeRDistV, eyeDistR, mouthStatus = "small";

    function getCoord(e) {
        var carPos = email.selectionEnd,
            div = document.createElement('div'),
            span = document.createElement('span'),
            copyStyle = getComputedStyle(email),
            emailCoords = {}, caretCoords = {}, centerCoords = {}
            ;
        [].forEach.call(copyStyle, function (prop) {
            div.style[prop] = copyStyle[prop];
        });
        div.style.position = 'absolute';
        document.body.appendChild(div);
        div.textContent = email.value.substr(0, carPos);
        span.textContent = email.value.substr(carPos) || '.';
        div.appendChild(span);

        emailCoords = getPosition(email);							//console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
        caretCoords = getPosition(span);							//console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
        centerCoords = getPosition(mySVG);							//console.log("centerCoords.x: " + centerCoords.x);
        svgCoords = getPosition(mySVG);
        screenCenter = centerCoords.x + (mySVG.offsetWidth / 2);		//console.log("screenCenter: " + screenCenter);
        caretPos = caretCoords.x + emailCoords.x;					//console.log("caretPos: " + caretPos);

        dFromC = screenCenter - caretPos; 							//console.log("dFromC: " + dFromC);
        var pFromC = Math.round((caretPos / screenCenter) * 100) / 100;
        if (pFromC < 1) {

        } else if (pFromC > 1) {
            pFromC -= 2;
            pFromC = Math.abs(pFromC);
        }

        eyeDistH = -dFromC * .05;
        if (eyeDistH > eyeMaxHorizD) {
            eyeDistH = eyeMaxHorizD;
        } else if (eyeDistH < -eyeMaxHorizD) {
            eyeDistH = -eyeMaxHorizD;
        }

        var eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
        var eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
        var noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
        var mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };
        var eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
        var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
        var eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
        var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
        var noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var noseX = Math.cos(noseAngle) * noseMaxHorizD;
        var noseY = Math.sin(noseAngle) * noseMaxVertD;
        var mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
        var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
        var mouthR = Math.cos(mouthAngle) * 6;
        var chinX = mouthX * .8;
        var chinY = mouthY * .5;
        var chinS = 1 - ((dFromC * .15) / 100);
        if (chinS > 1) { chinS = 1 - (chinS - 1); }
        var faceX = mouthX * .3;
        var faceY = mouthY * .4;
        var faceSkew = Math.cos(mouthAngle) * 5;
        var eyebrowSkew = Math.cos(mouthAngle) * 25;
        var outerEarX = Math.cos(mouthAngle) * 4;
        var outerEarY = Math.cos(mouthAngle) * 5;
        var hairX = Math.cos(mouthAngle) * 6;
        var hairS = 1.2;

        TweenMax.to(eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
        TweenMax.to(eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
        TweenMax.to(nose, 1, { x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
        TweenMax.to(mouth, 1, { x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
        TweenMax.to(chin, 1, { x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut });
        TweenMax.to(face, 1, { x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut });
        TweenMax.to(eyebrow, 1, { x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut });
        TweenMax.to(outerEarL, 1, { x: outerEarX, y: -outerEarY, ease: Expo.easeOut });
        TweenMax.to(outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
        TweenMax.to(earHairL, 1, { x: -outerEarX, y: -outerEarY, ease: Expo.easeOut });
        TweenMax.to(earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
        TweenMax.to(hair, 1, { x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: Expo.easeOut });

        document.body.removeChild(div);
    };

    function onEmailInput(e) {
        getCoord(e);
        var value = e.target.value;
        curEmailIndex = value.length;

        // very crude email validation for now to trigger effects
        if (curEmailIndex > 0) {
            if (mouthStatus == "small") {
                mouthStatus = "medium";
                TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut });
                TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
                TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
                TweenMax.to([eyeL, eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
            }
            if (value.includes("@")) {
                mouthStatus = "large";
                TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthLargeBG, ease: Expo.easeOut });
                TweenMax.to(tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
                TweenMax.to(tongue, 1, { y: 2, ease: Expo.easeOut });
                TweenMax.to([eyeL, eyeR], 1, { scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center" });
            } else {
                mouthStatus = "medium";
                TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, ease: Expo.easeOut });
                TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
                TweenMax.to(tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
                TweenMax.to([eyeL, eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
            }
        } else {
            mouthStatus = "small";
            TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut });
            TweenMax.to(tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
            TweenMax.to(tongue, 1, { y: 0, ease: Expo.easeOut });
            TweenMax.to([eyeL, eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
        }
    }

    function onEmailFocus(e) {
        e.target.parentElement.classList.add("focusWithText");
        getCoord();
    }

    function onEmailBlur(e) {
        if (e.target.value == "") {
            e.target.parentElement.classList.remove("focusWithText");
        }
        resetFace();
    }

    function onPasswordFocus(e) {
        coverEyes();
    }

    function onPasswordBlur(e) {
        uncoverEyes();
    }

    function coverEyes() {
        TweenMax.to(armL, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut });
        TweenMax.to(armR, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1 });
    }

    function uncoverEyes() {
        TweenMax.to(armL, 1.35, { y: 220, ease: Quad.easeOut });
        TweenMax.to(armL, 1.35, { rotation: 105, ease: Quad.easeOut, delay: .1 });
        TweenMax.to(armR, 1.35, { y: 220, ease: Quad.easeOut });
        TweenMax.to(armR, 1.35, { rotation: -105, ease: Quad.easeOut, delay: .1 });
    }

    function resetFace() {
        TweenMax.to([eyeL, eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut });
        TweenMax.to(nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut });
        TweenMax.to(mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
        TweenMax.to(chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
        TweenMax.to([face, eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
        TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
    }

    function getAngle(x1, y1, x2, y2) {
        var angle = Math.atan2(y1 - y2, x1 - x2);
        return angle;
    }

    function getPosition(el) {
        var xPos = 0;
        var yPos = 0;

        while (el) {
            if (el.tagName == "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                // for all other non-BODY elements
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos
        };
    }

    email.addEventListener('focus', onEmailFocus);
    email.addEventListener('blur', onEmailBlur);
    email.addEventListener('input', onEmailInput);
    password.addEventListener('focus', onPasswordFocus);
    password.addEventListener('blur', onPasswordBlur);
    TweenMax.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
    TweenMax.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });


    

    $(".loginLi").click(function () {
        var log_ = $("#adminlogin");
        var pas_ = $("#adminpassword");
        if (log_.val() !== null || pas_.val() !== null) {
            log_.val('');
            pas_.val('');

        }
        console.log("cl");

    });







});
