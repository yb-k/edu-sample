/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, window){

  var page = {
    els:  {
      $userNmIpt : null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhoneIpt : null,
      $nextBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$userNmIpt = $('#userNm');
      this.els.$year = $('#year');
      this.els.$month = $('#month');
      this.els.$date = $('#date');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$nextBtn = $('#nextBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      $('.l-fix').on('click', function(){
        M.page.back();
      });
    },
    initEvent : function initEvent(){
      var self = this;
      module.onKeyupNum(self.els.$cellPhoneIpt);
      this.els.$nextBtn.on('click', function(){
        self.inputOk();
      });      
    },
    inputOk : function(){
      var nm = this.els.$userNmIpt.val().trim();
      var gender = $("input:radio[name='gender']:checked").val();
      console.log(gender);
      var year = this.els.$year.val().trim();
      var month = this.els.$month.val().trim();
      var date = this.els.$date.val().trim();
      var cp = this.els.$cellPhoneIpt.val().trim();
      var birthDate	= year + module.digitNum(month) + date;
      
      if(module.isEmpty(nm)){
        return alert('성명을 입력해주세요.');
      }
      if(module.isEmpty(gender)){
        return alert('성별을 선택해주세요.');
      }
      if(module.isEmpty(year)){
        return alert('연도를 입력해주세요.');
      }
      if(module.isEmpty(month)){
        return alert('달을 입력해주세요.');
      }
      if(module.isEmpty(date)){
        return alert('일자를 입력해주세요.');
      }
      if(year < 1000){
        return alert('연도는 4자리로 입력해주세요.');        
      }
      if(month > 12){
        return alert('달을 정확히 입력해주세요.');        
      }
      if(date > 31){
        return alert('일자를 정확히 입력해주세요.');        
      }
      if(module.timeCheck(birthDate,12)){
        return alert('생년월일을 정확히 입력해주세요.');
      }
      if(module.isEmpty(cp)){
        return alert('휴대폰번호를 입력해주세요.');
      }
      if(!module.isRightPhoneNum(cp)){
        return alert('휴대폰 번호를 정확히 입력해주세요.');
      }
      M.page.html('./join3.html', {
        param : {
          userNm : nm,
          gender : gender,
          birthDate :	birthDate,
          cellPhone	: cp,
        }
      });
    }
    
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);