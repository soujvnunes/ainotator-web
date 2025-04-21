import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import datasetSchema from '@/consts/datasetSchema'

const ajv = new Ajv({ allErrors: true })

addFormats(ajv)

const validate = ajv.compile(datasetSchema)

export async function POST(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (Math.random() > 0.5) {
    return Response.json(
      {},
      {
        status: 500,
      },
    )
  }

  const dataset = await req.json()

  return Response.json(
    {
      isValid: validate(dataset),
      errors: validate.errors,
    },
    {
      status: 200,
    },
  )
}
