/**
 * @file : write.js 게시글 작성 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

(function ($, M, MNet, SERVER_PATH, window) {
  var page = {
    els: {
      $title: null,
      $content: null,
      $imgsrc: null,
      $imgBtn: null,
      $writeBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      this.els.$imgsrc = $('#imgsrc');
      this.els.$imgBtn = $('#imgBtn');
      this.els.$writeBtn = $('#writeBtn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      var imgName;
      //이미지 첨부
      this.els.$imgBtn.on('click', function () {
        self.imgUpload();
      });
      //게시글 작성
      this.els.$writeBtn.on('click', function () {
        self.writeContent();
      });
    },

    imgUpload: function () {
      var self = this;
      var imgName;
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        path: "/media",
        column: 3,
        maxCount: 1,
        detail: true,
        callback: function (status, result) {
          console.log(status + ", " + JSON.stringify(result));
          imgName = result.name;
          M.data.param({
            "imgName": imgName
          });
        }
      });
    },

    writeContent: function () {
      var id = M.data.global("loginId");
      var title = this.els.$title.val().trim();
      var content = this.els.$content.val().trim();
      var imgsrc = this.els.$imgsrc.val();

      if (title == '') {
        return alert("게시글 제목을 입력해 주세요.");
      }
      if (content == '') {
        return alert("게시글 내용을 입력해 주세요.");
      }
      //이미지가 등록되지 않았을 때
      if (imgsrc == '') {
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_WRITE,
          data: {
            loginId: id,
            title: title,
            content: content
          },
          succ: function (data) {
            alert("게시글이 등록되었습니다.");
            M.data.global({"seqNo":data.seqNo});
            M.page.html("./list.html");
          }
        });
      }
      //이미지가 등록되었을 때
      else {
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_WRITE_IMG,
          data:{
            loginId: id,
            title: title,
            content: content,
            file: imgsrc
          },
          succ: function (data){
            alert("게시글이 등록되었습니다.");
            M.data.global({"seqNo":data.seqNo});
            M.page.html("./list.html");
          }
        });
      }

    }

    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);