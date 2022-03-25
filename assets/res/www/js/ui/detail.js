/**
 * @file : detail.js 게시글 수정/삭제 페이지
 * @author : 심수현
 * @date : 2022-03-25
 */

 (function ($,M,MNet,SERVER_PATH,window){
    var page = {
      els:{
          $title: null,
          $content: null,
          $regDate: null,
          $imgUrl: null,
          $modiBtn: null,//수정
          $delBtn: null//삭제
      },
      data: {},
      init: function init(){
          this.els.$title = $('#title');
          this.els.$content = $('#content');
          this.els.$regDate = $('#regDate');
          this.els.$imgUrl = $('#imgUrl');
          this.els.$modiBtn = $('#modiBtn');
          this.els.$delBtn = $('#delBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
        var self = this;
        MNet.sendHttp({
            path: SERVER_PATH.NOTICE_DETAIL,
            data:{
                loginId: M.data.global('loginId'),
                seqNo: M.data.global('seqNo')
            },
            succ: function(data){
                console.log(data.isMyNoticeYn);
                if(data.isMyNoticeYn == 'Y'){
                    $('#modiBtn').show();
                    $('#delBtn').show();
                }
                else{
                    $('#modiBtn').hide();
                    $('#delBtn').hide();
                }
                self.els.$title.html(data.title);
                self.els.$content.html(data.content);
                self.els.$regDate.html(data.regDate);

                if("imgUrl" in data){
                    self.els.$imgUrl.attr("src", data.$imgUrl);
                }
            }
        });
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$modiBtn.on('click', function(){
            self.modify();
        });
        this.els.$delBtn.on('click', function(){
            self.delete();
        });
      },

      //게시글 수정
      modify: function(){
        M.page.html({
            url: "./write.html",
            param:{
                "modify": 1
            }
        })
      },
      //게시글 삭제
      delete: function(){
        MNet.sendHttp({
            path: SERVER_PATH.NOTICE_DETAIL,
            data:{
                loginId: M.data.global("loginID"),
                seqNo: M.data.global("seqNo")
            },
            succ: function(data){
                alert("게시글이 삭제되었습니다.");
                M.page.html("./list.html");
            }
        });
      }
      
  //    method: {},
    };
    window.__page__ = page;
  })(jQuery,M,__mnet__,__serverpath__,window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);