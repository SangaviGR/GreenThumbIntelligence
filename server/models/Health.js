const mongoose = require('mongoose');
const { Schema } = mongoose;

const healthAssessmentSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  model_version: {
    type: String,
    required: true
  },
  custom_id: {
    type: String,
    default: null
  },
  input: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    similar_images: {
      type: Boolean,
      required: true
    },
    health: {
      type: String,
      enum: ['only', 'disease', 'all'],
      required: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    datetime: {
      type: Date,
      required: true
    }
  },
  result: {
    is_healthy: {
      binary: {
        type: Boolean,
        required: true
      },
      threshold: {
        type: Number,
        required: true
      },
      probability: {
        type: Number,
        required: true
      }
    },
    is_plant: {
      probability: {
        type: Number,
        required: true
      },
      threshold: {
        type: Number,
        required: true
      },
      binary: {
        type: Boolean,
        required: true
      }
    },
    disease: [
      {
        id: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        probability: {
          type: Number,
          required: true
        },
        similar_images: [
          {
            id: {
              type: String,
              required: true
            },
            url: {
              type: String,
              required: true
            },
            license_name: {
              type: String,
              required: true
            },
            license_url: {
              type: String,
              required: true
            },
            citation: {
              type: String,
              required: true
            },
            similarity: {
              type: Number,
              required: true
            },
            url_small: {
              type: String,
              required: true
            }
          }
        ],
        details: {
          language: {
            type: String,
            required: true
          },
          entity_id: {
            type: String,
            required: true
          }
        }
      }
    ]
  }
});

const Health = mongoose.model('HealthAssessment', healthAssessmentSchema);
module.exports = Health;
