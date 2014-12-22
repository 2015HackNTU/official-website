var db = require('../db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
//var BlogPosts = mongoose.model('BlogPosts');
//var Users = mongoose.model('Users')

/* Breaking News Start*/
/* Breaking News Start*/
exports.breakingnews = function(req,res){
    console.log(">>>> through news.js <<<<<");
    BreakingNews.find(function(error, news){
        res.render('news',{title:'Breaking News', news: news});
    });
};
exports.breakingnews.create = function(req,res){
    console.log(">>>> through news.js <<<<<");
    new BreakingNews({
        title : req.body.title,
        department : req.body.department,
        content : req.body.content,
        isImportant : req.body.isImportant,
        tag : req.body.tag,
        create_at : req.body.create_at
    }).save( function(err, news, count){
        console.log("Breaking News " + req.body.title + " is created.")
        res.redirect('/news');
    })
};
exports.breakingnews.destroy = function(req,res){
    console.log(req.body.title + ' removed');
    console.log('>>>>> route through news.js fn exports.breakingnews.destroy <<<<<');
    // Delete //
    BreakingNews.findById(req.params.id, function(err, news){
        news.remove( function(err, news){
            res.redirect('/news');
        });
    });
};
/* Breaking News End*/
