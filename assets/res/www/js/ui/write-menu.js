/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var page = {
    els:  {
      $iptTitle : null,
      $iptContent : null,
      $iptPrice : null,
      $iptImg : null,
      $btnLine : null,
      $btnPoint : null,
      $seqNo : null,
    },
    data: {
      title : '',
      content : '',
      imgPath : '',
    },
    init: function init(){
      this.els.$iptTitle = $('#ipt-title');
      this.els.$iptContent = $('#ipt-content');
      this.els.$iptPrice = $('#ipt-price');
      this.els.$iptImg = $('#ipt-img');
      this.els.$btnLine = $('.btn-line');
      this.els.$btnPoint = $('.btn-point-color');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      var self = this;
      var id = M.data.global('id');
      var sn = M.data.param('seqNo');
      console.log(sn);
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      if(!module.isEmpty(sn)){
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: id,
            seqNo	: sn,
          },
          succ: function (data) {
            self.els.$iptTitle.val(data.title);
            self.els.$iptContent.val(data.content);
            if(!module.isEmpty(data.imgUrl)){
              self.els.$iptImg.val(data.imgUrl.substring(data.imgUrl.lastIndexOf("/")+1));
            }
            console.log(data.imgUrl)
            console.log(self.els.$iptImg.val());
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });        
      }
    },
    initEvent : function initEvent(){
      var self = this;
      
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      this.els.$btnLine.on('click', function(){
      // 이미지선택
        self.setImagePath();
      });
      this.els.$btnPoint.on('click', function(){
      // 작성버튼
        var imgN = self.els.$iptImg.val().trim();
        var title = self.els.$iptTitle.val().trim();
        var content = self.els.$iptContent.val().trim();
        var imgPath = "/storage/emulated/0/Pictures/" + imgN;
        var sn = M.data.param('seqNo');
        if(!module.isEmpty(sn)){
          if(module.isEmpty(title)){
            return alert('제목을 입력해주세요.');
          }
          if(module.isEmpty(content)){
            return alert('내용을 입력해주세요.');
          }
          console.log(imgN);
          console.log(self.data.imgPath);
          if(!module.isEmpty(self.els.$iptImg)){
            if(!module.isEmpty(self.data.imgPath)){ // 새로 이미지파일을 설정했다면
              self.modifyWithUpload(title, content, self.data.imgPath);
            }else{ // 기존 등록한 이미지를 사용하려면
            ////////////////////////////주소 조정 필요
              self.modifyWithUpload(title, content, imgPath);
            }
          }else{
            MNet.sendHttp({
              path : SERVER_PATH.NOTICE_UPDATE,
              data: {
                loginId : M.data.global('id'),
                seqNo : sn,
                title : title,
                content : content,
              },
              succ: function(data){
                if(data.rsltCode == '0000'){
                  alert('수정 완료');
                  var pagelist = M.info.stack();
                  M.page.remove(pagelist[1].key);
                  M.page.replace('./list.html');
                }else{
                  return alert('수정에 실패하셨습니다.');
                }
              }
            });          
          }
        
        }else{
          self.writeOk();
        }
      });
    },
    writeOk : function(){
      var self = this;
      var title = self.els.$iptTitle.val().trim();
      var content = self.els.$iptContent.val().trim();
      var imgN = self.els.$iptImg.val().trim();
      if(module.isEmpty(title)){
        return alert('제목을 입력해주세요.');
      }
      if(module.isEmpty(content)){
        return alert('내용을 입력해주세요.');
      }
      if(!module.isEmpty(imgN)){
        self.writeWithUpload(title, content, self.data.imgPath);
      }else{
        MNet.sendHttp({
          path : SERVER_PATH.NOTICE_WRITE,
          data: {
            loginId : M.data.global('id'),
            title : title,
            content : content,
          },
          succ: function(data){
            if(data.rsltCode == '0000'){
              alert('등록 완료');
              var pagelist = M.info.stack();
              console.log(pagelist);
              M.page.remove(pagelist[1].key);
              M.page.replace('./list.html');
            }else{
              return alert('등록에 실패하셨습니다.');
            }
          }
        });
      }
    },
    writeWithUpload: function writeWithUpload(title, content, imgPath) {
      var body = [
        { name: "file", content: imgPath, type: "FILE" },
        { name: "content", content: content, type: "TEXT" },
        { name: "title", content: title, type: "TEXT" },
        { name: "loginId", content: M.data.global('id'), type: "TEXT" },
      ]
      console.log(body);
      MNet.fileHttpSend({
        path: SERVER_PATH.NOTICE_WRITE_IMG,
        body: body,
        succ: function (head) {
          alert('이미지를 포함한 게시글 등록이 완료되었습니다.');
          M.page.replace('./list.html');
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);          
        },
        progress: function (head) {
          console.log(head);
          console.log(status);
        },
        error : function (head) {
          console.log(head);
          alert('등록 에러!');
        }
      })
    },  
    modifyWithUpload: function modifyWithUpload(title, content, imgPath) {
      var sn = M.data.param('seqNo');
      var body = [
        { name: "file", content: imgPath, type: "FILE" },
        { name: "content", content: content, type: "TEXT" },
        { name: "title", content: title, type: "TEXT" },
        { name: "loginId", content: M.data.global('id'), type: "TEXT" },
        { name: "seqNo", content: sn, type: "TEXT" },
      ]
      console.log(body);
      MNet.fileHttpSend({
        path: SERVER_PATH.NOTICE_UPDATE_IMG,
        body: body,
        succ: function () {
          alert('이미지를 포함한 게시글 수정이 완료되었습니다.');
          M.page.replace('./list.html');
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);       
        },
        progress: function () {
          console.log(head);
          console.log(status);
        },
        error : function () {
          console.log(head);
          alert('수정 에러!');
        }
      })
    },  
    setImagePath(){
      var self = this;
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        callback: function( status, result ) {
          if(status == 'SUCCESS'){
             self.data.imgPath = result.fullpath;      
             self.els.$iptImg.val(result.name);   
          }else{
            self.data.imgPath = null;
            self.els.$iptImg.val('');
          }
        }        
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__,__difinition__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);