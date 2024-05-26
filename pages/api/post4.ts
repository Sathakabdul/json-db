// data/posts.ts
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
let users = require('../../data/users.json');
//import { Post } from '../types';
interface Post {
  id: number;
  title: string;
  content: string;
}

// Resolve the path to the JSON file
//const filePath = path.resolve(process.cwd(), 'data', 'items.json');
//const filePath = `${process.cwd()}/pages/api/items.json`;

const readData = (): Post[] => {
  const data = fs.readFileSync(users, 'utf-8');
  console.log('SATHAK POST-4' + data);
  return JSON.parse(data);
};

const writeData = (data: Post[]): void => {
  fs.writeFileSync('data/users.json', JSON.stringify(data, null, 4));
};

export const getPosts = (): Post[] => {
  return readData();
};

export const createPost = (post: Post): void => {
  const posts = readData();
  posts.push(post);
  writeData(posts);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = getPosts();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const newPost: Post = { id: 1, title, content };
    createPost(newPost);
    res.status(201).json(newPost);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
