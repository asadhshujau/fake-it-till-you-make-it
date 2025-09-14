import { faker, } from '@faker-js/faker'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const handler = (request: VercelRequest, response: VercelResponse) => {
  console.log(request)
  const gender = faker.person.sexType()
  const user = {
    id: faker.number.int({ min: 1 }),
    name: faker.person.fullName({ sex: gender }),
    gender: gender,
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  }

  response.setHeader('Content-Type', 'application/json')
  response.status(200).json(user)
}
