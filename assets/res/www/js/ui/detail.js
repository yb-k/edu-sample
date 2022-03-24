/**
 * @file : detail.js
 * @author : 김소담
 * @date : 2022-03-24
 */

 (function ($,M, MNet, config, SERVER_PATH, window){
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
          this.els.$regDate = $('#reg-date');
          this.els.$content = $('#content');
          this.els.$imgUrl = $('#img-url');
          this.els.$modiBtn = $('#modi-btn');
          this.els.$delBtn = $('#del-btn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
        var self = this;
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("loginId"),
            seqNo: M.data.global("seqNo")
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

              if ("imgUrl" in data) {
                self.els.$imgUrl.attr("src", data.imgUrl);
              }
          },
          error: function() {
              alert('게시물을 확인할 수 없습니다.');
          }
        });

      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        this.els.$modiBtn.on('click', function() {
            M.page.html({
              path : './write.html',
              param : {
                "modify" : 1
            }
            });
        });
        this.els.$delBtn.on('click', function() {
            M.pop.alert({
                title: '삭제',
                message: '게시글을 삭제하시겠습니까?',
                buttons: ['취소', '삭제'],
                callback: function(index) {
                    if (index == 0) {
                        return false;
                    }
                    if (index == 1) {
                        MNet.sendHttp({
                            path: SERVER_PATH.NOTICE_DELETE,
                            data: {
                              loginId: M.data.global("loginId"),
                              seqNo: M.data.global("seqNo")
                            },
                            succ: function (data) {
                                M.page.html({
                                    url: "./list.html",
                                    actionType: "CLEAR_TOP"
                                  });
                            },
                            error: function() {
                                alert('실패');
                            }
                          });
                    }
                }
        });
        });
      },
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery,M, __mnet__, __config__, __serverpath__, window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);