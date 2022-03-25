/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,CONFIG, module, MNet, SERVER_PATH, window){
  var ENV = CONFIG.ENV;
  var page = {
    els:  {
      $iptTitle : null,
      $iptContent : null,
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
            self.els.$iptImg.val(data.imgUrl);
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
      this.els.$btnLine.on('click', function(){
      // 이미지선택
        self.setImagePath();
      });
      this.els.$btnPoint.on('click', function(){
      // 작성버튼
        var title = self.els.$iptTitle.val().trim();
        var content = self.els.$iptContent.val().trim();
        var img = self.els.$iptImg.val().trim(); 
        var sn = M.data.param('seqNo');
        if(!module.isEmpty(sn)){
          if(module.isEmpty(title)){
            return alert('제목을 입력해주세요.');
          }
          if(module.isEmpty(content)){
            return alert('내용을 입력해주세요.');
          }
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
                M.page.html('./list.html');
              }else{
                return alert('수정에 실패하셨습니다.');
              }
            }
          });        
        }else{
          self.writeOk();
        }
      });
    },
    writeOk : function(){
      var self = this;
      var title = self.els.$iptTitle.val().trim();
      var content = self.els.$iptContent.val().trim();
      var img = self.els.$iptImg.val();
      if(module.isEmpty(title)){
        return alert('제목을 입력해주세요.');
      }
      if(module.isEmpty(content)){
        return alert('내용을 입력해주세요.');
      }
      if(!module.isEmpty(img)){
        self.writeWithUpload();
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
              M.page.html('./list.html');
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
      // { content: "파일업로드", type: "TEXT" },
    // { name: "imgs", content: "test.zip", type: "FILE" },
      $.fileHttpSend = function (options) {
        // body: [
        // { content: "파일업로드", type: "TEXT" },
        // { name: "imgs", content: "test.zip", type: "FILE" },
        // ],
        var fileUploadFinish = function (status, header, body, setting) {
          var _body = null;
          try {
            var _body = JSON.parse(body);
          } catch(e) {
            _body = body;
          }
          
          if (status == '200' && $.isFunction(options.succ) && _body.rsltCode == SERVER_CODE.SUC) {
            options.succ(_body.body);
          } else if ($.isFunction(options.error)) {
            options.error(status, body)
          }
        }
        var fileUploadProgress = function (total, current) {
          if($.isFunction(options.progress)) {
            options.progress(total, current)
          }
        }
        var _options = {
          url: ENV.UPLOAD_URL + options.path,
          header: options.header || {},
          params: options.params || {},
          body: options.body || [],
          encoding: "UTF-8",
          finish: fileUploadFinish,
          progress: fileUploadProgress
        }
        M.net.http.upload(_options);
      };
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_WRITE_IMG,
        body:body,
        succ: function () {
          console.log(arguments);
          if(data.rsltCode == '0000'){
            return alert('이미지 포함 등록 완료');
          }else{
            return alert('이미지등록에 실패하셨습니다.');
          }
        },
        progress: function () {
          console.log(arguments);
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
})(jQuery, M,__config__, __util__, __mnet__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);