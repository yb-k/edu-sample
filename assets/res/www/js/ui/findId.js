/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,module, MNet, SERVER_PATH, window){

  var page = {
    els:  {
      $userNmIpt: null,
      $cellPhoneIpt: null,
      $findIdBtn: null,
      $findPwBtn: null,
    },
    data: {},
    init: function init(){
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findIdBtn = $('#findIdBtn');
      this.els.$findPwBtn = $('#findPw');
    },
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$findIdBtn.on('click', function(){
        self.findId();
      });
      this.els.$findPwBtn.on('click', function(){
        M.page.html('./findPw1.html');
      });
    },
    findId : function(){
      var nm = this.els.$userNmIpt.val().trim();
      var cp = this.els.$cellPhoneIpt.val().trim();
      if(module.isEmpty(nm)){
        return alert('사용자 성명을 입력해주세요.');
      }
      if(module.isEmpty(cp)){
        return alert('휴대폰 번호를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm : nm,
          cellPhone : cp
        },
        succ: function(data){
        console.log(data);
          if(data.rsltCode == '0000'){
            return alert('아이디 : '+ data.loginId);
          }else{
            return alert('해당하는 정보의 아이디가 없습니다.');
          }
        }
      });
    }
  };
  window.__page__ = page;
})(jQuery, M,__util__, __mnet__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);