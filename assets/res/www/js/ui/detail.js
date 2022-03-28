/**
 * @file : 게시글 상세페이지
 * @author : 조은진
 * @date : 2022-03-25
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els:{
      $title : null,
      $regDate : null,
      $content : null,
      $imgUrl : null,
      $modiBtn : null,
      $delBtn : null
    },
    data: {},
    init: function init(){
      this.els.$title = $('#title');
      this.els.$regDate = $('#regDate');
      this.els.$content = $('#content');
      this.els.$imgUrl = $('#imgUrl');
      this.els.$modiBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
    },
    initView: function initView(){
    // 화면에서 세팅할 동적 데이터
      var self = this;
      var seqNum = M.data.global("seqNum");
      this.els.$title.val(M.data.global("title"));
      $.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          loginId: M.data.global("loginId"),
          seqNo: seqNum
        },
        succ: function (data) {
          if (data.isMyNoticeYn == 'Y') { // 본인 게시물일 때만 버튼 활성화
            document.querySelector('.none').style.setProperty('display', 'block', 'important');
          }
          var year = data.regDate.substring(0,4);
          var month = data.regDate.substring(4,6);
          var day = data.regDate.substring(6,8);
  
          self.els.$title.text(data.title);
          self.els.$content.text(data.content);
          self.els.$regDate.text(year+'년 '+month+'월 '+day+'일');
          
          M.data.global("title", data.title);
          M.data.global("content", data.content);
          M.data.global("imgUrl", data.imgUrl);
          
          if ("imgUrl" in data) {
            items += "<div class='img-wrap'>";
            items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
            items += "</div>";
            var split = data.imgUrl.lastIndexOf('/');
            var imgName = data.imgUrl.toString().substring(split + 1, );
            M.data.global("imgName", imgName);
          }
          console.log(seqNum);
          console.log(data.imgUrl);
        },
        error: function() {
            alert('게시물을 확인할 수 없습니다.');
        }
      });
    },
    initEvent: function initEvent(){
      // DOM Event 바인딩
      this.els.$modiBtn.on('click', function() {
        var self = this;
        var id = M.data.global('loginId');
        var seqNo = M.data.global('seqNum');
        var title = M.data.global('title');
        var content = M.data.global('content');
        M.page.html({
          path : './write.html',
          param : {
            "loginId": id,
            "title" : title,
            "content" : content,
            "seqNo" : seqNo
          }
        });
      });
      this.els.$delBtn.on('click', function() {
        var num = M.data.global("seqNum");
        var self = this;
        $.sendHttp({
          path: SERVER_PATH.NOTICE_DELETE,
          data: {
            loginId: M.data.global("loginId"),
            seqNo: num
          },
          succ: function (data) {
            console.log(data);
            M.page.html({
              url: "./list.html",
              action: "CLEAR_TOP"
            });
            return true;
          },
          error: function() {
            console.log(data);
            alert('게시글을 삭제하지 못했습니다.');
          }
        });
    });
  },

    };
    window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);