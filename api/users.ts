import { faker, } from '@faker-js/faker'
import { VercelRequest, VercelResponse } from '@vercel/node'

export const handler = (request: VercelRequest, response: VercelResponse) => {
  const users = Array.from({ length: 50 }, (_, i) => {
    const gender = faker.person.sexType()
    return {
      id: i + 1,
      name: faker.person.fullName({ sex: gender }),
      gender: gender,
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }
  })

  response.setHeader('Content-Type', 'application/json')
  response.status(200).json(users)
}
