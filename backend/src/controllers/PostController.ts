import { Request, Response } from "express";
import { PostService } from "../services/PostService";

const service = new PostService();

export class PostController {
  async getPosts(req: Request, res: Response) {
    const posts = await service.getAll();
    res.json(posts);
  }

  async getPost(req: Request, res: Response) {
    const post = await service.getById(req.params.id);
    post ? res.json(post) : res.status(404).json({ msg: "Not found" });
  }

  async createPost(req: Request, res: Response) {
    const post = await service.create(req.body);
    res.status(201).json(post);
  }

  async updatePost(req: Request, res: Response) {
    const updated = await service.update(req.params.id, req.body);
    updated ? res.json(updated) : res.status(404).json({ msg: "Not found" });
  }

  async deletePost(req: Request, res: Response) {
    const deleted = await service.delete(req.params.id);
    deleted
      ? res.json({ msg: "Deleted" })
      : res.status(404).json({ msg: "Not found" });
  }
}
