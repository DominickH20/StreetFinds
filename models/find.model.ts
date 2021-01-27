import mongoose = require('mongoose');

const Schema = mongoose.Schema;

const findSchema = new Schema({
  geolocation: { type: String, required: true },
  address_near: { type: String, required: true },
  main_street: { type: String, required: true },
  cross_street: {type: String},
  title: { type: String, required: true },
  quality: { type: String, required: true },
  description: { type: String },
  tags: { type: String, required: true },
  img_ts: { type: String, required: true },
  img_user: { type: String, required: true},
  img_s3_url: { type: String, required: true }
}, {
  timestamps: true
});

const Find = mongoose.model('Find', findSchema);

export default Find;