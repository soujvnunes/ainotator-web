import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import schema from './schema'

const ajv = new Ajv({ allErrors: true })

addFormats(ajv)

const validate = ajv.compile(schema)

export async function POST(req: Request) {
  const dataset = await req.json()

  return Response.json({
    isValid: validate(dataset),
    errors: validate.errors ?? [],
  })
}
