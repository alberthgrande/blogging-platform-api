import Post, { IPost } from "../models/Post";

export class PostService {
  async getAll(): Promise<IPost[]> {
    return Post.find();
  }

  async getById(id: string): Promise<IPost | null> {
    return Post.findById(id);
  }

  async create(data: IPost): Promise<IPost> {
    return Post.create(data);
  }

  async update(id: string, data: Partial<IPost>): Promise<IPost | null> {
    return Post.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPost | null> {
    return Post.findByIdAndDelete(id);
  }
}
