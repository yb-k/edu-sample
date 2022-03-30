/**
 * @file : 메인 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, SERVER_PATH, window) {
  var checkId;
  var page = {
    els: {
      $announcementBtn: null,
      $btnTxt: null,
      $userInfoBtn: null
    },
    data: {},
    init: function init() {
      this.els.$announcementBtn = $('#announcementBtn');
      this.els.$btnTxt = $('#btn-txt1');
      this.els.$userInfoBtn = $('#userInfoBtn');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('userIdSend'),
          "lastSeqNo" : "100000000",
          "cnt" : "4",
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<li data='" + item.seqNo + "' class='ellipsis'>";
            items += item.title;
            items += "</li>";
            
            
         

          });
          $(".announcementFour").html(items);
          
        },
        error: function (data) {
          console.log(data);
          alert(" 틀렸습니다.");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      $('.announcementFour').on('click', '.ellipsis', function () {
        var seqNo = $(this).attr('data');
        console.log(seqNo);

        M.data.global({
          'seqNoSend': seqNo
        });
        console.log(M.data.global('seqNoSend'));
        self.bulletinDetail();
      })

      //  버튼 클릭시 동작

      var self = this;

      this.els.$userInfoBtn.on('click', function () {
        M.page.html('./userInfo.html');
      })
      this.els.$announcementBtn.on('click', function () {
        M.page.html('./list.html');
      })
      this.els.$btnTxt.on('click', function () {
        M.page.html('./list.html');
      })


    },

    bulletinDetail: function () {
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('userIdSend'),
          "seqNo": M.data.global('seqNoSend')
        },
        succ: function (data) {

          M.page.html('./detail.html');



        },
        error: function (data) {
          console.log(data);
          alert("게시글 작성 실패");
        }
      });
    },
    





  };
  window.__page__ = page;
})(jQuery, M, __mnet__,  __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);