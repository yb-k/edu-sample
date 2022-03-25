/**
 * @file : 
 * @author :
 * @date : 
 */
// 페이지단위 모듈
(function ($, M, window) {


  var page = {
    els: {
      $userNmIpt: null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhoneIpt: null,
      $nextBtn: null,
      $gender: null,
      $man: null,
      $woman: null,

    },
    data: {},
    init: function init() {
      this.els.$userNmIpt = $('#userNm');
      this.els.$year = $('#year');
      this.els.$month = $('#month');
      this.els.$date = $('#date');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$nextBtn = $('#nextBtn');
      this.els.$gender = $('input:radio[name=gender]:checked');
      this.els.$man = $('#man');
      this.els.$woman = $('#woman');


    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      this.els.$nextBtn.on('click', function () {
        self.next();
      });

    },
    next: function () {
      var userNm = this.els.$userNmIpt.val().trim(); // 이름 가져오기
      var cellPhone = this.els.$cellPhoneIpt.val().trim(); // 전화번호 가져오기
      var year = this.els.$year.val().trim();
      var month = this.els.$month.val().trim();
      var date = this.els.$date.val().trim();
      var gender = this.els.$gender.val();

      if (userNm == '') {
        return alert("이름을 입력해주세요");
      }
      if (gender == '') {
        return alert("성별을 선택해주세요.");
      }

      if (year == '') {
        return alert("연도를 입력해주세요");
      }
      if (month == '') {
        return alert("달을 입력해주세요");
      }
      if (date == '') {
        return alert("날짜를 입력해주세요");
      }
      if (cellPhone == '') {
        return alert("전화번호를 입력해주세요");
      }
      if(year > 9999){
        return alert("연도를 4자리수로 입력해주세요");
      }
      if(month > 12 || month < 1){
        return alert("달을 1~12사이로 입력해주세요");
      } 
      if(date > 31 || date < 1){
        return alert("일을 1~31사이로 입력해주세요");
      }
      if(this.els.$man.is(':checked')){
        gender = 'M';
      }else if(this.els.$woman.is(':checked')){
        gender = 'F';
      }
      console.log(userNm,cellPhone,year,month,date,gender);
      M.page.html("./join3.html",{
        param:{
          userNm : userNm,
          cellPhone : cellPhone,
          year : year,
          month : month,
          date : date,
          gender : gender,

        }

     });

    },

  };
  window.__page__ = page;
})(jQuery, M, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);