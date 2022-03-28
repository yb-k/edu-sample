/**
 * @file : 회원가입 본인인증
 * @author : 김예은
 * @date : 22.03.24
 */

(function ($, M, CONFIG , window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $userNm: null,
      $man: null, // class : gender
      $woman: null, // class : gender
      $year: null,
      $month: null,
      $date: null,
      $cellPhone: null,
      $nextBtn: null
    },
    data: {},
    init: function init() {
      this.els.$userNm = $('#userNm');
      this.els.$man = $('#man'); // input radio
      this.els.$woman = $('#woman'); // input radio
      this.els.$year = $('#year');
      this.els.$month = $('#month');
      this.els.$date = $('#date');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$nextBtn = $('#nextBtn');
      this.els.$gender = $('.gender');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$nextBtn.on('click', function () {
        self.info();
      })
    },
    info: function () {
      var name = this.els.$userNm.val().trim();
      var year = this.els.$year.val().trim();
      var month = this.els.$month.val().trim();
      var date = this.els.$date.val().trim();
      var phone = this.els.$cellPhone.val().trim();
      var birth = year+month+date;
      //input:checkbox[class='chk']
      var gender = $("input:radio[name='gender']").val().trim();
      

      if (name == '') {
        return alert('이름을 입력해주세요.');
      }
      if (year == '' || month == '' || date == '') {
        return alert('생년월일을 입력해주세요.');
      }
      if (year.length != 4) {
        return alert('년을 다시 입력해주세요.');
      }
      if (month >= 13 || month <= 0) {
        return alert('월을 다시 입력해주세요.');
      }
      if (date >= 31 || date <= 0) {
        return alert('일을 다시 입력해주세요.');
      }
      if (gender == '') {
        return alert('성별을 선택해주세요.');
      }
      if(this.els.$man.is(':checked')){
        gender = 'M';
      }
      if(this.els.$woman.is(':checked')){
        gender = 'F';
      }
      if (phone == '' || phone.length > 11 ) {
        return alert('휴대폰 번호를 입력해주세요.');
      }
      M.page.html({
        path: "./join3.html",
        param: {
          userNm: name,
          cellPhone: phone,
          gender: gender,
          birth : birth
        },
        error: function () {
          alert("에러");
        }
      });
    }
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);