/**
 * @file : 게시글 작성 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var checkId;
  var page = {
    els: {
      $subjectIpt: null,
      $contentIpt: null,
      $file: null,
      $userId: null,
      $writeRegist: null,
      $btnIng: null,
      $imgName: null


    },
    data: {
      content: '',
      title: '',
      imgPath: ''

    },
    init: function init() {
      this.els.$subjectIpt = $('#subject');
      this.els.$contentIpt = $('#content');
      this.els.$file = $('#file');
      this.els.$writeRegist = $('#btn-submit');
      this.els.$btnIng = $('#btn-ing');
      this.els.$imgName = $('#ipt-img-name');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터

    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$writeRegist.on('click', function () {
        self.write();
      })

      this.els.$btnIng.on('click', function () {
        self.setImagePath();
      })

    },



    setImagePath() {
      var self = this;

      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        callback: function (status, result) {
          if (status == 'SUCCESS') {
            self.data.imgPath = result.fullpath;
            self.els.$imgName.val(result.name);
          } else {
            self.data.imgPath = null;
            self.els.$imgName.val('');
          }
        }
      });
    },




    // 게시글등록 

    write: function () {
      var self = this;
      var subjectIpt = this.els.$subjectIpt.val().trim(); // 게시글 목록 가져오기
      var contentIpt = this.els.$contentIpt.val().trim(); // 게시글 내용  가져오기
      var imgPath = self.data.imgPath;

      if (subjectIpt == '') {
        return alert('제목을 입력해주세요.');
      }
      if (contentIpt == '') {
        return alert('내용을 입력해주세요.');
      }
      console.log(self.data.imgPath);


      if (imgPath) {
        var body = [{
            name: "file",
            content: self.data.imgPath,
            type: "FILE"
          },
          {
            name: "content",
            content: contentIpt,
            type: "TEXT"
          },
          {
            name: "title",
            content: subjectIpt,
            type: "TEXT"
          },
          {
            name: "loginId",
            content: M.data.global('userIdSend'),
            type: "TEXT"
          },
        ]
        // { content: "파일업로드", type: "TEXT" },
        // { name: "imgs", content: "test.zip", type: "FILE" },
        $.fileHttpSend({
          path: SERVER_PATH.NOTICE_WRITE_IMG,
          body: body,
          succ: function () {
            console.log("ㅊ호");
            M.page.html('./list.html');
          },
          progress: function () {
            console.log("ㅍㅁㅁㅁㅁ");
            M.page.html('./main.html');
          },
          error : function(){
            console.log("에러입니다아아아");
           
          }
        })
      } else {

        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_WRITE,
          data: {
            "loginId": M.data.global('userIdSend'),
            "title": subjectIpt,
            "content": contentIpt,
          },
          succ: function (data) {
            console.log(data);

            M.page.html('./list.html');
          },
          error: function (data) {
            console.log(data);
            alert("게시글 작성 실패");
            M.page.html('./write.html');
          }
        });
      }






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