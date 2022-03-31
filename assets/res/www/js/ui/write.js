/**
 * @file : write.js 게시글 작성 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $title: null,
      $content: null,
      $imgName: null,
      $imgBtn: null,
      $writeBtn: null,
      $backBtn: null
    },
    data: {},
    init: function init() {
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      this.els.$imgName = $('#imgName');
      this.els.$imgBtn = $('#imgBtn');
      this.els.$writeBtn = $('#writeBtn');
      this.els.$backBtn = $('#backBtn');
    },
    initView: function initView() {
      // 화면에서 세팅할 동적 데이터
      this.els.$title.val(M.data.param('title'));
      this.els.$content.val(M.data.param('content'));

      if (M.data.param("modify") == 1) {
        var self = this;
        // title과 content를 미리 세팅 
        $.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("loginId"),
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
      // DOM Event 바인딩
      var self = this;
      this.els.$backBtn.on('click', function(){
        M.page.back();
      })
      //이미지 첨부
      this.els.$imgBtn.on('click', function () {
        self.imgUpload();
      });
      //게시글 작성
      this.els.$writeBtn.on('click', function () {
        if(M.data.param("modify") == 1){
          if(self.data.imgPath){
            self.modifyImage(self.data.imgPath);
          } else{
            self.modify();
          } 
          } else{
            self.write();
          }
      });
    },

    imgUpload: function () {
      var self = this;
      var imgName;
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        maxCount: 1,
        callback: function (status, result) {
          if(status == 'SUCCESS'){
            console.log(result);
            self.data.imgPath = result.fullpath;
            self.els.$imgName.val(result.name);
          }
          else{
            self.data.imgPath = null,
            self.els.$imgName.val('');
          }
        }
      });
    },

    write: function () {
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
        $.sendHttp({
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
          content: M.data.global("loginId"),
          type: "TEXT"
        },
        ]
      }
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_WRITE_IMG,
        body: body,
        succ: function (body) {
          console.log(body);
          alert("이미지 업로드");
          M.page.replace({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function (body) {
          console.log(body);
        },
        error: function (body) {
          console.log(body);
          alert("fail")
        }
      });

    },

    modify: function(){
      var loginId = M.data.global("loginId");
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
          M.page.replace({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        error: function () {
          alert("게시글을 수정하지 못했습니다.");
        }
      })

    },

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
          content: M.data.global("loginId"),
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
          M.page.replace({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function () {
          console.log(body);
        },
        error: function (e) {
          console.log(body);
          alert("게시글을 수정하지 못했습니다.")
        }
      })

    }

    //    method: {},
  };
  window.__page__ = page;
})(jQuery, M, __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);