const TweetsModel = require('../models/FavTweetsModel.js');
const config     = require('../config');
const Twit       = require('twit');
 
var T = new Twit({
  consumer_key:         config.twitter_api.consumer_key,
  consumer_secret:      config.twitter_api.consumer_secret,
  access_token:         config.twitter_api.access_token,
  access_token_secret:  config.twitter_api.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

module.exports = {
  /*
    * FavControllerController.getTweets()
  */
  getTweets : function(req,res){

    if(req.query.favorite == 'yes'){
      TweetsModel.find({userId:req.userId},function(err,tweet){
        if(err) return res.status(500).json({message:'failed to fetch favorite tweet',err:err})

        return res.status(201).json({message:`user's favorite tweet fetch successfully`,tweets:tweet})
      })
    }
    else{
      const url = 'https://api.twitter.com/1.1/search/tweets.json';
      const params = {
        tweet_mode: 'extended',
        count: 20,
        q: `@${req.query.userId || 'noradio'}`
      };
      T.get(url,params,function (err, data, response) {
        return res.status(200).json({message:'user tweets get success',data:data});
      })  
    }
  },

  saveFavTweet : function(req,res){

    const favTweet = new TweetsModel({
      twit_created_at:req.body.created_at,
      twit_id:req.body.id,
      full_text:req.body.full_text,
      entities:req.body.entities,
      user:req.body.user,
      favorited_count:req.body.favorited_count,
      retweet_count:req.body.retweet_count,
      userId:req.userId
    });

    favTweet.save((err,tweet)=>{
      if(err) return res.status(500).json({message:'failed to save favorite tweet',err:err})

      return res.status(201).json({message:`user's favorite tweet saved successfully`,tweet:tweet})  
    })
  },

  removeFavTweet : function(req,res){
    console.log('here',req.params.id);
    if(!req.params.id) return res.status(400).json({message:'provide _id of tweet to remove it'})

    TweetsModel.findByIdAndDelete(req.params.id,function(err,tweet){
      if(err) return res.status(500).json({message:'failed to delete favorite tweet',err:err})

      return res.status(201).json({message:`favorite tweet deleted successfully`,tweet:tweet})
    })
  }


};
