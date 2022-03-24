/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $titleIpt: null,
      $contentIpt: null,
      $fileIpt: null,
      $fileBtn: null,
      $writeBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$titleIpt = $('#title');
      this.els.$contentIpt = $('#content');
      this.els.$fileIpt = $('#file');
      this.els.$fileBtn = $('#fileBtn');
      this.els.$writeBtn = $('#writeBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
//      this.els.$fileBtn.on('click', function () {
//
//      });

      this.els.$writeBtn.on('click', function () {
        self.write();
      });
    },

    write: function () {
      var self = this;
      var title = this.els.$titleIpt.val();
      var content = this.els.$contentIpt.val();
      if (title == '') {
        return alert('제목을 입력해주세요');
      }
      if (content == '') {
        return alert('내용을 입력해주세요');
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_WRITE,
        data: {
          loginId: M.data.global('myId'),
          title: title,
          content : content,
        },
        succ: function (data) {
          console.log(data);
          alert('글쓰기가 완료되었습니다.');
          M.page.html({
            url: "./list.html",
          });
        },
        error: function (data) {
          console.log(data);
          alert('글쓰기 실패입니다. 다시 작성해 주세요.');
        }
      });
      console.log(data);
    }

  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);