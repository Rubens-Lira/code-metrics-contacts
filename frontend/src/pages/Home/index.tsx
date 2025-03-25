import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import ContactCard from "../../components/ContactCard";
import { ContactsService } from "../../services";
import { IContact } from "../../@types/Contact";
import { Button, Input, Loader } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { orderBy } from "../../services/ContactsService";
import { useDebounceCallBack } from "../../hooks";

export default function Home() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState<orderBy>("ASC");

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

  // Função para carregar os contatos
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3001/contacts");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Erro ao carregar os contatos:", error);
      }
    };

    fetchContacts();
  }, []);

  // Função para atualizar a lista após a exclusão
  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
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
            <Button>Novo Contato</Button>
          </div>
        </header>
        {!contacts.length && (
          <p className={styles.emptyContacts}>Nenhum contato encontrado.</p>
        )}
        {contacts.map((contact) => {
          console.log(contact); // Faz o log do contato
          return <ContactCard key={contact.id} data={contact} onDelete={handleDeleteContact}/>;
        })}
      </section>
    </>
  );
}
