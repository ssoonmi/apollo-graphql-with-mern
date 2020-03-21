const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  weight: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);