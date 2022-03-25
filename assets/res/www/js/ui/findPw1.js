/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,module, MNet, SERVER_PATH, window){

  var page = {
    els:  {
     $loginIdIpt : null,
      $userNmIpt : null,
      $cellPhoneIpt : null,
      $findPwBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$loginIdIpt = $('#loginId');
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findPwBtn = $('#findPwBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$findPwBtn.on('click', function(){
        self.findPwBtn();
      });
    },
    findPwBtn : function(){
      var id = this.els.$loginIdIpt.val().trim();
      var nm = this.els.$userNmIpt.val().trim();
      var cp = this.els.$cellPhoneIpt.val().trim();
      if(module.isEmpty(id)){
        return alert('아이디를 입력해주세요.');
      }
      if(module.isEmpty(nm)){
        return alert('사용자 성명을 입력해주세요.');
      }
      if(module.isEmpty(cp)){
        return alert('휴대폰 번호를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          loginId : id,
          userNm : nm,
          cellPhone : cp
        },
        succ: function(data){
          if(data.existYn == 'Y'){
            alert('본인 인증에 성공하셨습니다.');
            M.page.html('./findPw2.html',{ 'param':{loginId : id}});
          }else{
            return alert('본인 인증에 실패하셨습니다.');
          }
        }
      });      
    }
  };
  window.__page__ = page;
})(jQuery, M,__util__,__mnet__,__serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);