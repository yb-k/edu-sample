/**
 * @file : 유저 수정 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $loginId: null,
      $saveBtn: null,
      $userNm: null,
      $birthDate: null,
      $cellPhone: null,
      $email: null,
      $password: null,
      $changePw: null,
      $outBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$loginId = $('#loginId');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$userNm = $('#userNm');
      this.els.$birthDate = $('#birthDate');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$email = $('#email');
      this.els.$password = $('#password');
      this.els.$changePw = $('#changePw');
      this.els.$outBtn = $('#outBtn');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      // 내정보 가져오기
      this.els.$loginId.val(M.data.global('userIdSend'));


      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data: {
          "loginId": M.data.global('userIdSend'),
        },
        succ: function (data) {
          self.els.$userNm.val(data.userNm);
          self.els.$birthDate.val(data.birthDate);
          self.els.$cellPhone.val(data.cellPhone);
          self.els.$email.val(data.email);
        },
        error: function (data) {
          console.log(data);
          alert("유저 정보를 가져오지 못했습니다.");
        }
      });

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$saveBtn.on('click', function () {
        self.myInfoUpdate();
      })

      this.els.$changePw.on('click', function () {
        self.changePw();
      })

      this.els.$outBtn.on('click', function () {
        self.outBtn();
      })

    },



    // 탈퇴 하기
    outBtn: function () {
      var self = this;
      var userId2 = this.els.$loginId.val(); //  아이디 가져오기
      var password2 = this.els.$password.val(); // 비밀번호 가져오기

      if (password == '') {
        return alert('비밀번호를 입력해주세요.');
      }


      MNet.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          "loginId": userId2,
          "password": password2
        },
        succ: function (data) {

          M.pop.alert({
            title: '공지',
            message: '정말 탈퇴하시겠습니까?',
            buttons: ['확인', '취소'],
            callback: function (index) {
              if (index == 0) {
                MNet.sendHttp({
                  path: SERVER_PATH.OUT,
                  data: {
                    "loginId": userId2,
                    "password": password2
                  },
                  succ: function (data) {
                    alert("탈퇴가 되었습니다.");
                    M.page.html("./login.html");
                  },
                  error: function (data) {
                    console.log(data);
                    alert("탈퇴가 안되었습니다.");
                  }
                });
              } else {
                return false;
              }

            }
          });

        },
        error: function (data) {
          console.log(data);
          alert("비밀번호가 틀렸습니다.");
        }
      });


    },



    // 비밀번호 변경 들어가기
    changePw: function () {
      var self = this;
      var userId = this.els.$loginId.val(); //  아이디 가져오기
      var password = this.els.$password.val(); // 비밀번호 가져오기

      if (password == '') {
        return alert('비밀번호를 입력해주세요.');
      }

      MNet.sendHttp({
        path: SERVER_PATH.CHECK_PASSWORD,
        data: {
          "loginId": userId,
          "password": password
        },
        succ: function (data) {
          // 페이지 호출
          M.page.html({
            path: './findPw2.html',
            param: {
              "loginId": userId
            }
          });
        },
        error: function (data) {
          console.log(data);
          alert("비밀번호가 틀렸습니다.");
        }
      });
    },

    // 내정보 수정
    myInfoUpdate: function () {
      var self = this;
      var userId = this.els.$loginId.val(); //  아이디 가져오기
      var cellPhone = this.els.$cellPhone.val();
      var email = this.els.$email.val();
      var password = this.els.$password.val();


      if (password == '') {
        return alert('비밀번호를 입력해주세요.');
      }
      if (cellPhone == '') {
        return alert('전화번호를 입력해주세요.');
      }
      if (email == '') {
        return alert('이메일을 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.UPDATE,
        data: {
          "loginId": userId,
          "cellPhone": cellPhone,
          "email": email,
          "password": password
        },
        succ: function (data) {
          console.log(data);

          alert("수정 했습니다.");
          M.page.replace({
            url: './main.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);  
        },
        error: function (data) {
          console.log(data);
          alert("수정하지 못했습니다.");
        }
      });

    }







  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);