/**
 * @file : 게시글 상세보기 페이지
 * @author : 최성호
 * @date : 22.03.25
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var seqNoSend;
  var  imgNameSend;
  var imgUrlSend;
  var asd;
  var imgNameStartSends = Array();
  var page = {
    els: {

      $delBtn: null,
      $imgUrl: null,
      $title: null,
      $content: null,
      





    },
    data: {},
    init: function init() {

      this.els.$updateBtn = $('#modiBtn');
      this.els.$delBtn = $('#delBtn');
      this.els.$imgUrl = $('#imgUrl');
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      





    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터

      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('userIdSend'),
          "seqNo": M.data.global('seqNoSend')
        },
        succ: function (data) {
          console.log(data);
          $('#title').text(data.title);
          $('#regDate').html(data.regDate);
          $('#content').html(data.content);
          seqNoNext = data.seqNo;
          console.log(data.imgUrl);
          if (data.imgUrl != null) {
            $('#imgUrl').attr('src', data.imgUrl);
          
          
            
            var imgNameStartSends =  data.imgUrl.split('/');
            for(var i=0; i<imgNameStartSends.length; i++ ){
              imgNameSend = imgNameStartSends[i];
            }
            




          }
          if (data.isMyNoticeYn == 'N') {
            $('.btn-wrap').css('display', 'none');
          }
        },
        error: function (data) {
          console.log(data);
          alert("실패");
        }
      });




    },



    initEvent: function initEvent() {
      var self = this;
      // Dom Event 바인딩
     

        this.els.$updateBtn.on('click', function () {
         self.updatePage();  
        })

      this.els.$delBtn.on('click', function () {
        self.delData();
      })
    },
    
    updatePage :function(){

      // 페이지 호출
      M.page.html({
        path: './write.html',
        param: {
          "seqNoNext": seqNoNext,
          "imgNameSend" : imgNameSend,
         
          
        }
      });
    },


    delData: function () {


      M.pop.alert({
        title: '공지',
        message: '정말 삭제하시겠습니까?',
        buttons: ['확인', '취소'],
        callback: function (index) {
          if (index == 0) {
            MNet.sendHttp({
              path: SERVER_PATH.NOTICE_DELETE,
              data: {
                "loginId": M.data.global('userIdSend'),
                "seqNo": M.data.global('seqNoSend')
              },
              succ: function (data) {
                console.log(data);
                M.page.html('./list.html');


              },
              error: function (data) {
                console.log(data);
                alert("삭제실패");
              }
            })
          } else {
            return false;
          }

        }
      });
    }








  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);