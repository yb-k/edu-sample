/**
 * @file : join2.js 개인정보 입력 페이지1
 * @author : 심수현
 * @date : 2022-03-24
 */

 (function ($, M, module, window){
    var page = {
      els:{
          $userNm: null,
          $gender: null,
          $year: null,
          $month: null,
          $date: null,
          $cellPhone: null,
          $nextBtn: null
      },
      data: {},
      init: function init(){
          this.els.$userNm = $('#userNm');
          this.els.$gender = $("input:radio[name='gender']");
          this.els.$year = $('#year');
          this.els.$month = $('#month');
          this.els.$date = $('#date');
          this.els.$cellPhone = $('#cellPhone');
          this.els.$nextBtn = $('#nextBtn');
      },
      initView: function initView(){
        // 화면에서 세팅할 동적 데이터
      },
      initEvent: function initEvent(){
        // DOM Event 바인딩
        var self = this;
        module.onKeyupNum(this.els.$cellPhone);
        this.els.$nextBtn.on('click', function(){
            self.nextBtn();
        });
      },
      
      nextBtn: function(){
          var userNm = this.els.$userNm.val().trim();
          var gender = $('input:radio[name=gender]:checked').val();
          var year = this.els.$year.val().trim();
          var month = this.els.$month.val().trim();
          var date = this.els.$date.val().trim();
          var cellPhone = this.els.$cellPhone.val().trim();
        
          if(userNm == ''){
              return alert("이름을 입력해 주세요.");
          }
          if(!($("input:radio[name='gender']").is(':checked'))){
              return alert("성별을 선택해 주세요.");
          }
          if(year == '' || month == '' || date == ''){
              return alert("생년월일을 모두 입력해 주세요.");
          }
          if(cellPhone == ''){
              return alert("휴대폰 번호를 입력해 주세요.");
          }

          M.page.html({
              url: "./join3.html",
              param: {
                  "userNm": userNm,
                  "birthDate": year+month+date,
                  "gender": gender,
                  "cellPhone": cellPhone
              }
          });
          
      }
  //    method: {},
     
    };
    window.__page__ = page;
  })(jQuery, M, __util__, window);
  
  (function($,M,pageFunc,window){
    M.onReady(function(){
      pageFunc.init(); // 최초 화면 초기화
      pageFunc.initView();
      pageFunc.initEvent();
    });
    
  // 해당 페이지에서 실제 호출
  })(jQuery, M, __page__,window);