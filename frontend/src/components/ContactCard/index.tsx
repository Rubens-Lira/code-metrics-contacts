import styles from "./styles.module.css";
import trash from "../../assets/icons/trash.svg";
import edit from "../../assets/icons/edit.svg";
import { IContactCardProps } from "./types";

export default function ContactCard({ data }: IContactCardProps) {
  return (
    <div className={styles.contatcsCard}>
      <div>
        <div>
          <strong>{data.name}</strong>{" "}
          {data.category_name && <small>{data.category_name}</small>}
        </div>
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>{data.phone}</span>}
      </div>
      <div>
        <img src={edit} alt="Editar" />
        <img src={trash} alt="Excluir" />
      </div>
    </div>
  );
}
