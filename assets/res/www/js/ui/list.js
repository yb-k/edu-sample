/**
 * @file : list.js 공지사항 리스트 페이지
 * @author : 심수현
 * @date : 2022-03-24
 */

 (function ($,M,CONFIG,window){
    var CONSTANT = CONFIG.CONSTANT;
    var SERVER_PATH = CONFIG.SERVER_PATH;
    var page = {
      els:{
          $writeBtn: null,
          $detail: null,
          $viewMoreBtn: null,
          $topBtn: null,
          $backBtn: null
      },
      data: {
        "loginId": M.data.global('loginId'),
        "lastSeqNo" : "0",
        "cnt" : "4",
      },
      init: function init(){
          this.els.$writeBtn = $('#writeBtn');
          this.els.$detail = $('.metro-wrap');
          this.els.$viewMoreBtn = $('#viewMoreBtn');
          this.els.$topBtn = $('#topBtn');
          this.els.$backBtn = $('#backBtn');
      },
      initView: function initView() {
        // 화면에서 세팅할 동적데이터
        // 게시글 리스트 출력
        this.drawNotice()
      },
      drawNotice: function(){
        var self = this;
        $.sendHttp({
          path: SERVER_PATH.NOTICE_LIST,
          data: self.data,
          succ: function (data) {
            var items = "";
            self.data.lastSeqNo = data.lastSeqNo;
            $.each(data.list, function (index, item) {
              items += "<li data='"+item.seqNo+"'class='detailContent'>";
              items += "<div class='thumbnail-wrap'>";
              items += "<div class='thumbnail'>";
              if (item.imgUrl) {
                items += "<img src='";
                items += item.imgUrl;
                items += "' alt=''/>";
              }
              items += "</div>";
              items += "<span class='label-info none'>";
              items += "</span>";
              items += "</div>";
              items += "<div class='info-box'>";
              items += "<div class='info-box-top'>";
              items += "<strong class='ellipsis_1'>";
              items += item.title;
              items += "</strong>";
              items += "<div class='info-box-btm'>";
              items += "<p style='text-align:left;' class='ellipsis_1'>";
              items += item.content;
              items += "</p>";
              items += "</div>";
              items += "</div>";
              items += "</li>";
            });
            $(".metro-wrap").append(items);
          }
        });
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$backBtn.on('click', function(){
           M.page.back();
        })
        //게시글 작성
        this.els.$writeBtn.on('click', function(){
            M.page.html("./write.html");
        });
        
        //게시글 상세
        $('.metro-wrap').on('click', '.detailContent', function () {
          console.log(this)
          var seqNo = $(this).attr('data');
          console.log(seqNo);
          M.data.global("seqNo", seqNo)
          $.sendHttp({
            path: SERVER_PATH.NOTICE_DETAIL,
            data: {
              loginId: M.data.global("loginId"),
              seqNo: M.data.global("seqNo")
            },
            succ: function (data) {
              M.page.html('./detail.html');
            }
          });
        })
        //더보기
        this.els.$viewMoreBtn.on('click', function(){
          self.drawNotice();
        });
        //목록 최상단으로
        this.els.$topBtn.on('click', function(){
          $(window).scrollTop(0);
        });
        
      },
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery,M,__config__,window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);