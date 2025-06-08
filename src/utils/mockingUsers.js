import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function generateMockUsers(quantity) {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    const passwordHashed = await bcrypt.hash('coder123', 10);

    const user = {
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: passwordHashed,
      role: Math.random() < 0.5 ? 'user' : 'admin',
      pets: [],
      __v: 0
    };

    users.push(user);
  }

  return users;
}
