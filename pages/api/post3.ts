// data/posts.ts
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
interface Post {
  id: number;
  title: string;
  content: string;
}
// Resolve the path to the JSON file
//const filePath = path.resolve(process.cwd(), 'data', 'posts.json');
const filePath = `${process.cwd()}/pages/api/items.json`;
const readData = async (): Promise<Post[]> => {
  const data = await fs.readFile(filePath, 'utf-8');
  console.log(data);
  return JSON.parse(data);
};

const writeData = async (data: Post[]): Promise<void> => {
  console.log('Write Data ', data);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export const getPosts = async (): Promise<Post[]> => {
  const a = await readData();
  console.log(a);
  return a;
};

export const createPost = async (post: Post): Promise<void> => {
  const posts = await readData();
  console.log('Create Post get existing post', posts);
  posts.push(post);
  await writeData(posts);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await getPosts();
    console.log(posts);
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
