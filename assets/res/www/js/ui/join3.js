/**
 * @file : join3.js 개인정보 입력 페이지2
 * @author : 심수현
 * @date : 2022-03-24
 */

 (function ($, M, CONFIG, window){
    var CONSTANT = CONFIG.CONSTANT;
    var SERVER_PATH = CONFIG.SERVER_PATH;
    var page = {
      els:{
          $loginId: null,
          $dupBtn: null,
          $password: null,
          $repassword: null,
          $email: null,
          $joinBtn: null,
          $backBtn: null
      },
      data: {},
      init: function init(){
          this.els.$loginId = $('#loginId');
          this.els.$dupBtn = $('#dupBtn');
          this.els.$password = $('#password');
          this.els.$repassword = $('#repassword');
          this.els.$email = $('#email');
          this.els.$joinBtn = $('#joinBtn');
          this.els.$backBtn = $('#backBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$dupBtn.on('click', function(){
            self.dupBtn();
        });
        this.els.$joinBtn.on('click', function(){
            self.joinBtn()
        });
        this.els.$backBtn.on('click', function(){
            M.page.back();
        })
      },
      //아이디 중복확인
      dupBtn: function dupId(){
        var id = this.els.$loginId.val().trim();

        if(id.length < 5){
            return alert("아이디는 5자 이상으로 입력하세요.");
        }
        else{
            $.sendHttp({
                path: SERVER_PATH.DUPLICATE,
                data:{
                    loginId: id
                },
                succ: function(data){
                    if(data.dupYn == 'Y'){
                        alert("중복된 아이디입니다.");
                        return false;
                    }
                    else{
                        alert("사용가능한 아이디입니다.")
                        return true;
                    }
                }
            });
        }
      },

      joinBtn: function(){
        var self =this;
        var id = this.els.$loginId.val().trim();
        var pw = this.els.$password.val().trim();
        var rpw = this.els.$repassword.val().trim();
        var email = this.els.$email.val().trim();

        if(id == ''){
            return alert("아이디를 입력해 주세요.");
        }
        /*else if(!dupId()){
            return alert("아이디 중복확인을 해 주세요")
        }*/
        if(pw == ''){
            return alert("비밀번호를 입력해 주세요.");
        }
        if(rpw == ''){
            return alert("비밀번호 확인을 입력해 주세요.");
        }
        if(pw != rpw){
            return alert("비밀번호와 비밀번호 확인이 다릅니다.");
        }
        if(email == ''){
            return alert("이메일을 입력해 주세요.");
        }
        if(!self.checkPw(pw)){
            return alert("비밀번호는 8~20자 사이의 문자, 숫자, 특수문자를 한 개 이상 포함해야 합니다.");
        }   

        $.sendHttp({
            path: SERVER_PATH.JOIN,
            data:{
                loginId: id,
                password: pw,
                email: email,
                userNm: M.data.param("userNm"),
                gender: M.data.param("gender"),
                cellPhone: M.data.param("cellPhone"),
                birthDate: M.data.param("birthDate")
            },
            succ: function(data){
                M.page.html("./join4.html");
            },
            error: function(data){
                alert("오류");
            }
        });
      },
      
      checkPw: function (pw) {
        var reg_pw = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
        if (!reg_pw.test(pw)) {
          return false;
        }
        else {
          return true;
        }
      }
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery, M, __config__, window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);