import { IContact } from "../../@types/Contact";

interface IContactCardProps {
  data: IContact;
  onDelete: (id: string) => void;
}

export type { IContactCardProps };
