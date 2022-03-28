/**
 * @file : findPw1.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
       $userNm: null,
       $cellPhone: null,
       $loginId: null,
       $findPwBtn: null,
    },
    data: {},
    init : function init() {
      this.els.$loginId = $('#loginId'); //아이디
      this.els.$userNm = $('#userNm'); //이름
      this.els.$cellPhone = $('#cellPhone'); //휴대폰
      this.els.$findPwBtn = $('#findPwBtn'); //비밀번호 찾기 버튼
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
     
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$findPwBtn.on('click', function(){
        self.findChk();
      });
      
    },
  
    findChk:function (){
      var self = this;
      var id = this.els.$loginId.val().trim();
      var name = this.els.$userNm.val().trim(); //이름 가져오기
      var phone = this.els.$cellPhone.val().trim(); //폰번호 가져오기
      var pwChk = this.els.$findPwBtn.prop('click');
      if(id == ''){  
        return alert('아이디를 입력해주세요.');
      }
      if(name == ''){  
        return alert('이름을 입력해주세요.');
      }
      if(phone == ''){
        return alert('휴대폰 번호를 입력해주세요.');
      }
      $.sendHttp({
        path: SERVER_PATH.FIND,
        data:{
           loginId : id,
           userNm : name,
           cellPhone: phone
        },
      
        succ: function(data){
        if(data.existYn == 'N'){
          options.error(data);
        }
          alert('인증 성공')
          M.page.html({
            path: './findPw2.html',
            param:  {"loginId": id }
          });
        },
        error:function(){
          return alert('본인 인증에 실패하였습니다.');
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