import { Database } from 'fakebase';

const db = new Database('./data');

export const Movies = db.table('movies');
export const Prices = db.table('prices');
export const Rating = db.table('rating');

