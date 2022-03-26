/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $titleIpt: null,
      $contentIpt: null,
      $fileIpt: null,
      $fileBtn: null,
      $writeBtn: null,
      $backBtn: null,
    },
    data: {},
    init: function init() {
      this.els.$titleIpt = $('#title');
      this.els.$contentIpt = $('#content');
      this.els.$fileIpt = $('#file');
      this.els.$fileBtn = $('#fileBtn');
      this.els.$writeBtn = $('#writeBtn');
      this.els.$backBtn = $('#backBtn');
    },

    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      this.els.$titleIpt.val(M.data.param('title'));
      this.els.$contentIpt.val(M.data.param('content'));
      this.els.$fileIpt.val(M.data.param('imgName'));
    },

    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$fileBtn.on('click', function () {
        self.getfile();
      });
      
      this.els.$backBtn.on('click', function () {
              M.page.back();
            });

      this.els.$writeBtn.on('click', function () {
        if (M.data.global('seqNo') == '') {
          if(self.data.imgPath == '' || self.data.imgPath == null) {
            self.write();
          } else {
            console.log(self.data.imgPath);
            self.writeWithUpload(self.data.imgPath);
          }
        } else {
            console.log(M.data.param('seqNo'));
            if(self.data.imgPath == '' || self.data.imgPath == null) {
              self.modify();
            } else {
              console.log(self.data.imgPath);
              self.modifyWithUpload(self.data.imgPath);
            }          
        }
      });
    },
    
    modifyWithUpload: function modifyWithUpload(imgPath) {
              var self = this;
              var id =  M.data.global('myId');
              var title = this.els.$titleIpt.val();
              var content = this.els.$contentIpt.val();
              var seqNo = M.data.global('seqNo'); 
              if (title == '') {
                      return alert('제목을 입력해주세요');
                    }
                    if (content == '') {
                      return alert('내용을 입력해주세요');
                    }
              var body = [
                { name: "file", content: imgPath, type: "FILE" },
                { name: "content", content: content, type: "TEXT" },
                { name: "title", content: title, type: "TEXT" },
                { name: "loginId", content: id, type: "TEXT" },
                { name: "seqNo", content: seqNo, type: "TEXT" },
              ]
              console.log(body);
              // { content: "파일업로드", type: "TEXT" },
            // { name: "imgs", content: "test.zip", type: "FILE" },
              $.fileHttpSend({
                path: SERVER_PATH.NOTICE_UPDATE_IMG,
                body:body,
                succ: function () {
                  console.log(body);
                  alert('성공');
                  M.page.html({
                    url:'./list.html',
                    action: 'CLEAN_TOP',});
                },
                progress: function () {
                  console.log(body);
                },
                error : function () {
                  console.log(body);
                  alert('실패쓰');
                }
              })
            },
    
    
    writeWithUpload: function writeWithUpload(imgPath) {
          var self = this;
          var id =  M.data.global('myId');
          var title = this.els.$titleIpt.val();
          var content = this.els.$contentIpt.val();
          if (title == '') {
                  return alert('제목을 입력해주세요');
                }
                if (content == '') {
                  return alert('내용을 입력해주세요');
                }
          var body = [
            { name: "file", content: imgPath, type: "FILE" },
            { name: "content", content: content, type: "TEXT" },
            { name: "title", content: title, type: "TEXT" },
            { name: "loginId", content: id, type: "TEXT" },
          ]
          console.log(body);
          // { content: "파일업로드", type: "TEXT" },
        // { name: "imgs", content: "test.zip", type: "FILE" },
          $.fileHttpSend({
            path: SERVER_PATH.NOTICE_WRITE_IMG,
            body:body,
            succ: function (body) {
              console.log(body);
              alert('성공');
              M.page.html({
                url:'./list.html',
                action: 'CLEAN_TOP',});
            },
            progress: function (body) {
              console.log(body);
            },
            error : function (body) {
              console.log(body);
              alert('실패쓰');
            }
          })
        },
    
    getfile: function () {
      var self = this; 
        M.media.picker({
          mode: "SINGLE",
          media: "PHOTO",
          column: 3,
          callback: function( status, result ) {
            if(status == 'SUCCESS'){
               self.data.imgPath = result.fullpath;      
               self.els.$fileIpt.val(result.name);   
            }else{
              self.data.imgPath = null;
              self.els.$fileIpt.val('');
            }
          }        
        });
    },

     modify: function () {
       var self = this;
       var id =  M.data.global('myId');
       var title = this.els.$titleIpt.val();
       var content = this.els.$contentIpt.val();
       var seqNo = M.data.global('seqNo');
       if (title == '') {
               return alert('제목을 입력해주세요');
             }
             if (content == '') {
               return alert('내용을 입력해주세요');
             }
       console.log(seqNo);
        $.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE,
        data: {
          'loginId': M.data.global('myId'),
          'seqNo': M.data.global('seqNo'),
          'title': title,
          'content': content,
        },
        succ: function (data) {
          alert('어디한번 수정에 성공해보았습니다');
          M.page.html('./list.html');
          M.data.removeGlobal('seqNo');
        },
        error: function (data) {
          console.log(data);
          alert('어림도없지 에러다');
        }
      });

    },

    write: function () {
      var self = this;
      var title = this.els.$titleIpt.val();
      var content = this.els.$contentIpt.val();
      console.log(M.data.global('seqNo'));
      if (title == '') {
        return alert('제목을 입력해주세요');
      }
      if (content == '') {
        return alert('내용을 입력해주세요');
      }
      $.sendHttp({
        path: SERVER_PATH.NOTICE_WRITE,
        data: {
          loginId: M.data.global('myId'),
          title: title,
          content: content,
        },
        succ: function (data) {
          console.log(data);
          alert('글쓰기가 완료되었습니다.');
          M.page.html({
            url: "./list.html",
            action: 'CLEAN_TOP',
          });
        },
        error: function (data) {
          console.log(data);
          alert('글쓰기 실패입니다. 다시 작성해 주세요.');
        }
      });
    }

  };

  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);