import { useSearchParams } from "react-router-dom";
import { ContactsService } from "../../../services";
import React, { useEffect, useState } from "react";
import { IContact } from "../../../@types/Contact";
import { Input } from "../../../components";

export default function UpdateContact() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [contact, setContact] = useState<IContact>();

  const loadContact = async () => {
    try {
      if (id) {
        const contact = await ContactsService.showContact(id);
        setContact(contact);
      }
    } catch (error) {
      console.error("Erro ao carregar contato");
    }
  };

  useEffect(() => {
    loadContact();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contact) {
      try {
        const response = await fetch(
          `http://localhost:3001/contacts/${contact?.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        );

        if (response.ok) {
          const updateContact = await response.json();
          setContact(updateContact);
          alert("Contato Atualizado");
        } else {
          throw new Error(`Erro: status ${response.status}`);
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao atualizar contato");
      }
    }
  };

  if (!contact) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <form onSubmit={handleUpdate}>
        <Input
          value={contact.name || ""}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <Input
          value={contact.email || ""}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <Input
          value={contact.phone || ""}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <Input
          value={contact.category_name || ""}
          onChange={(e) => setContact({ ...contact, category_name: e.target.value })}
        />
        <Input type="submit" value="Atualizar Contato" />
      </form>
    </>
  );
}
