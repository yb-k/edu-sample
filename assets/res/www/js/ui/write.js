/**
 * @file : 게시글 작성
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, MNet, config, SERVER_PATH, window) {
  var page = {
    els: {
      $title: null,
      $content: null,
      $image: null,
      $writeBtn: null,
      $loginId: null
    },
    data: {},
    init: function init() {
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      this.els.$image = $('#image');
      this.els.$writeBtn = $('#writeBtn');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      // 작성하기 버튼 클릭시 동작 (공지사항 리스트로 넘어가기)
      this.els.$writeBtn.on('click', function () {
        self.write();
      })
      // 이미지 선택시 동작
      //      this.els.$image.on('click', function () {
      //      })
    },
    write: function () {
    console.log(M.data.global("userId"));
      var title = this.els.$title.val().trim();
      var content = this.els.$content.val().trim();
      if (title == '') {
        return alert("제목을 입력하세요.");
      }
      if (content == '') {
        return alert("내용을 입력하세요.");
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_WRITE,
        data: {
          loginId: M.data.global("userId"),
          title: title,
          content: content
        },
        succ: function (data) {
          console.log(data);
          M.page.html("./list.html");
        },
        error: function (data) {
          alert("실패");
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