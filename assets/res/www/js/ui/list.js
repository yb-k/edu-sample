/**
 * @file : list.js
 * @author : 강샛별
 * @date : 22-03-25
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, CONFIG, window){
  var page = {
      els: {
        $infoBox : null,
        $addBtn : null,
        $topBtn : null,
        $writeBtn : null
      },
      data: {},
      init : function init() {
        this.els.$infoBox = $('.metro-wrap');
        this.els.$addBtn = $('.btn-wrap');
        this.els.$topBtn = $('.btn-top');
        this.els.$writeBtn = $('.btn-modify');
        
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터

      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$infoBox.on('click', function(){
           M.page.html('./detail.html'); 
        });
        this.els.$addBtn.on('click', function(){
           var id = M.data.global('loginId');
             MNet.sendHttp({
               path: SERVER_PATH.NOTICE_LIST,
               data: {
                 loginId : id,
                 lastSeqNo : '9999999',
                 cnt : '6'
               },
               succ: function (data) {
                var addCon = "";
                 $.each(data.list, function(index, item) { 
                  addCon += "<li id=" + item.seqNo + "><div class='thumbnail-wrap'>";
                  addCon += "<div class='thumbnail'>";
                  addCon += "<img src='" + item.imgUrl + "' alt=''/></div>";
                  addCon += "<span class='label-info none'>";
                  addCon += "<img src='" + item.imgUrl + "' alt='50%'/>";
                  addCon += "</span></div>";
                  addCon += "<div class='info-box'><div class='info-box-top'>";
                  addCon += "<strong class='ellipsis_1'>" + item.title + "</strong></div>";
                  addCon += "<div class='info-box-btm'>";
                  addCon += "<p style='text-align:left;' class='ellipsis_1'>" + item.content + "</p>";
                  addCon += "</div></div></li>";
                 });
                 $('#add').append(addCon);
                 $(".btn-point-color").css("display", "none");
                 
               },
               error : function(data) {
               }
             });
        });
        this.els.$topBtn.on('click', function(){
           $('.cont-wrap').scrollTop(0);
        });
        this.els.$writeBtn.on('click', function(){
           M.page.html('./write.html');
        });
      },
     
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);