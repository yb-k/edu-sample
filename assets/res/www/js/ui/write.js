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
      $img: null,
      $btnLine: null,

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
      this.els.$btnLine = $('.btn-line');
      this.els.$img = $('#img');
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
            if (data.imgUrl) {
              var split = data.imgUrl.lastIndexOf('/');
              var imgName = data.imgUrl.toString().substring(split + 1, );
              $('#img').val(imgName);
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
       if(seqNum){
        if (self.data.imgPath) {
          self.updateWithUpload(self.data.imgPath);
        } else {
          self.update();
        }
      }else{
        if (self.data.imgPath) {
          self.writeWithUpload(self.data.imgPath);
        } else {
          self.write();
        }
      }
      });
      self.els.$btnLine.on('click', function () {
        self.getImg();
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
          seqNo: seqNum,

        },
        succ: function (data) {
          alert("게시글 수정 완료.");
          this.data.imgUrl = '';
          M.page.replace({
            url: './detail.html',
            param: {'seqNum':seqNum},
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);

        },
      });
    },
    getImg: function () {
      var self = this;
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        callback: function (status, result) {
          if (status == 'SUCCESS') {
            self.data.imgPath = result.fullpath;
            self.els.$img.val(result.name);
          } else {
            self.data.imgPath = null;
            self.els.$img.val('');
          }
        }
      });
    },
    writeWithUpload: function writeWithUpload(imgPath) {
      var self = this;
      var title = self.els.$titleIpt.val().trim();
      var content = self.els.$contentIpt.val().trim();

      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }
      var body = [{
          name: "file",
          content: imgPath,
          type: "FILE"
        },
        {
          name: "content",
          content: content,
          type: "TEXT"
        },
        {
          name: "title",
          content: title,
          type: "TEXT"
        },
        {
          name: "loginId",
          content: id,
          type: "TEXT"
        },
      ]
      // { content: "파일업로드", type: "TEXT" },
      // { name: "imgs", content: "test.zip", type: "FILE" },
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_WRITE_IMG,
        body: body,
        succ: function () {
          alert('성공~');
          console.log(arguments);
          M.page.replace({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function () {
          console.log(arguments);
        },
        error: function () {
          alert('실패');
        }
      })
    },
    updateWithUpload: function updateWithUpload(imgPath) {
      var self = this;
      var title = self.els.$titleIpt.val().trim();
      var content = self.els.$contentIpt.val().trim();

      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }
      var body = [{
          name: "file",
          content: imgPath,
          type: "FILE"
        },
        {
          name: "content",
          content: content,
          type: "TEXT"
        },
        {
          name: "title",
          content: title,
          type: "TEXT"
        },
        {
          name: "loginId",
          content: id,
          type: "TEXT"
        },
        {
          name: "seqNo",
          content: seqNum,
          type: "TEXT"
        },
      ]
      // { content: "파일업로드", type: "TEXT" },
      // { name: "imgs", content: "test.zip", type: "FILE" },
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_UPDATE_IMG,
        body: body,
        succ: function () {
          alert('업데이트성공~');
          console.log(arguments);
          M.page.replace({
            url: './detail.html',
            param: {'seqNum':seqNum},
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function () {
          console.log(arguments);
        },
        error: function () {
          alert('업데이트실패');
        }
      })
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