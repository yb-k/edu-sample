/*
  공통 라이브러리는 importFiles 배열에 선언한다.
  선언된 라이브러리들은 html 파일에서 <script src="../mcore.min.js"></script>가 추가된 곳 자동으로 업로드된다.
*/
(function(window, undefined) {

var 
thisFileName = "mcore.extends.js",

importFiles = [
	"jquery-3.6.0.min.js",
	"muikit-1.0.0.min.js",
	"wnInterface.extends.js",
  "common/ui.js",
  "common/definition.js",
  "common/util.js",
  "common/setup.js",
  "common/MAPI.js"
];

M.ScriptLoader.writeScript( importFiles, M.ScriptLoader.scriptPath(thisFileName) );

})(window);