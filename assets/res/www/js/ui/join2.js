/**
 * @file : join2.js
 * @author : 김소담
 * @date : 2022-03-23
 */

 (function ($,M,window){
    var page = {
      els:{
          $userNm : null,
          $gender : null,
          $year : null,
          $month : null,
          $date : null,
          $cellPhone : null,
          $nextBtn : null
      },
      data: {},
      init: function init(){
          this.els.$userNm = $('#user-name');
          this.els.$gender = $('input:radio[name=gender]');
          this.els.$year = $('#year');
          this.els.$month = $('#month');
          this.els.$date = $('#date');
          this.els.$cellPhone = $('#cell-phone');
          this.els.$nextBtn = $('#next-btn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        this.els.$nextBtn.on('click', function() {
            self.nextBtn();
        })
      },
      
  //    method: {},
      nextBtn : function() {
          var name = this.els.$userNm.val().trim();
          var gender = $('input:radio[name=gender]:checked').val();
          var year = this.els.$year.val().trim();
          var month = this.els.$month.val().trim();
          var date = this.els.$date.val().trim();
          var phone = this.els.$cellPhone.val().trim();

          if (name == '') {
            return alert('이름을 입력해주세요.');
          }
          if (!($('input:radio[name=gender]').is(':checked'))) {
            return alert('성별을 선택해주세요.');
          }
          if (year == '' || month == '' || date == '') {
            return alert('생년월일을 입력해주세요.');
          }
          if (phone == '') {
            return alert('연락처를 입력해주세요.');
          }
    

          M.page.html({
            url: "./join3.html",
            param: {
                "userNm" : name,
                "birthDate" : year+month+date,
                "gender" : gender,
                "cellPhone" : phone
            }
          });
      }
    };
    window.__page__ = page;
  })(jQuery,M,window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M,__page__,window);