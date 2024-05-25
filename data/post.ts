// data/posts.ts
import fs from 'fs';
import path from 'path';
//import { Post } from '../types';
interface Post {
  id: number;
  title: string;
  content: string;
}

// Resolve the path to the JSON file
const filePath = path.resolve(process.cwd(), 'data', 'items.json');

const readData = (): Post[] => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data: Post[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const getPosts = (): Post[] => {
  return readData();
};

// export const getPost = (id: string): Post | undefined => {
//   const posts = readData();
//   return posts.find((post) => post.id === id);
// };

export const createPost = (post: Post): void => {
  const posts = readData();
  posts.push(post);
  writeData(posts);
};
