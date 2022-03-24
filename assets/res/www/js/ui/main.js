/**
 * @file : main.js 메인페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

(function ($, M, SERVER_PATH, MNet, window) {
  var page = {
    els: {
      $menuBtn: null,
      $noticeListBtn1: null,
      $noticeListBtn2: null,
      $noticeBtn: null
    },
    data: {},
    init: function init() {
      this.els.$menuBtn = $('#menuBtn');
      this.els.$noticeBtn = $('#noticeBtn');
      this.els.$noticeListBtn1 = $('#noticeListBtn1');
      this.els.$noticeListBtn2 = $('#noticeListBtn2');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      // 정보수정 페이지
      var self = this;
      this.els.$menuBtn.on('click', function () {
        self.update();
      });

      //공지사항 목록 페이지
      this.els.$noticeListBtn1.on('click', function () {
        M.page.html({
          url: "./list.html",
          param: {
            "loginId": M.data.param("loginId")
          }
        });
      });
      this.els.$noticeListBtn2.on('click', function () {
        M.page.html({
          url: "./list.html",
          param: {
            "loginId": M.data.param("loginId")
          }
        });
      });

      //공지사항 세부 페이지
      this.els.$noticeBtn.on('click', function () {
        M.page.html("./detail.html");
      });
    },

    update: function () {
      var loginId = M.data.param("loginId");

      MNet.sendHttp({
        path: SERVER_PATH.INFO,
        data:{
          loginId: M.data.param("loginId")
        },
        succ: function(data){
          M.page.html({
            url: "./userInfo.html",
            param:{
              "loginId" : M.data.param("loginId"),
              "userNm" : M.data.param("userNm"),
              "birthDate" : M.data.param("birthDate"),
              "email" : M.data.param("email"),
              "cellPhone" : M.data.param("cellPhone")
            }
          });
        }
      });
      

    }

    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M, __serverpath__, __mnet__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);