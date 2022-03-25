/**
 * @file : write.js
 * @author : 강샛별
 * @date : 22-03-24
 */
 
// 페이지 단위 모듈
(function ($, M, MNet, SERVER_PATH, window){
  var page = {
      els: {
        $title : null,
        $content : null,
        $img : null,
        $btnLine : null,
        $btnPointColor : null
      },
      data: {},
      init : function init() {
        this.els.$title = $('#title');
        this.els.$content = $('#content');
        this.els.$img = $('#img');
        this.els.$btnLine = $('.btn-line');
        this.els.$btnPointColor = $('.btn-point-color');
        
      },
      initView : function initView() {
        // 화면에서 세팅할 동적데이터
      }, 
      initEvent : function initEvent() {
        // Dom Event 바인딩
        var self = this;
        this.els.$btnLine.on('click', function(){
           
        });
        this.els.$btnPointColor.on('click', function(){
           self.btnPontColor();
        });
        
        // 파일 업로드가 포함된 게시글 등록
        writeWithUpload: function writeWithUpload(title, content, file) {
          var body = [
            {name: "file", content: imgPath, type:"FILE"},
            {name: "content", content: content, type:"TEXT"},
            {name: "title", content:title, type:"TEXT"}
          ]
          $.fileHttpSend({
             path: SERVER_PATH.NOTICE_WRITE_IMG,
             body:body,
             succ: function(){
              console.log(arguments);
             },
             progress: function(){
              console.log(arguments);
             }
          })
        };
        
//        setImagePath() {
//          M.media.picker({
//            mode: "SINGLE",
//            media: "PHOTO",
//            column: 3,
//            callback: function( status, result ) {
//              var self = this;
//              var fileList = [], fileCont = {};
//              if(status === 'SUCCESS') {
//                self.data.imgPath = result.fullpath;
//              }
//              
//              fileCont.name = 'file';
//              fileCont.content = ( M.navigator.os('android') ) ? result.fullpath : result.path; ;
//              fileCont.type = 'FILE';
//              fileList.push(fileCont);
//              M.net.http.upload({
//                url: "http://210.104.181.170:8280/board/attach",
//                header: {},
//                params: {index : "3"},
//                body: fileList,
//                encoding : "UTF-8",
//                finish : function(code, header, body, status, error) {
//                  if (status == 'SUCCESS') {
//                      M.pop.alert( status + " / " + header + body );
//                  }
//                  else
//                  {
//                      M.pop.alert( status + " / " + error );
//                  }
//               }
//             });
//            }
//          });
//        }
        
        
      },
      
      btnPontColor : function() {
        var title = this.els.$title.val().trim();
        var content = this.els.$content.val().trim();
        var img = this.els.$img.val();
        
        if(img == '') {
          MNet.sendHttp({
            path: SERVER_PATH.NOTICE_WRITE,
            data: {
              loginId : M.data.global('loginId'),
              title : title,
              content : content
            },
            succ: function (data) {
                alert('NOTICE_WRITE 성공');
                M.page.html("./list.html");
            },
            error : function(data) {
              alert('NOTICE_WRITE 실패');
            }
          });
        }else {
          MNet.sendHttp({
            path: SERVER_PATH.NOTICE_WRITE_IMG,
            data: {
              loginId : M.data.global('loginId'),
              title : title,
              content : content,
              file : img
            },
            succ: function (data) {
                alert('NOTICE_WRITE_IMG 성공');
                M.page.html("./list.html");
            },
            error : function(data) {
              alert('NOTICE_WRITE_IMG 실패');
            }
          });
        }
      }
     
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);