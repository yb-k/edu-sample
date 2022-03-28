/**
 * @file : write.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var SERVER_PATH = CONFIG.SERVER_PATH;
//  var imgPath1;
  var page = {
    els: {
      $imgBtn: null,
      $loginId: null,
      $write: null,
      $title: null,
      $content: null,
      $loginId: null,
      $imgName: null,
      $imgFile: null
      
    },
    
    data: {
      content: '',
      title: '',
      imgPath: ''
    },
    
    init : function init() {
      this.els.$imgBtn = $('.btn-line'); //이미지 선택
      this.els.$write = $('#write'); //작성하기 버튼
      this.els.$title = $('#title-write'); //제목
      this.els.$content = $('#content-write'); //내용
      this.els.$imgName = $('#imgName'); //파일명
      this.els.$imgFile = $('#imgFile'); //파일

    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
     id = M.data.global("loginId");
     this.els.$title.val(M.data.global("title"));
     this.els.$content.val(M.data.global("content"));
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      //이미지 선택 버튼
      this.els.$imgBtn.on('click', function(){
        self.selectFile();
      }),
      
      this.els.$write.on('click', function(){
        if(M.data.global("seqNum") == ''){
          self.write();
        }else if(self.data.imgPath == '' || self.data.imgPath == null ){
          self.modify();
        }else{
          self.modImg();
        }
      });
    },
    
    //이미지 선택하기
    selectFile:function(){
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
    
    //게시글 수정(파일 ver.)
    modImg:function(){
      var self = this;
      var id = M.data.global("loginId"); //로그인 아이디
      var title = this.els.$title.val().trim(); //제목
      var content = this.els.$content.val().trim(); //내용
      var seqNum = M.data.global("seqNum");
      var imgPath = M.data.global("imgPath");
      var body = [{
        name: "file",
        content: imgPath,
        type: "FILE"
      },
      {
        name: "content",
        content: content,
        type: "TEXT"
      },
      {
        name: "title",
        content: title,
        type: "TEXT"
      },
      {
        name: "loginId",
        content: id,
        type: "TEXT"
      },
      {
        name: "seqNo",
        content: seqNum,
        type: "TEXT"
      }]
      console.log(body);
          
      if (title == '') {
        return alert('제목은 비워둘 수 없습니다');
      }
      if (content == '') {
        return alert('내용은 비워둘 수 없습니다');
      }
      $.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE_IMG,
        body : body,
        succ: function(data){
          alert('파일이 수정되었습니다.');
          console.log(body);  
          M.data.removeGlobal("seqNum");
          M.page.html({
            path: './list.html'
          });
        },
        error:function(){
          console.log(body); 
          alert('다시 입력해주세요');
        }
      });
    },
    
    //게시글 수정(글 ver.)
    modify:function(){
      var self = this;
      var id = M.data.global("loginId"); //로그인 아이디
      var title = this.els.$title.val().trim(); //제목
      var content = this.els.$content.val().trim(); //내용
      var seqNum = M.data.global("seqNum");
      
      if (title == '') {
        return alert('제목은 비워둘 수 없습니다');
      }
      if (content == '') {
        return alert('내용은 비워둘 수 없습니다');
      }
      $.sendHttp({
        path: SERVER_PATH.NOTICE_UPDATE,
        data:{
          loginId : id,
          eqNo: seqNum,
          title : title,
          content : content
        },
        succ: function(data){
          alert('게시글이 수정되었습니다.');
          console.log(data);  
          M.data.removeGlobal("seqNum");
          M.page.html({
            path: './list.html'
          });
        },
        error:function(){
          console.log(data); 
          alert('다시 입력해주세요');
        }
      });

    },
    
    //게시글 쓰기
    write:function(){
      var self = this;
      var id = M.data.global("loginId"); //로그인 아이디
      var title = this.els.$title.val().trim(); //제목
      var content = this.els.$content.val().trim(); //내용
      var imgPath = "http://211.241.199.241:28040"+self.data.imgPath;

      console.log(id);
      if(title == ''){
        return alert('제목을 입력해주세요.');
      }
      if(content == ''){
        return alert('내용을 입력해주세요.');
      }
      console.log(self.data.imgPath);

      if (imgPath) {
        var body = [{
          name: "file",
          content: imgPath,
          type: "FILE"
        },
        {
          name: "content",
          content: content,
          type: "TEXT"
        },
        {
          name: "title",
          content: title,
          type: "TEXT"
        },
        {
          name: "loginId",
          content: id,
          type: "TEXT"
        }]
        console.log(body);
        $.fileHttpSend({
          path: SERVER_PATH.NOTICE_WRITE_IMG,
          body: body,
          succ: function () {
            alert('파일 업로드 성공');
            console.log(body);
            M.page.html('./list.html');
          },
          progress: function () {
            M.page.html('./main.html');
          },
        })

        }else{
          $.sendHttp({
            path: SERVER_PATH.NOTICE_WRITE,
            data:{
              loginId : id,
              title : title,
              content : content
            },
            succ: function(data){
              alert('게시글이 작성되었습니다.');
              console.log(data);  
              M.page.html({
                path: './list.html'
              });
              return true;
            },
            error:function(){
              console.log(data); 
              return alert('다시 입력해주세요');
            }
          });
        }
      return true;
    },
    
    
  };
  
  window.__page__ = page;
})(jQuery, M,  __config__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);