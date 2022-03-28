/**
 * @file : findPw1.js
 * @author :
 * @date : 
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
    els: {
      $loginIdIpt : null,
      $userNmIpt : null,
      $cellPhoneIpt : null,
      $findPwBtn : null
    },
    data: {},
    init : function init() {
      this.els.$loginIdIpt = $('#loginId');
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findPwBtn = $('#findPwBtn');
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$findPwBtn.on('click', function(){
        self.findPwBtn();
      });
    },
    
    findPwBtn : function(){
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var name = this.els.$userNmIpt.val().trim();
      var phone = this.els.$cellPhoneIpt.val().trim();
      var regPhone = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
      
      if(id == '') {
        return alert('아이디를 입력해주세요');
      }
      if(name == '') {
        return alert('이름을 입력해주세요');
      }
      if(phone == '') {
        return alert('핸드폰 번호를 입력해주세요');
      }
      if(!regPhone.test(phone)) {
         return alert('휴대폰 번호는 숫자로만 정확히 입력해주세요.');
      }
      
      MNet.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          loginId : id,
          userNm : name,
          cellPhone : phone
        },
        succ: function (data) {
          if(data.existYn == 'Y') {
            alert('본인 인증에 성공했습니다.');
            // 페이지 호출
               M.page.html({
                path: "findPw2.html",
                param: {
                  "loginId": id
                }
              });
          }else if(data.existYn == 'N') {
            alert('본인인증에 실패했습니다.');
          }
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