/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지 단위 모듈
(function ($, M, window){
  var page = {
    els: {
      
    },
    data: {},
    init : function init() {
      
    },
   
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
      
      
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      $('#btn-submit').on('click',function(){
      console.log(self.data.imgPath);
      self.writeWithUpload();
      })
    },
    //파일 업로드가 포함된 게시글 등록
    writeWithUpload: function writeWithUpload(title, content, file){
    var body = [
      {name:"file", content: imgPath, type:"FILE"},
      {name:"content", content: content, type:"TExT"},
      {name:"title", content:title, type:"TExT"}
    ]}
  };
  
  window.__page__ = page;
})(jQuery, M, window);

// 해당 페이지에서 실제 호출
(function($, M, pageFunc, window) {
  
  M.onReady(function() {
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.intitEvent();
  });
})(jQuery, M, __page__, window);