import { Router } from 'express';
import { fakerES as faker } from '@faker-js/faker';
import { generateMockUsers } from '../utils/mockingUsers.js';


import UsersDao from '../dao/Users.dao.js';
import PetsDao from '../dao/Pets.dao.js';



const router = Router();

const usersDao = new UsersDao();
const petsDao = new PetsDao();

// Genera un usuario falso usando Faker
function generateFakeUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'user',
    pets: []
  };
}

function generateFakePet() {
  return {
    name: faker.animal.cat(),
    specie: 'cat',
    birthDate: faker.date.birthdate(),
    adopted: false,
    owner: null,
    image: faker.image.urlLoremFlickr({ category: 'cats' }) // ← Cambio acá
  };
}

router.get('/mockingusers', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 50; // Por defecto 50 si no viene count
    const users = await generateMockUsers(count);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    console.error('Error generating users:', error);
    res.status(500).json({ status: 'error', message: 'Error generating users' });
  }
});

// Ruta para generar y guardar 50 mascotas falsas en BD
router.get('/mockingpets', async (req, res) => {
  try {
    const pets = [];
    for (let i = 0; i < 50; i++) {
      const pet = generateFakePet();
      const savedPet = await petsDao.save(pet);
      pets.push(savedPet);
    }
    res.json({ status: 'success', payload: pets });
  } catch (error) {
    console.error('Error generating pets:', error);
    res.status(500).json({ status: 'error', message: 'Error generating pets' });
  }
});

router.post('/generateData', async (req, res) => {
  try {
    const { users: userCount, pets: petCount } = req.body;

    if (!userCount || !petCount) {
      return res.status(400).json({ status: 'error', message: 'Missing users or pets parameter in request body' });
    }

    // Generar usuarios y guardarlos
    const fakeUsers = await generateMockUsers(userCount);
    const insertedUsers = await usersDao.insertMany(fakeUsers);

    // Generar mascotas y guardarlas
    const fakePets = [];
    for (let i = 0; i < petCount; i++) {
      const pet = generateFakePet();
      fakePets.push(pet);
    }
    const insertedPets = await petsDao.insertMany(fakePets);

    res.json({
      status: 'success',
      message: 'Datos generados e insertados correctamente',
      usersInserted: insertedUsers.length,
      petsInserted: insertedPets.length,
    });
  } catch (error) {
    console.error('Error generating or inserting data:', error);
    res.status(500).json({ status: 'error', message: 'Error generating or inserting data' });
  }
});

export default router;
