/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH, window){

  var page = {
    els:  {
      $iptTitle : null,
      $iptContent : null,
      $iptImg : null,
      $btnLine : null,
      $btnPoint : null,
    },
    data: {},
    init: function init(){
      this.els.$iptTitle = $('#ipt-title');
      this.els.$iptContent = $('#ipt-content');
      this.els.$iptImg = $('#ipt-img');
      this.els.$btnLine = $('.btn-line');
      this.els.$btnPoint = $('.btn-point-color');
      
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$btnLine.on('click', function(){
        // 이미지선택버튼
      });
      this.els.$btnPoint.on('click', function(){
        // 게시글 작성버튼
        self.writeOk();
      });
    },
    writeOk : function(){
      var title = this.els.$iptTitle.val().trim();
      var content = this.els.$iptContent.val().trim();
      var img = this.els.$iptImg.val().trim();
      if(module.isEmpty(title)){
        return alert('제목을 입력해주세요.');
      }
      if(module.isEmpty(content)){
        return alert('내용을 입력해주세요.');
      }
/*      if(img != null){
        MNet.sendHttp({
          path : SERVER_PATH.NOTICE_WRITE_IMG,
          data: {
            loginId : id,
            title : title,
            content : content,
            file : img,
          },
          succ: function(data){
            if(data.rsltCode == '0000'){
              return alert('등록 완료');
            }else{
              return alert('등록에 실패하셨습니다.');
            }
          }
        });      
        return alert('이미지 아직 안함..');
      }*/
        MNet.sendHttp({
          path : SERVER_PATH.NOTICE_WRITE,
          data: {
            loginId : M.data.global('id'),
            title : title,
            content : content,
          },
          succ: function(data){
            if(data.rsltCode == '0000'){
              alert('등록 완료');
              M.page.html('./list.html');
            }else{
              return alert('등록에 실패하셨습니다.');
            }
          }
        });
    }
    
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);