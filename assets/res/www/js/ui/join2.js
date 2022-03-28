/**
 * @file :  join2.js
 * @author : 조은진
 * @date : 2022-03-24
 */
// 페이지 단위 모듈
(function ($, M, CONFIG, window){
  var page = {
    els: {
      $userNm: null,
      $gender: null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhone: null,
      $nextBtn: null
    },
    data: {},
    init : function init() {
       this.els.$userNm = $('#userNm'); 
       this.els.$gender = $('input:radio[name=gender]'); 
       this.els.$year = $('#year');
       this.els.$month = $('#month'); 
       this.els.$date = $('#date'); 
       this.els.$cellPhone = $('#cellPhone');
       this.els.$nextBtn = $('#nextBtn');
    },
    initView : function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent : function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$nextBtn.on('click', function(){
        self.nextPage();
      });
    },
    
    nextPage:function (){
      var self = this;
      var name = this.els.$userNm.val().trim(); //이름
      var gender = $("input:radio[name='gender']:checked").val();
      var year = this.els.$year.val().trim();
      var month = this.els.$month.val().trim();
      var date = this.els.$date.val().trim();
      var phone = this.els.$cellPhone.val().trim();
      var nextBtn = this.els.$nextBtn.prop('click');
      if(name == ''){  
        return alert('이름을 입력해주세요.');
      }
      if (!($('input:radio[name=gender]').is(':checked'))) {
        return alert('성별을 선택해주세요.'); 
      }
      if(year == ''){
        return alert('연도를 입력해주세요.'); 
      }
      if(month == ''){
        return alert('월을 입력해주세요.'); 
      }
      if(date == ''){
        return alert('날짜를 입력해주세요.'); 
      }
      if(phone == ''){
        return alert('휴대폰 번호를 입력해주세요.'); 
      }
      M.page.html({
        path: './join3.html',
        param:  {
          "userNm": name,
          "birthDate": year+month+date,
          "gender": gender,
          "cellPhone": phone,
        }
      });
    }
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