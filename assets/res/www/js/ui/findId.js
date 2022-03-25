/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $userNmIpt:null,
      $cellPhoneIpt:null,
      $findIdBtn:null,
      $findPwBtn:null,
    },
    data: {},
    init : function init() {
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findIdBtn = $('#findIdBtn');
      this.els.$findPwBtn = $('#findPw');
    },
   
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    },
    
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      
      this.els.$findIdBtn.on('click', function() {
        self.findId();
      });
      
      this.els.$findPwBtn.on('click', function() {
         M.page.html('./findPw1.html');
      });
 
    },
    
    findId: function () {
      var self = this;
      var name = this.els.$userNmIpt.val().trim();
      var phone = this.els.$cellPhoneIpt.val().trim();
      if(name == '') {
        return alert('이름을 입력해주세요');
      }
      if(phone == '') {
        return alert('전화번호를 입력해주세요');
      }
      
      $.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm : name,
          cellPhone : phone
        },
        succ: function (data) {
          console.log(data);
          alert('아이디는 '+ data.loginId);
          M.page.html('./login.html');
        }, 
        error : function(data){
          console.log(data);
          alert('해당하는 아이디가 없습니다.');      
        }
      });
    }
  };
  
  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);