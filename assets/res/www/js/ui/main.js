/**
 * @file : main.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, CONFIG, window){
  var seqNo = [];
  var page = {
      els: {
        $noti : null, 
        $notiAllList : null,
        $notiPage : null,
        $menuBtn : null
      },
      data: {},
      init : function init() {
        this.els.$noti = $('.ellipsis');
        this.els.$notiAllList = $('.btn-txt');
        this.els.$notiPage = $('.main-menu-box li:last');
        this.els.$menuBtn = $('.btn-menu');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
        var id = M.data.global('loginId');
          MNet.sendHttp({
            path: SERVER_PATH.NOTICE_LIST,
            data: {
              loginId : id,
              lastSeqNo : '0',
              cnt : '4'
            },
            succ: function (data) {
              $('.ellipsis:eq(0)').text(data.list[0].title);
              $('.ellipsis:eq(1)').text(data.list[1].title);
              $('.ellipsis:eq(2)').text(data.list[2].title);
              $('.ellipsis:eq(3)').text(data.list[3].title);
    
              for (var i = 0; i < 4; i++) {
                seqNo[i] = data.list[i].seqNo;
              }
              console.log("no " +seqNo);
            },
            error : function(data) {
            }
          });
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$noti.on('click', function(){
           for (var i = 0; i < 4; i++) {
             if ($(this).index() == i) {
               M.data.global("seqNo", seqNo[i]);
               M.page.html("./detail.html");
             }
           }
        });
        this.els.$notiAllList.on('click', function(){
           M.page.html('./list.html');
        });
        this.els.$notiPage.on('click', function(){
           M.page.html('./list.html');
        });
        this.els.$menuBtn.on('click', function(){
          var id = M.data.global('loginId');
            M.page.html({
              path: "userInfo.html",
              param: {
                "loginId": id
              }
            });
        });
                
      }
      
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);