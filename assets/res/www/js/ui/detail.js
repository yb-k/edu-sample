/**
 * @file : detail.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, CONFIG, window){
  var page = {
      els: {
        $title : null,
        $regDate : null,
        $imgUrl : null,
        $content : null,
        $btnWrap : null,
        $modiBtn : null,
        $delBtn : null,
        $backBtn : null
      },
      data: {},
      init : function init() {
        this.els.$title = $('#title');
        this.els.$regDate = $('#reg-date');
        this.els.$imgUrl = $('#img-url');
        this.els.$content = $('#content');
      
        this.els.$btnWrap = $('.btn-wrap');
        this.els.$modiBtn = $('#modi-btn');
        this.els.$delBtn = $('#del-btn');
        this.els.$backBtn = $('.btn-back');
      },
      
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId : M.data.global('loginId'),
            seqNo : M.data.global('seqNo')
          },
          succ: function (data) {
          console.log('data ' + data);
             alert(' detail 성공했습니다.');
             
             $('#title').text(data.title);
             $('#regDate').html(data.regDate);
             $('#content').html(data.content);
             console.log(data.imgUrl);
             if (data.imgUrl != null) {
               $('#imgUrl').attr('src', data.imgUrl);
   
             }
             if(data.isMyNoticeYn == 'Y') {
//                  document.querySelector('.btn-wrap').innerHTML=" count2 btm-fix";
//                show(document.querySelector('.btn-wrap'));
//                  document.querySelector('.btn-wrap').style.visibility = 'visible';
                  document.querySelector('.none').style.setProperty('display', 'block', 'important');
             }
          },
          error : function(data) {
            alert(' detail 실패했습니다.');
          }
        });
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$backBtn.on('click', function(){
           M.page.html('./main.html');
        });
        this.els.$modiBtn.on('click', function(){
           M.page.html('./write.html');
        });
        this.els.$delBtn.on('click', function(){
          MNet.sendHttp({
            path: SERVER_PATH.NOTICE_DELETE,
            data: {
              loginId: M.data.global("loginId"),
              seqNo: M.data.global("seqNo")
            },
            succ: function (data) {
                M.page.html({
                    url: "./list.html"
                  });
            },
            error: function() {
                alert('NOTICE_DELETE 실패');
            }
          });
        });
        
      },
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