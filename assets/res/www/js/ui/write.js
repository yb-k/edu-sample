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
      $imageName: null,
      $submit: null,
      $file: null
    },
    data: {
      title: '',
      content: '',
      imgPath : ''
    },
    init: function init() {
      this.els.$subject = $('#subject');
      this.els.$content = $('#content');
      this.els.$imageBtn = $('#image-btn');
      this.els.$imageName = $('#image-name');
      this.els.$submit = $('#submit');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
      this.els.$subject.val(M.data.param('title'));
      this.els.$content.val(M.data.param('content'));
      this.els.$imageName.val(M.data.param('imgName'));
      this.data.imgPath = M.data.param('imgPath');
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      var id = M.data.global('LOGIN_INFO').id;

      this.els.$submit.on('click', function () {
        if (M.data.global('seqNo') == '') {
          self.write();
        } else {
          console.log(M.data.param('seqNo'));
          if (self.data.imgPath == '' || self.data.imgPath == null) {
            self.modify();
          } else {
            console.log(self.data.imgPath);
            self.modifyWithUpload(self.data.imgPath);
          }
        }
        self.write();
      });
      self.els.$imageBtn.on('click', function () {
        M.media.picker({
          mode: "SINGLE",
          media: "PHOTO",
          column: 3,
          callback: function (status, result) {
            if (status == 'SUCCESS') {
              self.data.imgUrl = result.fullpath;
              self.els.$imageName.val(result.name);
            } else {
              self.data.imgUrl = '';
              self.els.$imageName.val('');
            }
          }
        })
      })
    },
    write: function write() {
      var subject = self.els.$subject.val().trim();
      var content = self.els.$content.val().trim();
      var imagename = self.els.$imageName.val().trim();
      if (subject == '') {
        console.log(subject);
        return alert('제목을 입력하세요.');
      }
      if (content == '') {
        console.log(content);
        return alert('내용을 입력하세요');
      }
      if (imagename == '') {
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_WRITE,
          data: {
            loginId: id,
            title: subject,
            content: content
          },
          succ: function (data) {
            console.log(data);
            M.page.replace({
              url: './list.html',
            });
          },
          error: function () {
            console.log('erorr');
          }
        });
      } else {
        self.writeWithUpload(id, subject, self.data.imgUrl);
      }

    },
    modify: function () {
      var self = this;
      var id = M.data.global('LOGIN_INFO').id;
      var title = this.els.$submit.val();
      var content = this.els.$content.val();
      var seqNo = M.data.global('seqNo');
      if (title == '') {
        return alert('제목을 입력해주세요');
      }
      if (content == '') {
        return alert('내용을 입력해주세요');
      }
      console.log(seqNo);
      $.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE,
        data: {
          'loginId': id,
          'seqNo': M.data.global('seqNo'),
          'title': title,
          'content': content,
        },
        succ: function (data) {
          console.log(data);
          M.page.replace({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.data.removeGlobal('seqNo');
        },
        error: function (data) {
          console.log(data);
        }
      });

    },
    modifyWithUpload: function modifyWithUpload(imgPath) {
      var self = this;
      var id = M.data.global('myId');
      var title = this.els.$subject.val();
      var content = this.els.$content.val();
      var seqNo = M.data.global('seqNo');
      if (title == '') {
        return alert('제목을 입력해주세요');
      }
      if (content == '') {
        return alert('내용을 입력해주세요');
      }
      var _body = [
        {name: "file", content: imgPath, type: "FILE"},
        {name: "content", content: content, type: "TEXT"},
        {name: "title", content: title, type: "TEXT"},
        {name: "loginId", content: id, type: "TEXT"},
        {name: "seqNo", content: seqNo, type: "TEXT"},
      ]
      console.log(_body);
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_UPDATE_IMG,
        body: _body,
        succ: function () {
          console.log(body);
          M.page.replace({
            url: './list.html',
          });
          M.data.removeGlobal('seqNo');
          M.data.removeGlobal('imgUrl');
          M.data.removeGlobal('imgName');
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function () {
          console.log(body);
        },
        error: function () {
          console.log(body);
        }
      })
    },
    writeWithUpload: function writeWithUpload(title, content, imgPath) {
      var _body = [{name: "file", content: imgPath, type: "FILE"}
        , {name: "content", content: content, type: "TEXT"},
        {name: "title", content: content, type: "TEXT"}];
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_WRITE_IMG,
        body: _body,
        succ: function (data) {
          console.log(data);
        }
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