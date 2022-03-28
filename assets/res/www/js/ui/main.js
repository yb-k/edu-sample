/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window){

  var id;
  var seqNum=[];
  var page = {
    els:{
      $dataMore : null,
      $btnMenu: null,


    },
    data: {},
    init: function init(){
      this.els.$btnMenu =  $("button[class='btn-menu r-fix']");
      this.els.$dataMore = $("[data-more]");
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }

    },
    
   
    initView: function initView(){
      // 화면에서 세팅할 동적데이터



      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          loginId: id,
          lastSeqNo: "0",
          cnt: "4",
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function(index, item) {
            items += "<li class='ellipsis' id='notice"+ index + "'>";
            items += item.title;
            items += "</li>";
            seqNum[index] = item.seqNo;
        
            $(".ellipsis").attr("id", "notice"+index);
          });
          $(".noti-wrap").html(items);
          
        },

      });
    },
    initEvent: function initEvent(){
      // initEvent 바인딩

      $(".noti-wrap").on('click', "#notice0", function(){
        M.page.html("./detail.html", {
          'param':{
            'seqNum':seqNum[0]
          }
        });
      });
      $(".noti-wrap").on('click', "#notice1", function(){
        M.page.html("./detail.html", {
          'param':{
            'seqNum':seqNum[1]
          }
        });
      });
      $(".noti-wrap").on('click', "#notice2", function(){
        M.page.html("./detail.html", {
          'param':{
            'seqNum':seqNum[2]
          }
        });
      });
      $(".noti-wrap").on('click', "#notice3", function(){
        M.page.html("./detail.html", {
          'param':{
            'seqNum':seqNum[3]
          }
        });
      });


      this.els.$btnMenu.on('click', function(){
        M.page.html('./userInfo.html');

      });

      this.els.$dataMore.on('click', function(){
        M.page.html('./list.html');
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window){
  M.onReady(function() {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);