import { faker, } from '@faker-js/faker'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const handler = (request: VercelRequest, response: VercelResponse) => {
  console.log(request)

  // extract id from the original url (works regardless of routing rewrites)
  const url = request.url || '';
  const m = url.match(/\/api\/users\/([^/?#]+)/);
  const id = m ? m[1] : null;

  if (!id) {
    return response.status(400).json({ error: 'Missing id in path' });
  }

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
