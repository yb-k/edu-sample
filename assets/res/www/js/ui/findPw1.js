/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, M, module, MNet, SERVER_PATH, window) {
  var page = {
      els: {
        $loginId: null,
        $userName: null,
        $cellPhone: null,
        $findPwBtn: null
      },
      data: {}
      ,
      init: function init() {
        this.els.$loginId = $('#login-id');
        this.els.$userName = $('#user-name');
        this.els.$cellPhone = $('#cellPhone');
        this.els.$findPwBtn = $('#find-pw-btn');
      }
      ,
      initView: function initView() {
        // 회면에서 세팅할 동적 데이터
      }
      ,
      initEvent: function initEvent() {
        // DOM Event 바인딩
        var self = this;
        // cellphone 숫자만 입력가능
        module.onKeyupNum(this.els.$cellPhone);

        self.els.$findPwBtn.on('click', function () {
          var id = self.els.$loginId.val().trim();
          var name = self.els.$userName.val().trim();
          var cellphone = self.els.$cellPhone.val().trim();
          if (id == '') {
            return alert('아이디를 입력해주세요');
          }
          if (name == '') {
            return alert('이름을 입력해주세요');
          }
          if (cellphone == '') {
            return alert('전화번호를 입력해주세요');
          }
          MNet.sendHttp({
            path: SERVER_PATH.FIND,
            data: {
              loginId: id,
              userNm: name,
              cellPhone: cellphone
            },
            succ: function (data) {
              if (data.existYn == 'Y') { // 본인인증에 성공했을 경우
                alert('본인인증에 성공했습니다.');
                M.page.html('./findPw2.html', {
                  param: {
                    userId: id
                  }
                });
              } else {
                alert('본인인증에 실패했습니다');
              }
            }
          })
        });


      }
      ,

    }
  ;
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);