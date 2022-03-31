/**
 * @file : base.js 인트로 페이지
 * @author :
 * @date :
 */

(function ($, M, module, MNet, window) {
  var page = {
    els: {
      $userName: null,
      $gender: null,
      $year: null,
      $month: null,
      $date: null,
      $cellPhone: null,
      $nextBtn: null
    },
    data: {},
    init: function init() {
      this.els.$userName = $('#user-name');
      this.els.$year = $('#year');
      this.els.$month = $('#month');
      this.els.$date = $('#date');
      this.els.$cellPhone = $('#cellPhone');
      this.els.$nextBtn = $('#next-btn');
    },
    initView: function initView() {
      // 회면에서 세팅할 동적 데이터
    },
    initEvent: function initEvent() {
      // DOM Event 바인딩
      var self = this;
      // cellphone 숫자만
      module.onKeyupNum(this.els.$cellPhone);
      this.els.$nextBtn.on('click', function () {
        var userName = self.els.$userName.val().trim();
        var gender = $("input:radio[name='gender']:checked").val();
        console.log(gender);
        var year = self.els.$year.val().trim();
        var month = self.els.$month.val().trim();
        var date = self.els.$date.val().trim();
        var cellphone = self.els.$cellPhone.val().trim();
        self.hasNullValue(userName,gender,year,month,date,cellphone,function (){
          var fullBirth = year + module.digitNum(month) + date;
          console.log(fullBirth);
          M.page.html('./join3.html', {
            'param': {
              userName: userName,
              gender: gender,
              birth: fullBirth,
              cellphone: cellphone
            }
          });
        });
      })
    },
    hasNullValue : function hasNullValue(userName,gender,year,month,date,cellphone,callbackFunc){
      if (userName == '') {
        return alert('사용자 이름은 필수 입력사항입니다.');
      }
      if (gender == '') {
        return alert('성별을 선택해주세요');
      }
      if (year < 1000) {
        return alert('년을 4자리로 입력하세요');
      }
      if (month > 12) {
        return alert('월을 정확하게 입력해주세요');
      }
      if (date > 31) {
        return alert('일을 정확하게 입력해주세요');
      }
      var fullBirth = year + module.digitNum(month) + date;
      if (module.isBirthday(fullBirth) == false){
        return alert('유효하지 않은 생년월일 입니다.');
      }
      if (cellphone.length < 11 || cellphone.length > 11) { // 휴대폰 번호 11자리 고정.
        return alert('휴대폰 번호를 11자리 입력해주세요');
      }
      if (module.isCellphone(cellphone) == false){
        return alert('휴대폰번호가 유효하지 않습니다.');
      }
      callbackFunc();
    }
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
// 해당 페이지에서 실제 호출
})(jQuery, M, __page__, window);