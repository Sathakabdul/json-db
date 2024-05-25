// pages/api/posts/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getPosts, createPost } from '../../data/post';
//import { Post } from '../../../types';
//import { v4 as uuidv4 } from 'uuid';

interface Post {
  id: number;
  title: string;
  content: string;
}

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
