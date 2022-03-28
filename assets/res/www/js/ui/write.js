/**
 * @file : write.js
 * @author :
 * @date :
 */

(function ($, module, M, SERVER_PATH, MNet, window) {
  var page = {
    els: {
      $subject: null,
      $content: null,
      $imageBtn: null,
      $image: null,
      $submit: null
    },
    data: {
      title : '',
      content : '',
      imgUrl : '',
      
    },
    init: function init() {
      this.els.$subject = $('#subject');
      this.els.$content = $('#content');
      this.els.$imageBtn = $('#image-btn');
      this.els.$submit = $('#submit');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      this.els.$submit.on('click', function () {
        var subject = self.els.$subject.val().trim();
        var content = self.els.$content.val().trim();
        if (subject == '') {
          return alert('제목을 입력하세요.');
        }
        if (content == '') {
          return alert('내용을 입력하세요');
        }
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_WRITE,
          data: {
            loginId: M.data.global('LOGIN_INFO').id,
            title: subject,
            content: content
          },
          succ: function (data) {
            console.log(data);
          },
          error: function () {
            console.log('erorr');
          }
        })
      })
    },
    writeWithUpload: function writeWithUpload(title, content, imgPath) {
      var _body = [{name: "file", content: imgPath, type: "FILE"}
        , {name: "content", content: content, type: "TEXT"},
        {name: "title", content: content, type: "TEXT"}];
      $.fileHttpSend({
        path : SERVER_PATH.NOTICE_WRITE_IMG,
        body : _body,
        
      })
    }
  };
  window.__page__ = page;
})(jQuery, __util__, M, __serverpath__, __mnet__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);