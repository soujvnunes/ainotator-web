import { type JSONSchemaType } from 'ajv'

import { type DatasetState } from '@/slices/datasetSlice'

const schema: JSONSchemaType<Omit<DatasetState, 'validation'>> = {
  type: 'object',
  properties: {
    info: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        url: { type: 'string', format: 'uri' },
        version: { type: 'string' },
        year: { type: 'number' },
        contributor: { type: 'string' },
        date_created: { type: 'string', format: 'date-time' },
      },
      required: ['description', 'url', 'version', 'year', 'contributor', 'date_created'],
      additionalProperties: false,
    },
    licenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          url: { type: 'string', format: 'uri' },
          name: { type: 'string' },
        },
        required: ['id', 'url', 'name'],
        additionalProperties: false,
      },
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          license: { type: 'number' },
          file_name: { type: 'string' },
          height: { type: 'number' },
          width: { type: 'number' },
          date_captured: { type: 'string', format: 'date-time' },
          coco_url: { type: 'string', format: 'uri' },
          flickr_url: { type: 'string', format: 'uri' },
          id: { type: 'number' },
        },
        required: [
          'license',
          'file_name',
          'height',
          'width',
          'date_captured',
          'coco_url',
          'flickr_url',
          'id',
        ],
        additionalProperties: false,
      },
    },
    annotations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          segmentation: {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'number' },
              minItems: 1,
            },
            minItems: 1,
          },
          area: { type: 'number' },
          iscrowd: { type: 'number' },
          image_id: { type: 'number' },
          bbox: {
            type: 'array',
            items: { type: 'number' },
            minItems: 4,
            maxItems: 4,
          },
          category_id: { type: 'number' },
          id: { type: 'number' },
        },
        required: ['segmentation', 'area', 'iscrowd', 'image_id', 'bbox', 'category_id', 'id'],
        additionalProperties: false,
      },
    },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          supercategory: { type: 'string' },
          id: { type: 'number' },
          name: { type: 'string' },
        },
        required: ['supercategory', 'id', 'name'],
        additionalProperties: false,
      },
    },
  },
  required: ['info', 'licenses', 'images', 'annotations', 'categories'],
  additionalProperties: false,
}

export default schema
