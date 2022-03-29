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
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$nextBtn.on('click', function(){
        self.inputOk();
      });      
    },
    inputOk : function(){
      var nm = this.els.$userNmIpt.val().trim();
      var regNm = /^[가-힣a-zA-Z]{2,}$/;
      var gender = $("input:radio[name='gender']:checked").val();
      var year = this.els.$year.val().trim();
      var month = this.els.$month.val().trim();
      var date = this.els.$date.val().trim();
      
      var today = new Date();
      var todayYear = today.getFullYear(); 
      var todayMonth = today.getMonth() + 1; 
      var todayDate = today.getDate();
  
      var cp = this.els.$cellPhoneIpt.val().trim();
      var regCp = /^01(?:0|1|[6-9])([0-9]{3,4})([0-9]{4})$/;

      if(module.isEmpty(nm)){
        return alert('이름을 입력해주세요.');
      }
      if(!regNm.test(nm)){
        return alert('이름은 2자 이상의 한글 또는 영문으로만 정확히 입력해주세요.');
      }
      if(module.isEmpty(gender)){
        return alert('성별을 선택해주세요.');
      }
      if(module.isEmpty(year)){
        return alert('생년을 입력해주세요.');
      }
      if(year < 1700){
        return alert('생년을 정확히 입력해주세요.');        
      }
      if(todayYear < year){
        return alert('현재보다 미래인 년은 생년에 적합하지 않습니다.');
      }
      if(module.isEmpty(month)){
        return alert('생월을 입력해주세요.');
      }
      if(month > 12 || month == 0){
        return alert('생월을 정확히 입력해주세요.');        
      }
      if(todayYear == year){
        if(todayMonth < month){
          return alert('현재보다 미래인 월은 생월에 적합하지 않습니다.');
        }
      }      
      if(module.isEmpty(date)){
        return alert('생일을 입력해주세요.');
      }
      if(date > 31 || date == 0){
        return alert('생일을 정확히 입력해주세요.');        
      }
      if((month==4 || month==6 || month==9 || month==11) && date == 31){
        return alert(month+'월은 31일이 존재하지 않습니다.');
      }
      if (month == 2) {
        var noDate = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
           if (date>29 || (date==29 && !noDate)) {
              return alert(year + '년 2월은 ' + date + '일이 존재하지 않습니다.');
           }
      }     
      if(todayYear == year){
        if(todayMonth >= month){
          if(todayDate < date){
            return alert('현재보다 미래인 일은 생일에 적합하지 않습니다.');
          }
        }
      }
      if(module.isEmpty(cp)){
        return alert('휴대폰 번호를 입력해주세요.');
      }
      if(!regCp.test(cp)){
        return alert('휴대폰 번호는 숫자로만 정확히 입력해주세요.');
      }
      M.page.html('./join3.html', {
        param : {
          userNm : nm,
          gender : gender,
          year : year,
          month : month,
          date : date,
          cellPhone	: cp
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