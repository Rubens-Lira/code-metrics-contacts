import styles from "./styles.module.css";
import trash from "../../assets/icons/trash.svg";
import edit from "../../assets/icons/edit.svg";
import { IContactCardProps } from "./types";
import { useNavigate } from "react-router-dom";

export default function ContactCard({ data, onDelete }: IContactCardProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/contacts/${data.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 204) {
        onDelete(data.id);
      } else {
        throw new Error(`Erro: status ${response.status}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao excluir contato");
    }
  };

  const handleEditClick = () => {
    navigate(`contacts/edit?id=${data.id}`);
  };

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
        <img src={edit} alt="Editar" onClick={handleEditClick} />
        <img src={trash} alt="Excluir" onClick={handleDelete} />
      </div>
    </div>
  );
}
