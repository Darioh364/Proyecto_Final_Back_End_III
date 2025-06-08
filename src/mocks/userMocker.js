import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const roles = ['user', 'admin'];

export const generateMockUsers = async (count = 1) => {
  const users = [];

  // Encriptamos la contraseña una sola vez (porque es la misma para todos)
  const hashedPassword = await bcrypt.hash('coder123', 10);

  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: roles[Math.floor(Math.random() * roles.length)],
      pets: [],
    });
  }

  return users;
};
