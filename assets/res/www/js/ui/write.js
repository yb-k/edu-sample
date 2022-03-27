/**
 * @file : write.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, MNet, config, SERVER_PATH, window){
  var page = {
    els: {
      $imgBtn: null,
      $loginId: null,
      $write: null,
      $title: null,
      $content: null,
      $loginId: null
    },
    data: {},
    init : function init() {
      this.els.$imgBtn = $('.btn-line'); //이미지 선택
      this.els.$write = $('#write'); //작성하기 버튼
      this.els.$title = $('#title-write'); //제목
      this.els.$content = $('#content-write'); //내용
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
      
      this.els.$write.on('click', function(){
      if(M.data.global("seqNum") == ''){
        self.write();
      }else{
        self.modify();
      }
        
      });
    },
    
    modify:function(){
      var self = this;
      var id = M.data.global("loginId"); //로그인 아이디
      var title = this.els.$title.val().trim(); //제목
      var content = this.els.$content.val().trim(); //내용
      var seqNum = M.data.global("seqNum");
      
      MNet.sendHttp({
              path: SERVER_PATH.NOTICE_UPDATE,
              data:{
                loginId : id,
                seqNo: seqNum,
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
    
    write:function(){
      var self = this;
      var id = M.data.global("loginId"); //로그인 아이디
      var title = this.els.$title.val().trim(); //제목
      var content = this.els.$content.val().trim(); //내용
      console.log(id);
      if(title == ''){
        return alert('제목을 입력해주세요.');
      }
      if(content == ''){
        return alert('내용을 입력해주세요.');
      }
      
      MNet.sendHttp({
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
      return true;
    },
    
    
  };
  
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);