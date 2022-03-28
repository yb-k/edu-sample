/**
 * @file : findId.js
 * @author :
 * @date : 
 */

// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
    els: {
      $userNmIpt : null,
      $cellPhoneIpt : null,
      $findIdBtn : null,
      $findPw : null
    },
    data: {},
    init : function init() {
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findIdBtn = $('#findIdBtn');
      this.els.$findPw = $('#findPw');
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      
      var self = this;
      this.els.$findIdBtn.on('click', function(){
        self.findId();
      })
      this.els.$findPw.on('click', function(){
        M.page.html('./findPw1.html');
      })
    },
    
    findId : function(){
      var self = this;
      var name = this.els.$userNmIpt.val().trim();
      var phone = this.els.$cellPhoneIpt.val().trim();
      var regPhone = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
      
      if(name == '') {
        return alert('이름을 입력해주세요.');
      }
      if(phone == '') {
        return alert('휴대폰 번호를 입력해주세요.');
      }
      if(!regPhone.test(phone)) {
        return alert('휴대폰 번호는 숫자로만 정확히 입력해주세요.');
      }
      
      MNet.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm : name,
          cellPhone : phone
        },
        succ: function (data) {
          //if(data.rsltCode == '0000') {
            return alert('아이디 : ' + data.loginId);
          //}
        },
        error : function(data) {
         // return alert('아이디를 확인할 수 없습니다.');
        }
      });
      
    }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);