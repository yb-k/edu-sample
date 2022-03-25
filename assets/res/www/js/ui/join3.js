/**
 * @file : join3.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
      els: {
        $backBtn : null,
        $loginIdIpt : null,
        $dupBtn : null,
        $password : null,
        $repassword : null,
        $email : null,
        $joinBtn : null 
      },
      data: {},
      init : function init() {
        this.els.$backBtn = $('#back-btn');
        this.els.$loginIdIpt = $('#login-id');
        this.els.$dupBtn = $('#dup-btn');
        this.els.$password = $('#password');
        this.els.$repassword = $('#repassword');
        this.els.$email = $('#email');
        this.els.$joinBtn = $('#join-btn');
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$backBtn.on('click', function(){
          M.page.html("./join2.html");
        });
        this.els.$dupBtn.on('click', function(){
           self.dupBtn();
        });
        this.els.$joinBtn.on('click', function(){
           self.joinBtn();
        });
      },
      
      dupBtn : function(){
        var id = this.els.$loginIdIpt.val().trim();
        
        MNet.sendHttp({
          path : SERVER_PATH.DUPLICATE,
          data : {
            loginId : id
          },
          succ : function(data){
            if(data.dupYn == 'Y' || id.length < 5) {
              alert("사용할 수 없는 아이디입니다. 5자 이상의 아이디를 입력해주세요.");
            }else if(data.dupYn == 'N' && id.length >= 5) {
              alert("사용할 수 있는 아이디입니다."); 
            }
          }, 
        });
      },
      
      joinBtn : function() {
        var name = M.data.param('userNm');
        var gender = M.data.param('gender');
        var year = M.data.param('year');
        var month = M.data.param('month');
        var date = M.data.param('date');
        var birth = year + month + date;
        console.log("birthhh "+birth);
        var cellPhone = M.data.param('cellPhone');
        console.log("123 "+name+gender+cellPhone);
      
        var id = this.els.$loginIdIpt.val().trim();
        var password = this.els.$password.val().trim();
        var repassword = this.els.$repassword.val().trim();
        var email = this.els.$email.val().trim();

        console.log("345 " + id + password + repassword + email);
        
        if(id.length < 5) {
          alert("5자 이상의 아이디를 입력해주세요.");
        }
        
        var con = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(!con.test(password) || password == '') {
          alert("비밀번호는 특수문자, 숫자, 영문이 포함된 8자 이상으로 설정해주세요");
        }else if(password != repassword) {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
        
        if(email == '') {
          alert("이메일을 입력해주세요.");
        }
   
        MNet.sendHttp({
          path: SERVER_PATH.JOIN,
          data: {
            userNm : name,
            gender : gender,
            birthDate : birth,
            cellPhone : cellPhone,
            
            loginId : id,
            password : password,
            email : email
          }, 
          succ: function (data) {
            console.log(data);
            M.page.html('./join4.html');
          },
          error : function(data) {
            alert('error');
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