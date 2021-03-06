var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sticky = mongoose.model('Sticky');

router.get('/sticky', function(req, res, next) {
  console.log("in get");
  Sticky.find(function(err, sticky) {
    console.log("in get again");
    if (err) { return next(err); }
    res.json(sticky);
  });
});

router.post('/sticky', function(req, res, next) {
  var sticky = new Sticky(req.body);
  sticky.save(function(err, sticky) {
    if (err) { return next(err); }
    res.json(sticky);
  });
});

router.param('sticky', function(req, res, next, id) {
  var query = Sticky.findById(id);
  query.exec(function(err, sticky) {
    if (err) { return next(err); }
    if (!sticky) { return next(new Error("can't find sticky")); }
    req.sticky = sticky;
    return next();
  });
});

router.put('/sticky/:sticky/color', function(req, res, next) {
  req.sticky.changeColor(req.color, function(err, sticky) {
    if (err) { return next(err); }
    res.json(sticky);
  });
});

router.put('/sticky/:sticky/size', function(req, res, next) {
  req.sticky.changeSize(req.body.height, req.body.width, function(err, sticky) {
    if (err) { return next(err); }
    res.json(sticky);
  });
});

router.put('/sticky/:sticky/loc', function(req, res, next) {
  req.sticky.changeLoc(req.body.top, req.body.left, function(err, sticky) {
    if (err) { return next(err); }
    res.json(sticky);
  });
});

router.put('/sticky/:sticky/text', function(req, res, next) {
  req.sticky.changeText(req.body.text, function(err, sticky) {
    if (err) { return next(err); }
    res.json(sticky);
  });
});

router.delete('/sticky/:sticky', function(req, res) {
  req.sticky.remove();
  res.sendStatus(200);
});

router.delete('/sticky', function(req, res, next) {
  Sticky.remove(function(err){
    if(err) {return next(err)}
    res.sendStatus(200);
  });
  
});

module.exports = router;
