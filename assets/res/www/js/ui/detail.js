/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module, SERVER_PATH, window){

  var page = {
    els:  {
      $loginId : null,
      $sepNo : null,
      $modiBtn : null,
      $delBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$loginId = M.data.param('loginId');
      this.els.$sepNo = M.data.param('seqNo');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      var self = this;
      var id = M.data.global('id');
      var sn = M.data.param('seqNo');
      console.log(sn);
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      $('.btn-wrap').hide();
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          loginId: id,
          seqNo	: sn,
        },
        succ: function (data) {
          $( '#title' ).text( data.title );
          $( '#content' ).text( data.content );
          $('#imgUrl').attr('src',data.imgUrl);
          if(data.isMyNoticeYn === 'Y'){
            $('.btn-wrap').show();
          }
        },
        error: function (data) {
          console.log(data);
          alert('에러!');
        }
      });
      
    },
    initEvent : function initEvent(){
      var self = this;
      var id = M.data.global('id');
      var sn = M.data.param('seqNo');
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      this.els.$modiBtn.on('click', function(){
        M.page.replace('./write.html',{param : { seqNo : sn}});
      });
      this.els.$delBtn.on('click', function(){
        if (confirm("정말 삭제하시겠습니까?") == true){
          MNet.sendHttp({
            path: SERVER_PATH.NOTICE_DELETE,
            data: {
              loginId: id,
              seqNo	: sn,
            },
            succ: function (data) {
              if (data.rsltCode == '0000') {
                alert("완료되었습니다.");
                var pagelist = M.info.stack();
                M.page.remove(pagelist[1].key);
                M.page.replace({
                  url: "./list.html",
                });
              } else {
                console.log(data);
                alert('삭제에 실패하셨습니다.');
              }              
            },
            error: function (data) {
              console.log(data);
              alert('에러!');
            }
          });
        }else return;
      });
    }
  };
  window.__page__ = page;
})(jQuery, M,__mnet__, __util__,__serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);