import { Movies, Prices, Rating } from './db.js';

function rejectIf(condition) {
  if (condition) {
    throw new Error('Unauthorized');
  }
}

export const resolvers = {
  Query: {
    prices: () => Prices.findAll(),
    movies: () => Movies.findAll(),
    // rating: () => Rating.findAll(),
  },
  Mutation: {
    updateRating: async (__root, { payload }) => {
      console.log(payload);
      return Rating.update(payload)
    },
    addMovie: async (__root, { payload }) => {
      const newMovie = await Movies.create({ ...payload });
      await Rating.create({
        id: newMovie.id,
        stars: 0,
      });

      await Prices.create({
        id: newMovie.id,
        buyPrice: 0,
        rentalPrice: 0
      });

      return newMovie;
    },
    deleteMovie: async (__root, { id }) => {
      return Movies.delete(id);
    }
  },
  Movie: {
    price: (movie) => {
      return Prices.findById(movie.id) || null;
    },
    rating: (movie) => {
      return Rating.findById(movie.id) || null;
    }
  }

};
