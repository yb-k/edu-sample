/**
 * @file :
 * @author :
 * @date :
 */
// 페이지 단위 모듈
(function ($, M, MNet,SERVER_PATH, module, window) {
  var page = {
    els: {
      $modiBtn: null,
      $delBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
      this.els.$backBtn = $('#backBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      console.log(M.data.param('loginId'));
      console.log(M.data.param('seqNo'));
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.param('loginId'),
          "seqNo": M.data.param('seqNo'),
        },
        succ: function (data) {
          console.log(M.data.param('seqNo'));
          console.log(data);
          var items = "";
          items += "<div class='detail-tit'>";
          items += "<p id='title'>";
          items += data.title;
          items += "</p>";
          items += "<span id='regDate'>";
          items += data.regDate.substring(0, 4) + "년 " + data.regDate.substring(4, 6) + "월 " + data.regDate.substring(6, 8) + "일";
          items += "</span>";
          items += "</div>";
          items += "<div class='detail-cont'>";
          if (data.imgUrl != null) {
            items += "<div class='img-wrap'>";
            items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
            items += "</div>";
            M.data.global("imgUrl", data.imgUrl);
            var split = data.imgUrl.lastIndexOf('/');
            var imgName = data.imgUrl.toString().substring(split + 1,);
            M.data.global("imgName", imgName);
            console.log(imgName);
          }
          items += "<p id='content'>";
          var content = data.content;
          console.log(content);
          content = content.replace(/\r\n/ig, '<br>');
          content = content.replace(/\\n/ig, '<br>');
          content = content.replace(/\n/ig, '<br>');
          items += content;
          items += "<br><br><br>";
          items += "</p>";
          items += "</div>";
          M.data.global("isMyYn", data.isMyNoticeYn);
          M.data.global("title", data.title);
          M.data.global("content", data.content);

          $("#notice").html(items);
          console.log(M.data.global('isMyYn'));
          if (data.isMyNoticeYn == 'Y') {
            document.getElementById("myButtons").style.display = "";
          } else {
            document.getElementById("myButtons").style.display = "none";
          }
        },
        error: function (data) {
          console.log(data);
          alert("게시글 상세페이지를 가져오지 못했습니다.");
        },
      });
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;

      this.els.$delBtn.on('click', function () {
        self.del();
      });

      this.els.$modiBtn.on('click', function () {
        self.modify();
      });

      this.els.$backBtn.on('click', function () {
        M.page.back();
      });

    },

    modify: function () {
      var self = this;
      var id = M.data.global('myId');
      var seqNo = M.data.global('seqNo');
      var title = M.data.global('title');
      var content = M.data.global('content');
      var imgPath = M.data.global('imgUrl');
      var imgName = M.data.global('imgName');
      M.page.html({
        path: './write.html',
        param: {
          "title": title,
          "content": content,
          "seqNo": seqNo,
          "imgPath": imgPath,
          "imgName": imgName,
        }
      });

    },

    del: function () {
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_DELETE,
        data: {
          loginId: M.data.global('myId'),
          seqNo: M.data.global('seqNo'),
        },
        succ: function (data) {
          console.log(data);
          alert('게시글이 삭제되었습니다.');
          M.page.html({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        error: function (data) {
          console.log(data);
          alert('게시글 삭제 실패');
        }
      });
    }
  };

  window.__page__ = page;
})(jQuery, M, __mnet__,__serverpath__, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);