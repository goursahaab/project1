var express = require('express');
var router = express.Router();
let path = require('path');
let fs = require('fs');
const { isUtf8 } = require('buffer');

/* GET home page. */
router.get('/', function(req, res, next) {
  let folderpath = path.join(__dirname,"..","public","upload");
     let files = fs.readdirSync(folderpath);
  res.render('index', { files ,filedata:null});
    
});

router.get('/file/:filename',function(req,res,next){
  let filepath = path.join(__dirname,"..","public","upload",req.params.filename);
  try {
    fs.unlinkSync(filepath);
    console.log('File is deleted.');
  } catch (err) {
    console.error(err);
  }
res.redirect('/');

})


/* point 11 /:filename get root  */

router.get('/:filename',function(req,res,next){
  let folderpath = path.join(__dirname,"..","public","upload");
  let files = fs.readdirSync(folderpath);

  let filepath = path.join(__dirname,"..","public","upload",req.params.filename);
   let filedata= fs.readFileSync(filepath,'utf-8');

res.render('index', {files,filedata});

})




/* for create file in upload folder */

router.post('/create', function(req, res, next) {
  let filepath = path.join(__dirname,"..","public","upload",req.body.filename);
  fs.writeFileSync(filepath,"");
  // console.log(filepath)
  res.redirect('/')

});

module.exports = router;
