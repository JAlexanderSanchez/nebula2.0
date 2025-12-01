// Product model

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: String,
    enum: ['Disponible', 'Agotado', 'Proximamente'],
    default: 'Disponible'
  },
  imageUrls: [{
    type: String
  }],
  availableColors: {
    type: Number,
    default: 1
  },
  badge: {
    type: String,
    enum: ['NUEVO', 'Últimas unidades', null],
    default: null
  },
  specs: {
    puffs: {
      type: String,
      required: true
    },
    nicotineLevel: {
      type: String,
      required: true
    },
    liquidVolume: {
      type: String,
      required: true
    },
    functions: {
      type: String,
      default: 'STANDARD'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);



