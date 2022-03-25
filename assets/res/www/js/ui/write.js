/**
 * @file : write.js
 * @author : 김소담
 * @date : 2022-03-24
 * 게시글 작성 / 수정 같이 구현
 */

(function ($, M, CONFIG, window) {
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $title: null,
      $content: null,
      $imgBtn: null,
      $imgSrc: null,
      $writeBtn: null,
    },
    data: { 
      title: '',
      content : '',
      imgPath : ''
  },
    init: function init() {
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      this.els.$imgBtn = $('#img-btn');
      this.els.$imgSrc = $('#img-src');
      this.els.$writeBtn = $('#write-btn');
    },
    initView: function initView() {
      var self = this;
      // 화면에서 세팅할 동적 데이터
      if (M.data.param("modify") == 1) {
        self.inputModify();
      }
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      var imgName;
      this.els.$imgBtn.on('click', function () {
        M.media.picker({
          mode: "SINGLE",
          media: "PHOTO",
          path: "/media",
          detail: true,
          column: 3,
          maxCount: 1,
          callback: function( status, result ) {
                  console.log( status + ", " + result.path + ", " + result.name);
                  imgName = "http://211.241.199.241:28040/resources/img/"+result.name;
                  self.els.$imgSrc.val(result.name);
                  M.data.param("img", result);
          }
        });
      });

      this.els.$writeBtn.on('click', function () {
        if (M.data.param("modify") == 1) {
          self.modify();
        }
        else self.write();
      });
    },
    // 파일 업로드가 포함된 게시글 등록
    writeWithUpload : function writeWithUpload(title, content, imgPath) {
      var body = [
        { name : "file", content : imgPath, type : "FILE"},
        { name  : "content", type : "TEXT"},
        { name : "title", type : "TEXT"},
      ]
      $.fileHttpSend({
        
        path : SERVER_PATH.NOTICE_WRITE_IMG,
        body : body,
        succ : function() {
          console.log(arguments);
        },
        progress : function() {
          console.log(arguments);
        }
      });
    },

    setImagePath() {
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        path: "/media",
        detail: true,
        column: 3,
        maxCount: 1,
        callback: function( status, result ) {
                // result.fullpath img url
                var fileList = [], fileCont = {};
                if(status === 'SUCCESS')

                console.log( status + ", " + result.path + ", " + result.name);
                imgName = "http://211.241.199.241:28040/resources/img/"+result.name;
                self.els.$imgSrc.val(result.name);
                M.data.param("img", result);
        }
      });
    },

    //    method: {},

    modify : function() {
      var id = M.data.global("loginId");
        var title = this.els.$title.val().trim();
        var content = this.els.$content.val().trim();
        var imgSrc = this.els.$imgSrc.val();

        if (imgSrc != '') {
          var img = M.data.param("img");
          M.net.http.upload({
            url: "http://211.241.199.241:28040/resources/img/",
            header: {},
            params: {},
            files: img,
            encoding : "UTF-8",
            finish : function(status, header, body, setting) {

            },
            progress : function(total, current) {

            }
        });

          $.sendHttp({
            path: SERVER_PATH.NOTICE_UPDATE_IMG,
            data: {
              loginId: id,
              title: title,
              content: content,
              file: imgSrc
            },
            succ: function (data) {

            },
            error: function () {

            }
          });
        } else {
          $.sendHttp({
            path: SERVER_PATH.NOTICE_UPDATE,
            data: {
              loginId: id,
              seqNo : M.data.global("seqNo"),
              title: title,
              content: content
            },
            succ: function (data) {
              alert('수정 완료');
              M.data.removeGlobal("seqNo");
              M.page.html('./list.html');
            },
            error: function () {
              alert('작성 실패');
            }
          });
        }
    },

    write : function() {
        var id = M.data.global("loginId");
        var title = this.els.$title.val().trim();
        var content = this.els.$content.val().trim();
        var imgSrc = this.els.$imgSrc.val();

        if (imgSrc != '') {
          var img = M.data.param("img");
          M.net.http.upload({
            url: "http://211.241.199.241:28040/resources/img/",
            header: {},
            params: {},
            files: img,
            encoding : "UTF-8",
            finish : function(status, header, body, setting) {

            },
            progress : function(total, current) {

            }
        });
          $.sendHttp({
            path: SERVER_PATH.NOTICE_WRITE_IMG,
            data: {
              loginId: id,
              title: title,
              content: content,
              file: imgSrc
            },
            succ: function (data) {

            },
            error: function () {

            }
          });
        } else {
          $.sendHttp({
            path: SERVER_PATH.NOTICE_WRITE,
            data: {
              loginId: id,
              title: title,
              content: content
            },
            succ: function (data) {
              alert('작성 완료');
              M.page.html('./list.html');
            },
            error: function () {
              alert('작성 실패');
            }
          });
        }
    },

    inputModify : function () {
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          loginId: M.data.global("loginId"),
          seqNo: M.data.global("seqNo")
        },
        succ: function (data) {
          self.els.$title.val(data.title);
          self.els.$content.val(data.content);

          if ("imgUrl" in data) {
            self.els.$imgSrc.attr("placeholder", data.imgUrl.substring(42));
          }
        },
        error: function () {
          alert('게시물을 확인할 수 없습니다.');
        }
      });
    }
  };
  window.__page__ = page;
})(jQuery, M,  __config__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

  // 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);