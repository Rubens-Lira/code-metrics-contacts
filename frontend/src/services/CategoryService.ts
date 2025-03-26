import { ICategory } from "../@types/Category";
import api from "../configs/api";

type orderBy = "ASC" | "DESC";

interface IGetCategoryParams {
  name?: string;
  orderBy?: orderBy;
}

class CategoryService {
  async getCategories(): Promise<ICategory[]> {
    const response = await api.get<ICategory[]>("/categories");
    return response.data;
  }

  async showCategory(id: string): Promise<ICategory> {
    const response = await api.get<ICategory>(`/category/${id}`)
    return response.data
  }
}

export default new CategoryService();

export type { orderBy };
