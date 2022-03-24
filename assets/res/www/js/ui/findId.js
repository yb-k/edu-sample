/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
    els: {
       $userNm: null,
       $cellPhone: null,
       $findIdBtn: null,
       $findPw: null
    },
    data: {},
    init : function init() {
      this.els.$userNm = $('#userNm');
      this.els.$cellPhone = $('#cellPhone');
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
      });
      
      this.els.$findPw.on('click', function(){
        M.page.html('./findPw1.html');
      });
    },
    setFindId: function(name, phone){
          //자동로그인 기능
          M.data.storage('FIND_ID_AUTH', { name: name, phone: phone });
        },
    findId:function (){
          var self = this;
          var name = this.els.$userNm.val().trim(); //이름 가져오기
          var phone = this.els.$cellPhone.val().trim(); //이름 가져오기
          var idChk = this.els.$findIdBtn.prop('click');
          if(name == ''){
            return alert('이름을 입력해주세요.');
          }
          if(phone == ''){
            return alert('휴대폰 번호를 입력해주세요.');
          }
          MNet.sendHttp({
            path: SERVER_PATH.FIND_ID,
            data:{
              userNm : name,
              cellPhone: phone
            },
            succ: function(data){
              //아이디 확인
              if(idChk) self.setFindId(name, phone);
              console.log(data);
              alert("아이디는 " + data.loginId + " 입니다.");
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