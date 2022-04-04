(function (window, M) {
  var module = {};
  var IS_DEV = true;
  var IS_PROD = !IS_DEV;


  // 앱 환경변수 값
  var ENV = module.ENV = {
    IS_DEV: IS_DEV, // 개발 모드 여부
    SERVER_NAME: IS_PROD ? "GW_SERVER" : "GW_SERVER" //바라볼 서버 이름 (Manifest.xml에 설정되어있는 이름)
      ,
    UPLOAD_URL: IS_PROD ? "" : "",
    INDICATOR: true //서버통신시 indicator 여부 
  };

  var SERVER_PATH = module.SERVER_PATH = {
    LOGIN: "api/member/login", //로그인
    DUPLICATE: "api/member/duplicate", //아이디 중복 체크
    JOIN: "api/member/join", //회원가입
    FIND_ID: "api/member/findId", //아이디 찾기
    FIND: "api/member/find", //비밀번호 변경 전 개인정보 확인
    PASSWORD: "api/member/password", //비밀번호 변경
    OUT: "api/member/out", //회원 탈퇴
    INFO: "api/member/info", //회원 정보 조회
    UPDATE: "api/member/update", //회원 정보 수정
    CHECK_PASSWORD: "api/member/chkPwd", //회원 비밀번호 확인

    NOTICE_LIST: "api/notice/list", //게시글 리스트
    NOTICE_DETAIL: "api/notice/detail", //게시글 상세
    NOTICE_WRITE: "api/notice/write", //게시글 등록
    NOTICE_WRITE_IMG: "api/notice/writeWithUpload", //게시글 등록(이미지 포함)
    NOTICE_UPDATE: "api/notice/update", //게시글 수정
    NOTICE_UPDATE_IMG: "api/notice/updateWithUpload", //게시글 수정(이미지 포함)
    NOTICE_DELETE: "api/notice/delete", //게시글 삭제		
  };

  var SERVER_CODE = module.SERVER_CODE = {
    SUCC: '0000', // 성공시
  }

  // 상수 키 값
  var CONSTANT = module.CONSTANT = {
    AUTO_LOGIN_AUTH: 'AUTO_LOGIN_AUTH'
  }

  // 메시지 문자열 상수
  var MSG = module.MSG = {
    INDICATOR_MSG: "통신중..." //서버통신시 default indicator_msg 
      ,
    DEFAULT_ERROR_MSG: "네트워크 통신 중 오류가 발생했습니다."
  };


  window.__config__ = module;
})(window, M);