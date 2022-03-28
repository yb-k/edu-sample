/**
 * @file : 게시글 작성
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $title: null,
      $content: null,
      $submitBtn: null,
      $loginId: null,
      $btnImg: null,
      $imgName: null
    },
    data: {
      title: '',
      content: '',
      imgPath: ''

    },
    init: function init() {
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      this.els.$submitBtn = $('#submitBtn');
      this.els.$btnImg = $('#btn-img');
      this.els.$imgName = $('#ipt-img-name');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      // 게시글 수정 버튼을 눌러서 넘어왔을 경우 
      this.els.$title.val(M.data.param('title'));
      this.els.$content.val(M.data.param('content'));
      
      if (M.data.param("modify") == 1) {
        var self = this;
        // title과 content를 미리 세팅 
        $.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("userId"),
            seqNo: M.data.global("seqNo")
          },
          succ: function (data) {
            self.els.$title.val(data.title);
            self.els.$content.val(data.content);
            self.els.$imgName.val(M.data.global("imgName"));
          },
          error: function () {
            alert("에러");
          }
        });
      }
      if (M.data.param("imgUrl")) {
            self.data.imgPath = data.imgUrl;
            self.els.$imgName.val(M.data.global('imgName'));
            }
      
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      // 작성하기 버튼 클릭시 동작 (공지사항 리스트로 넘어가기)
      this.els.$submitBtn.on('click', function () {
        if (M.data.param("modify") == 1) {
          if (self.data.imgPath) {
            self.modifyFile(self.data.imgPath);
          } else {
            self.modify();
          }
        } else self.write();
      })
      // 이미지 선택시 동작
      this.els.$btnImg.on('click', function () {
        self.setImagePath();
      })
    },
    modify: function () {
      var loginId = M.data.global("userId");
      var title = this.els.$title.val().trim();
      var content = this.els.$content.val().trim();
      $.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE,
        data: {
          loginId: loginId,
          title: title,
          content: content,
          seqNo: M.data.global("seqNo")
        },
        succ: function () {
          alert("게시글이 수정되었습니다.")
          M.page.html("./list.html");
        },
        error: function () {
          alert("게시글을 업데이트하지 못했습니다.");
        }
      })
    },

    write: function () {
      var self = this;
      var title = this.els.$title.val().trim();
      var content = this.els.$content.val().trim();
      var imgPath = self.data.imgPath;
      if (title == '') {
        return alert("제목을 입력하세요.");
      }
      if (content == '') {
        return alert("내용을 입력하세요.");
      }
      if (imgPath == '') {
        $.sendHttp({
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
        // 파일 업로드가 포함된 게시물
      } else {
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
            content: M.data.global("userId"),
            type: "TEXT"
          },
        ]
        $.fileHttpSend({
          path: SERVER_PATH.NOTICE_WRITE_IMG,
          body: body,
          succ: function (body) {
            console.log(body);
            alert("이미지 파일 업로드");
            M.page.html('./list.html');
          },
          progress: function (body) {
            console.log(body);
          },
          error: function (body) {
            console.log(body);
            alert("실패다")
          }
        })
      }
    },

    // 이미지 파일 있는 게시글 수정
    modifyFile: function modifyFile(imgPath) {
      var self = this;
      var title = this.els.$title.val().trim();
      var content = this.els.$content.val().trim();
      var imgPath = self.data.imgPath;
      if (title == '') {
        return alert("제목을 입력하세요.");
      }
      if (content == '') {
        return alert("내용을 입력하세요.");
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
          content: M.data.global("userId"),
          type: "TEXT"
        },
        {
          name: "seqNo",
          content: M.data.global('seqNo'),
          type: "TEXT"
        },
      ]
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_UPDATE_IMG,
        body: body,
        succ: function () {
          console.log(body);
          alert("게시글이 수정되었습니다.");
          M.page.html('./list.html');
        },
        progress: function () {
          console.log(body);
        },
        error: function (e) {
          console.log(body);
          alert("실패ㅜㅜㅜㅜ")
        }
      })

    },
    // 이미지 피커로 이미지 하나 갖고오기
    setImagePath: function setImagePath() {
      var self = this;
      var imgNm = "";
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        callback: function (status, result) {
          if (status == 'SUCCESS') {
            console.log(result);
            self.data.imgPath = result.fullpath;
            self.els.$imgName.val(result.name);

          } else {
            self.data.imgPath = null;
            self.els.$imgName.val('');
          }
        }
      });
    }

  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    //pageFunc.setImagePath(); // 시작하자마자 이미지 세팅

    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);