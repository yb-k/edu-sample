/**
 * @file : definition.js 상수 값을 모아두는 공통 JS
 * @author : 
 * @date : 
 */
(function (window, M) {
	var module = {};
	
	var isDev = module.isDev = true; // 개발 모드 여부
	var Definition = module.config = {
		SERVER_NAME: "GW_SERVER" //바라볼 서버 이름 (Manifest.xml에 설정되어있는 이름)
		,UPLOAD_URL: ""
		,INDICATOR_MSG: "통신중..." //서버통신시 default indicator_msg 
		,INDICATOR: true //서버통신시 indicator 여부 
		,DEFAULT_ERROR_MSG: "네트워크 통신 중 오류가 발생했습니다."
		,RES_DEV: "dev"
		,RES_REAL: "real",
	};

	//운영&개발에 따른 서버 정보 세팅
	//별도 개발 서버가 없음..
//	if (isDev == true) {
//		console.log("-------------------------DEV-------------------------");
//		Definition.SERVER_NAME = "HTTP_DEV";
//		// Definition.UPLOAD_URL = M.info.app("manifest.network.http")[Definition.SERVER_NAME].address;
//	} else {
//		Definition.SERVER_NAME = "HTTP_DEV";
//		// Definition.UPLOAD_URL = M.info.app("manifest.network.http")[Definition.SERVER_NAME].address;
//	}
	console.log("     SERVER URL: " + Definition.UPLOAD_URL);

	//서버 전문 요청 목록
	var ServerPath = module.serverPath = {
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
	}

	//Android Upload 통신 시 콜백
	var successCallBack;
	var errorCallBack;

	window.__difinition__ = module;
	window.__config__ = module.config;
	window.__serverpath__ = module.serverPath;
})(window, M);