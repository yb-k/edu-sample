/**
 * @file : 공지상세페이지
 * @author : 김예은
 * @date : 22.03.25
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $title: null,
      $regDate: null,
      $imgUrl: null,
      $content: null,
      $modiBtn: null,
      $delBtn: null,
      $loginId: null,
      $seqNum: null,
      $back: null
    },
    data: {},
    init: function init() {
      this.els.$title = $('#title');
      this.els.$regDate = $('#regDate');
      this.els.$imgUrl = $('#imgUrl');
      this.els.$content = $('#content');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
      this.els.$back = $("#back");
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      // this.els.$loginId = M.data.global("userId");
      // this.els.$seqNo = M.data.global("seqNo");
      $.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          loginId: M.data.global("userId"),
          seqNo: M.data.global("seqNo")
        },
        succ: function (data) {
          var items = "";
          items += "<div class='detail-tit'>";
          items += "<p id='title'>";
          items += data.title;
          items += "</p>";
          items += "<span id='regDate'>";
          items += data.regDate;
          items += "</span>";
          items += "</div>";
          items += "<div class='detail-cont'>";
          // 이미지 url
          if (data.imgUrl != null) {
            items += "<div class='img-wrap'>";
            items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
            items += "</div>";
            M.data.global("imgUrl", data.imgUrl);
            var split = data.imgUrl.lastIndexOf('/');
            var imgName = data.imgUrl.toString().substring(split + 1, );

            M.data.global("imgName", imgName);

            console.log(data.imgUrl);
            console.log(data.imgName); // undifined
            console.log(imgName);
          }
          items += "<p id='content'>";
          items += data.content;
          items += "</p>";
          items += "</div>";

          $("#notice-select").html(items);

          self.els.$title.html(data.title);
          self.els.$regDate.html(data.regDate);
          self.els.$content.html(data.content);

          if (data.isMyNoticeYn == 'N') {
            //self.els.$modiBtn.show();
            $('.btn-wrap').css('display', 'none ');
          }
        },
        error: function () {
          alert("데이터를 불러오지 못했습니다.");
        }
      })

      //if ($loginId.val() == )
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      var title = M.data.global('title');
      var content = M.data.global('content');
      var imgPath = M.data.global('imgUrl');
      var imgName = M.data.global('imgName');


      this.els.$back.on('click', function () {
        M.page.html('./list.html');
      })
      
      this.els.$modiBtn.on('click', function () {
        M.page.html({
          path: "./write.html",
          param: {
            modify: 1,
            title: title,
            content: content,
            imgPath: imgPath,
            imgName: imgName,
          }
        })
      })
      this.els.$delBtn.on('click', function () {
        M.pop.alert({
          title: '알림',
          message: '정말로 삭제하시겠습니까?',
          buttons: ['예', '아니오'],
          callback: function (index) {
            if (index == 1) {
              return false;
            }
            if (index == 0) {

              $.sendHttp({
                path: SERVER_PATH.NOTICE_DELETE,
                data: {
                  loginId: M.data.global("userId"),
                  seqNo: M.data.global("seqNo")
                },
                succ: function () {
                  alert("게시글이 삭제되었습니다.");
                  M.page.html("./list.html");
                },
                error: function () {
                  alert("삭제 실패");
                }
              });
            }
          }
        });
      })
    },
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);