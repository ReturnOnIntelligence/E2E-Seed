const fs = require('fs');
const settings = require('./settings')
const paths = settings.paths;

deleteFolderRecursive(paths.dirBuild);

if (!fs.existsSync(paths.dirBuild)) {
    fs.mkdirSync(paths.dirBuild);
}

deleteFolderRecursive(paths.reportFolder); 

if (!fs.existsSync(paths.dirBuild)) {
    fs.mkdirSync(paths.dirBuild);
}
fs.mkdirSync(paths.reportFolder);

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      let curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { 
        deleteFolderRecursive(curPath);
      } else { 
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};