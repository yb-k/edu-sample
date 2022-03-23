/**
 * @file : findId.js 아이디 찾기
 * @author : 심수현
 * @date : 22.03.23
 */
 
// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window){
    var page = {
      els: {
        $userNm : null,
        $cellPhone : null,
        $findIdBtn : null,
        $findPw : null,
      },
      data: {},
      init :function init(){
        this.els.$userNm = $('#userNm');
        this.els.$cellPhone = $('#cellPhone');
        this.els.$findIdBtn = $('#findIdBtn');
        this.els.$findPw = $('#findPw');
      },
      
      initView : function initView(){
        //화면에서 세팅할 동적데이터
      },
      initEvent : function initEvent(){
        // Dom Event 바인딩
        var self = this;
        this.els.$findIdBtn.on('click', function(){
            self.findId();
        });
        this.els.$findPw.on('click', function(){
            M.page.html('./findPw1.html');
        })
      },

      findId: function(){
        var self = this;
        var userNm = this.els.$userNm.val().trim();
        var cellPhone = this.els.$cellPhone.val().trim();

        if(userNm == ''){
            return alert("이름을 입력해주세요.");
        }
        if(cellPhone == ''){
            return alert("휴대폰 번호를 입력해주세요.");
        }

        MNet.sendHttp({
            path: SERVER_PATH.FIND_ID,
            data:{
                userNm : userNm,
                cellPhone : cellPhone,
            },
            succ: function(data){
                alert("아이디는 " +data.loginId+" 입니다.");
            },
            error: function(data){
                alert("등록된 ID가 없습니다.");
            }
        });

      }
    };
    window.__page__ = page;
  })(jQuery, M, __mnet__, __config__, __serverpath__, window);
  
  // 화면에 리소스가 로딩을 끝내고 정상적으로 동작할 수 있는 머?
  // window.onload이랑 비슷
  // 해당 페이지에서 실제 호출
  (function($, M, pageFunc, window){
    M.onReady(function(){
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
    });
    
  })(jQuery,M,__page__,window);