(function (window, $) {

    var ect = $(".exception");
    var ect2 = $(".exception2");
    var ect3 = $(".exception3");


    var allH = $("body").outerHeight(true);
    var hadH = $(".header").outerHeight(true);
    var btmH = $(".btm-wrap").outerHeight(true);
    var tabH = $(".tab-menu-wrap").outerHeight(true);


    function scrollHeight() {
        hadH = (hadH == null) ? 0 : hadH;
        btmH = (btmH == null) ? 0 : btmH;
        tabH = (tabH == null) ? 0 : tabH;
        if ((hadH + btmH + tabH) != 0) {
            //btm-wrap 영역
            var resultH = allH - hadH - btmH - tabH;
            $(".cont-wrap").css("height", resultH);
            $(".cont-wrap").addClass("scroll");
        }
        //    if(hadH>0 && btmH>0 && tabH > 0){//header,footer,tab메뉴 고정
        //       console.log("if 1");
        //        allH = allH - hadH - btmH - tabH;
        //        $(".cont-wrap").css("height",allH);
        //        $(".cont-wrap").addClass("scroll");
        //    }else if(hadH>0 && btmH>0){//header,footer 고정
        //       console.log("if 2");
        //        allH = allH - hadH - btmH;
        //        $(".cont-wrap").css("height",allH);
        //        $(".cont-wrap").addClass("scroll");
        //    }else if(hadH>0  && tabH > 0){//tab메뉴 있는경우
        //       console.log("if 3");
        //        allH = allH - hadH - tabH; 
        //        $(".container").css("height",allH);
        //        $(".container").addClass("scroll");
        //    }else if(hadH > 0){//hader고정
        //       console.log("if 4");
        //        allH = allH - hadH; 
        //        $(".container").css("height",allH);
        //        $(".container").addClass("scroll");
        //    }else if(btmH > 0){//footer고정
        //       console.log("if 5");
        //        allH = allH - btmH; 
        //        $(".cont-wrap").css("height",allH);
        //        $(".cont-wrap").addClass("scroll");
        //    }
    }

    function mainTypeB() {
        var box1H = $(".main-box-01").outerHeight(true);
        var box2H = $(".info-box-blue").outerHeight(true);
        var box3H = $(".main-box-03").outerHeight(true);
        var box4H = $(".main-box-04").outerHeight(true);

        var contH = allH - hadH;
        $(".container").css("height", contH);
        contH = contH - box1H - box3H - box4H + 60;
        $(".info-box-blue").css("height", contH);
    }

    function mainTypeD() {
        var box1H = $(".main-menu-box").outerHeight();
        var box2H = $(".btn-line-wit").outerHeight(true);
        var box3H = $(".main-box-02").outerHeight(true);

        var contH = allH - hadH - btmH;
        $(".cont-wrap").css("height", contH);

        contH = contH - box1H - box2H - box3H + 20;
        $(".info-box-blue").css("height", contH);
    }

    function sidemenuHeight() {
        // SideMenu Scroll
        var sideCont = $(".side-cont");
        var contH = sideCont.height();
        var subH = $(".side-top").outerHeight(true) + $(".side-btm").outerHeight(true);
        contH = contH - subH;

        $(".side-scroll").css("height", contH);
        $(".side-wrap.type-c .menu-wrap .sub-menu").css("height", contH);
    }


    //footer고정이 아닐때
    //    var viewH = $(".wrapper").outerHeight(true);
    //   var allH = $(".container").outerHeight(true);
    //    if( allH > viewH){
    //        $(".btm-fix").css("position","relative");
    //    }

    //footer고정일때
    //    var allH = $(".wrapper").outerHeight(true);
    //    var subH = $(".header").outerHeight(true) + $(".btn-wrap ").outerHeight(true);
    //    
    //    allH = allH - subH;
    //    var contH = $(".cont-wrap").outerHeight(true);
    //   $(".cont-wrap").addClass("scroll");
    //   $(".cont-wrap").css("height",allH);


    $(document).ready(function () {

        $(".ui-loader").hide(); //mobile jquery loading message showing issue

        sidemenuHeight();
        if (ect.length > 0) { //예외 페이지-order_detail 
            //하단float 스크립트
            $(".btn-buy").click(function () {
                $(this).toggleClass('open');
            });
        } else if (ect2.length > 0 || ect3.length > 0) { //예외 페이지-main_type_B,main_type_D
            var widndowHeight = $(window).height();
            if (widndowHeight < 568) {
                //높이가 480보다작은 경우(iphone4)
                scrollHeight();
            } else if (ect2.length > 0) { //나머지 디바이스

                mainTypeB();
            } else {
                mainTypeD();
            }

        } else { //공통 height 스크립트

            var windowWidth = $(window).width();

            if (windowWidth > 767) {
                //창 가로 크기가 768보다 큰경우(tablet)
                scrollHeight();
                $(".footer").addClass("btm-wrap");
                btmH = $(".btm-wrap").outerHeight(true);
            }
            scrollHeight();
        }

        //화면 회전 이벤트 추가
        $(window).on("orientationchange", function () {
            allH = $("body").outerHeight(true);
            hadH = $(".header").outerHeight(true);
            btmH = $(".btm-wrap").outerHeight(true);
            tabH = $(".tab-menu-wrap").outerHeight(true);
            scrollHeight();
        });
    });

})(window, jQuery);