/**
 * @file : 게시글 상세보기
 * @author : 김정원
 * @date :  2022-03-28
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window){

  var seqNum;
  var id;

  var page = {
    els:{
      $btnBack : null,
      $modiBtn : null,
      $delBtn : null,
      $content : null,
      $title : null,


    },
    data: {},
    init: function init(){
      seqNum = M.data.param("seqNum");

      this.els.$btnBack = $('.btn-back');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
      this.els.$content = $('#content');
      this.els.$title = $('#title');
      
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }

    },

   
    initView: function initView(){
      // 화면에서 세팅할 동적데이터
      var content = this.els.$content;
      var title = this.els.$title;


      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          loginId: id,
          seqNo: seqNum,
        },
        succ: function (data) {
          if(data.isMyNoticeYn != 'Y'){
            $('.btn-wrap').hide();
          }

          content.html(data.content);
          title.html(data.title);
        }
      });


    },
    initEvent: function initEvent(){
      // initEvent 바인딩
      var modiBtn = this.els.$modiBtn;
      var delBtn = this.els.$delBtn;
      modiBtn.on('click', function(){
        M.page.html('write.html', {
          'param':{
            seqNum: seqNum,
          }
        });
      });

    },

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window){
  M.onReady(function() {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);