import styles from "./styles.module.css";
import arrow from "../../assets/icons/arrow.svg";
import ContactCard from "../../components/ContactCard";
import { useCallback, useEffect, useState } from "react";
import { ContactsService } from "../../services";
import { IContact } from "../../@types/Contact";
import { Button, Input, Loader } from "../../components";
import { orderBy } from "../../services/ContactsService";
import { useDebounceCallBack } from "../../hooks";
import { useNavigate } from "react-router";

export default function Home() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<orderBy>("ASC");
  const navigate = useNavigate()

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contacts = await ContactsService.getContacts({
        name: search,
        orderBy,
      });
      setContacts(contacts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [search, orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleChangeSearch = useDebounceCallBack(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    }
  );

  function handleToggleOrderBy() {
    setOrderBy((orderBy) => (orderBy === "ASC" ? "DESC" : "ASC"));
  }

  const handleEditClick = () => {
    navigate("contacts/store");
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <section className={styles.contactsList}>
        <header>
          <Input
            placeholder="Buscar contato..."
            onChange={handleChangeSearch}
          />
          {search && (
            <p>
              Resultados encontrados para <strong>"{search}"</strong>.
            </p>
          )}
          <div>
            <button onClick={handleToggleOrderBy}>
              <strong>Nome</strong>
              <img data-order-by={orderBy} src={arrow} alt="Ordenar" />
            </button>
            <Button onClick={handleEditClick}>Novo Contato</Button>
          </div>
        </header>
        {!contacts.length && (
          <p className={styles.emptyContacts}>Nenhum contato encontrado.</p>
        )}
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            data={contact}
            onDelete={loadContacts}
          />
        ))}
      </section>
    </>
  );
}
