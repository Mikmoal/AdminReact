//                     ____
//                  _.' :  `._
//              .-.'`.  ;   .'`.-.
//     __      / : ___\ ;  /___ ; \      __
//   ,'_ ""--.:__;".-.";: :".-.":__;.--"" _`,
//   :' `.t""--.. '<@.`;_  ',@>` ..--""j.' `;
//        `:-.._J '-.-'L__ `-- ' L_..-;'
//          "-.__ ;  .-"  "-.  : __.-"
//              L ' /.------.\ ' J
//               "-.   "--"   .-"
//              __.l"-:_JL_;-";.__
//           .-j/'.;  ;""""  / .'\"-.
//         .' /:`. "-.:     .-" .';  `.
//      .-"  / ;  "-. "-..-" .-"  :    "-.
//   .+"-.  : :      "-.__.-"      ;-._   \
//   ; \  `.; ;                    : : "+. ;
//   :  ;   ; ;                    : ;  : \:
//  : `."-; ;  ;                  :  ;   ,/;
//   ;    -: ;  :                ;  : .-"'  :
//   :\     \  : ;             : \.-"      :
//    ;`.    \  ; :            ;.'_..--  / ;
//    :  "-.  "-:  ;          :/."      .'  :
//      \       .-`.\        /t-""  ":-+.   :
//       `.  .-"    `l    __/ /`. :  ; ; \  ;
//         \   .-" .-"-.-"  .' .'j \  /   ;/
//          \ / .-"   /.     .'.' ;_:'    ;
//           :-""-.`./-.'     /    `.___.'
//                 \ `t  ._  /  
//                  "-.t-._:' yoda
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const cors = require('cors');
// const { google } = require("googleapis");
// const url = require("url");
// const opn = require("open");
// const fs = require("fs");
// const path = require("path");

// Syncing all the models at once.
server.use(cors());
conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log("server listening at 3001"); // eslint-disable-line no-console
  });
});
