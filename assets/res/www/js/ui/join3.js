/**
 * @file :  join3.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
      $loginId: null,
      $dupBtn: null,
      $password: null,
      $repassword: null,
      $email: null,
      $joinBtn: null
    },
    data: {},
    init : function init() {
       this.els.$loginId = $('#loginId'); 
       this.els.$dupBtn = $('#dupBtn'); 
       this.els.$password = $('#password');
       this.els.$repassword = $('#repassword');
       this.els.$email = $('#email'); 
       this.els.$joinBtn = $('#joinBtn');
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$dupBtn.on('click', function(){
        self.dupl();
      });
      
      this.els.$joinBtn.on('click', function(){
        self.join();
      });
    },
    
    dupl: function(){
      var self = this;
      var id = this.els.$loginId.val().trim();
      if(id == ''){  
        return alert('아이디를 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.DUPLICATE,
        data:{
          loginId : id
        },
        succ: function(data){
          alert('사용가능한 아이디입니다.');
          return true;
        },
        error:function(){
          return alert('중복된 아이디입니다.');
        }
      });
    },
    
    join:function (){
      var self = this;
      //join2에서 넘어온 입력값
      var name = M.data.param("userNm"); //이름
      var gender = M.data.param("gender"); //성별
      var birthDate = M.data.param("birthDate"); //생일
      var cellPhone = M.data.param("cellPhone"); //핸드폰 번호
      
      //join3에서 입력받은 값
      var id = this.els.$loginId.val().trim();
      var idLen = id.length;
      var pw = this.els.$password.val().trim();
      var rePw = this.els.$repassword.val().trim();
      var pwChk = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      var email = this.els.$email.val().trim();
      var joinBtn = this.els.$joinBtn.prop('click');
      
      if(id == ''){  
        return alert('아이디를 입력해주세요.');
      }else if(idLen < 5){  
        return alert('아이디는 5자 이상이어야 합니다.');
      }
      if(pw == ''){
        return alert('비밀번호를 입력해주세요.');
      }
      if(rePw == ''){
        return alert('비밀번호 확인을 입력해주세요.');
      }
      if(email == ''){
        return alert('이메일을 입력해주세요.');
      }
      
      //비밀번호 확인
      if(!pwChk.test(pw)) {      
        alert('비밀번호 형식에 맞지 않습니다.');                
        return false;
      }
      else {
        if(pw != rePw){
          return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }
        MNet.sendHttp({
          path: SERVER_PATH.JOIN,
            data:{
              loginId : id,
              password: pw,
              userNm : name,
              birthDate : birthDate,
              gender : gender,
              cellPhone : cellPhone,
              email : email
            },
            succ: function(data){
              alert('회원가입이 완료되었습니다.');
              M.page.html({
                path: './join4.html'
              });
            },
            error:function(){
              return alert('다시 입력해주세요');
            }
        });
        return true;
      }
    }
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);