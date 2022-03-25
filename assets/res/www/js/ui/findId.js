/**
 * @file : 아이디찾기
 * @author : 김예은
 * @date : 22.03.23
 */
 
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: { 
      $userNmIpt : null,
      $cellPhoneIpt : null,
      $findIdBtn : null,
      $findPwBtn : null
    },
    data: {},
    init :function init(){
    this.els.$userNmIpt = $('#userNm'); // input
    this.els.$cellPhoneIpt = $('#cellPhone'); // input
    this.els.$findIdBtn = $('#findIdBtn');
    this.els.$findPwBtn = $('#findPw'); 
    },
    initView : function initView(){
      //화면에서 세팅할 동적데이터
    },
    initEvent : function initEvent(){
      // Dom Event 바인딩
      // 아이디확인 버튼 클릭시 동작
      var self = this;
      this.els.$findIdBtn.on('click', function(){
        self.findId();
      })
      // 비밀번호 찾기 버튼 클릭시 동작
      this.els.$findPwBtn.on('click', function(){
        M.page.html('./findPw1.html');
      })
    }, 
    findId : function(){
      var self = this;
      var name = this.els.$userNmIpt.val();        // 이름 가져오기
      var phone = this.els.$cellPhoneIpt.val();    // 휴대폰 번호 가져오기 
      if (name==''){
        alert('이름을 입력해주세요.');
      }
      if(phone==''){
        alert('휴대폰 번호를 입력해주세요.');
      }
     MNet.sendHttp({
      path : SERVER_PATH.FIND_ID,
      data : {
        userNm : name, 
        cellPhone : phone
      },
      succ : function(data){
        console.log(data); 
        alert("회원님의 아이디는 " + data.loginId + "입니다.");
      }, 
      error : function(data){
        console.log(data);
        alert("입력하신 정보의 아이디가 존재하지 않습니다.");      
      }
     });
    }
    
  };
  window.__page__ = page;
})(jQuery,M, __mnet__ , __config__ , __serverpath__ ,window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window){
  M.onReady(function(){
  pageFunc.init(); //최초 화면 초기화
  pageFunc.initView();
  pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);