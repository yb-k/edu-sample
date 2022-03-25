/**
 * @file :  아이디 찾기
 * @author : 김정원
 * @date :  2022-03-24
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window){


  var page = {
    els:{
      $userNmIpt: null,
      $cellPhoneIpt:null,
      $findIdBtn: null,
      $findPw:null,
      
    },
    data: {},
    init: function init(){

      this.els.$userNmIpt = $('#userNm'); // input type
      this.els.$findPw = $('#find-pw');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findIdBtn = $('#find-id-btn');
    },
    
   
    initView: function initView(){
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent(){
      // initEvent 바인딩
      var self = this;
      this.els.$findIdBtn.on('click', function () {
        
        self.findId();
      });
      this.els.$findPw.on('click', function(){
        self.findPw();
      });
    },


    findId: function(){
      var self = this;
      var userNm = this.els.$userNmIpt.val().trim(); // 이름 가져오기
      var cellPhone = this.els.$cellPhoneIpt.val().trim(); // 전화번호 가져오기
      if (userNm == '') {
        return alert('이름을 입력해주세요.');
      }
      if (cellPhone == '') {
        return alert('전화번호을 입력해주세요.');
      }


      MNet.sendHttp({
        path: SERVER_PATH.FIND_ID,
        data: {
          userNm: userNm,
          cellPhone: cellPhone
        },
        succ: function (data) {
          console.log(data);
          alert("아이디는 " + data.loginId + " 입니다.");
        },
     

      });
   

    },
    findPw: function(){
      M.page.html('./findPw1.html');
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