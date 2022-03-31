/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, MNet, SERVER_PATH, module, M, window) {
  var page = {
    els: {
      $dataMore: null,
      $btnMenuRFix: null,
      $loginInfo: null
    },
    data: {},
    init: function init() {
      this.els.$dataMore = $("[data-more]");
      console.log(this.els.$dataMore);
      this.els.$btnMenuRFix = $("button[class='btn-menu r-fix']");
      console.log(this.els.$btnMenuRFix);
      this.els.$loginInfo = M.data.storage("AUTO_LOGIN_AUTH");
      console.log(this.els.$loginInfo);
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: M.data.global("LOGIN_INFO").id,
          lastSeqNo: "0",
          cnt: "4"
        },
        succ: function (data) {
          console.log(data);
          var array = data.list;
          var parent = $("ul[class = 'noti-wrap'] > li");
          for (var i = 0; i < array.length; i++) {
            parent[i].append(array[i].title);
            $(parent[i]).attr('id', array[i].seqNo);
          }
        }
      })
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      module.setEventAllIds(self.els.$dataMore, 'click', './list.html');
      module.setEventAllIds(self.els.$btnMenuRFix, 'click', './userInfo.html');
    },

  };
  window.__page__ = page;
})(jQuery, __mnet__, __serverpath__, __util__, M, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  M.onRestore(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  })
// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);