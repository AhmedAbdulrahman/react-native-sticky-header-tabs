import faker from 'faker';

export const data = [
  {
    title: 'Breakfast',
    backgroundImage: require('./assets/images/breakfast.png'),
    data: Array(5)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: 'Shortbread, chocolate turtle cookies, and red velvet.',
        price: faker.commerce.price(),
        food: faker.image.imageUrl(201, 201, 'food')
      }))
  },
  {
    title: 'Burgers',
    backgroundImage: require('./assets/images/burgers.png'),
    data: Array(5)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: 'Shortbread, chocolate turtle cookies, and red velvet.',
        price: faker.commerce.price(),
        food: faker.image.imageUrl(202, 202, 'food')
      }))
  },
  {
    title: 'Pizza',
    backgroundImage: require('./assets/images/pizzas.png'),
    data: Array(20)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: 'Shortbread, chocolate turtle cookies, and red velvet.',
        price: faker.commerce.price(),
        food: faker.image.imageUrl(203, 203, 'food')
      }))
  },
  {
    title: 'Soups',
    backgroundImage: require('./assets/images/soups.png'),
    data: Array(20)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: 'Shortbread, chocolate turtle cookies, and red velvet.',
        price: faker.commerce.price(),
        food: faker.image.imageUrl(204, 205, 'food')
      }))
  },
  {
    title: 'Desert',
    backgroundImage: require('./assets/images/deserts.png'),
    data: Array(20)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: 'Shortbread, chocolate turtle cookies, and red velvet.',
        price: faker.commerce.price(),
        food: faker.image.imageUrl(205, 205, 'food')
      }))
  }
];
