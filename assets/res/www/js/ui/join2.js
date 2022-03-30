/**
 * @file : 회원가입 2 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, SERVER_PATH, window) {

  var page = {
    els: {
      $userNmIpt: null,
      $gender: null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhone: null,
      $nextBtn: null,
      $man: null,
      $woman: null,


    },
    data: {},
    init: function init() {
      this.els.$userNmIpt = $('#userNm');
      this.els.$gender = $('input:radio[name=gender]:checked');
      this.els.$year = $('#year');
      this.els.$month = $('#month');
      this.els.$date = $('#date');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$nextBtn = $('#nextBtn');
      this.els.$man = $('#man');
      this.els.$woman = $('#woman');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩

      //  버튼 클릭시 동작

      var self = this;
      this.els.$nextBtn.on('click', function () {
        self.nextJoin2();

      })
    },




    // 비밀번호 찾기
    nextJoin2: function () {
      var self = this;
      var userNm = this.els.$userNmIpt.val().trim(); // 회원가입 이름 가져오기
      var gender = this.els.$gender.val(); // 회원가입 성별 가져오기 
      var year = this.els.$year.val().trim(); // 회원가입 년도 가져오기
      var month = this.els.$month.val().trim(); // 회원가입 월 가져오기
      var date = this.els.$date.val().trim(); // 회원가입 일 가져오기
      var cellPhone = this.els.$cellPhone.val().trim(); // 회원가입 전화번호 가져오기
      var birthDate = year + month + date;
      if (this.els.$man.is(':checked')) {
        gender = 'M';
      } else if (this.els.$woman.is(':checked')) {
        gender = 'F';
      }



      if (userNm == '') {
        return alert('이름을 입력해주세요.');
      }
      if (gender == '') {
        return alert('성별을 입력해주세요.');
      }
      if (year == '') {
        return alert('년도를 입력해주세요.');
      }
      if (year.length != 4) {
        return alert('년도를 4자리로 입력해주세요.')
      }

      if (month == '') {
        return alert('달을 입력해주세요.');
      }
      if (month >= 13 || month <= 0) {
        return alert('달을 1~12달로 입력해주세요.')
      }
      if (date == '') {
        return alert('일을 입력해주세요.');
      }
      if (date >= 32 || date <= 0) {
        return alert('일을 1~31일로 입력해주세요.')
      }

      if (cellPhone == '') {
        return alert('전화번호를 확인해주세요.');
      }
      var patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
      if (!patternPhone.test(cellPhone)) {
        alert('전화번호를 확인 해주세요');
        return;
      }



      // 페이지 호출
      M.page.html({
        path: './join3.html',
        param: {
          "userNms": userNm,
          "gender": gender,
          "birthDates": birthDate,
          "cellPhones": cellPhone
        }
      });





    }

  };
  window.__page__ = page;
})(jQuery, M, __mnet__,  __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);