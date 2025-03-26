import { IContact } from "../@types/Contact";
import api from "../configs/api";

type orderBy = "ASC" | "DESC";

interface IGetContactsParams {
  name?: string;
  orderBy?: orderBy;
}

class ContactsService {
  async getContacts(params: IGetContactsParams): Promise<IContact[]> {
    const response = await api.get<IContact[]>("/contacts", { params });
    return response.data;
  }

  async showContact(id: string): Promise<IContact> {
    const response = await api.get<IContact>(`/contacts/${id}`)
    return response.data
  }
}

export default new ContactsService();

export type { orderBy };
