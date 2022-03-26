
(function(window, undefined) {
// C:user

/*
  공통 라이브러리는 importFiles 배열에 선언한다.
  선언된 라이브러리들은 html 파일에서 
  <script src=../js/mcore.min.js"></script>
  가 추기된곳을 자동으로 임폴트된다.
*/

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
  "common/mapi.manager.js",

  
 
  
];

M.ScriptLoader.writeScript( importFiles, M.ScriptLoader.scriptPath(thisFileName) );

})(window);