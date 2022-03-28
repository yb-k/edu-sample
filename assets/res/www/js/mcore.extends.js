
/*
공통 라이브러리는 importFiles 배열에 선언한다.
선언된 라이브러리들은 html 파일에서
<script scr="../js/mcore.min.js"></script>
가 추가된곳에 자동으로 임포트 된다.
*/

(function(window, undefined) {

var 
thisFileName = "mcore.extends.js",

// 동기식으로 작동
importFiles = [
	"jquery-3.6.0.min.js",
	"muikit-1.0.0.min.js",
	"wnInterface.extends.js",
  "common/ui.js",
  "common/definition.js",
  "common/util.js",
  "common/setup.js",
  "common/jquery.plugin.js"
];

M.ScriptLoader.writeScript( importFiles, M.ScriptLoader.scriptPath(thisFileName) );

})(window);