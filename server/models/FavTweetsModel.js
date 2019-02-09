const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const FavTweetSchema = new Schema({
  twit_created_at: {
    type :String
  },
  twit_id:{
    type :String
  },
  full_text:{
    type :String
  },
  entities: {
    type:Schema.Types.Mixed
  },
  user: {
    type:Schema.Types.Mixed
  },
  favorited_count:{
    type :Number
  },
  retweet_count:{
    type :Number
  },
  userId : {
    type: Schema.Types.ObjectId,
    required: true
  }
}, { collection: 'FavTweetSchema', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('FevTwits', FavTweetSchema);
