/**
 * @file : 게시글 작성
 * @author : 김정원
 * @date :  2022-03-25
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {
  var id;
  var seqNum;

  var page = {
    els: {
      $btnBack: null,
      $btnWrite: null,
      $titleIpt: null,
      $contentIpt: null,

    },
    data: {},
    init: function init() {
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }

      this.els.$btnBack = $('.btn-back');
      this.els.$btnWrite = $('.btn-point-color');
      this.els.$titleIpt = $('#title');
      this.els.$contentIpt = $('#content');
    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      if (M.data.param('seqNum')) {
        seqNum = M.data.param('seqNum');
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: id,
            seqNo: seqNum,
          },
          succ: function (data) {
            if (data.isMyNoticeYn != 'Y') {
              $('.btn-wrap').hide();
            }

            $('#title').val(data.title);
            $('#content').val(data.content);
          }
        });
      }
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      self.els.$btnBack.on('click', function () {
        M.page.back();
      });
      self.els.$btnWrite.on('click', function () {
        self.write();
      });
    },

    write: function () {
      var title = this.els.$titleIpt.val().trim();
      var content = this.els.$contentIpt.val().trim();
      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_WRITE,
        data: {
          loginId: id,
          title: title,
          content: content,

        },
        succ: function (data) {
          
          M.page.html("./list.html");

        },

      });
    },

    update: function () {
      var title = this.els.$titleIpt.val().trim();
      var content = this.els.$contentIpt.val().trim();
      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }

      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE,
        data: {
          loginId: id,
          title: title,
          content: content,
          seqNo : seqNum,

        },
        succ: function (data) {
          alert("게시글 수정 완료.");
          M.page.html("./list.html");

        },
      });
    },

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);