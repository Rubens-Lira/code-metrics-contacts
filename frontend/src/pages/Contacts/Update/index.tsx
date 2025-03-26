import { useSearchParams } from "react-router-dom";
import { ContactsService } from "../../../services";
import React, { useEffect, useState } from "react";
import { IContact } from "../../../@types/Contact";
import { Input } from "../../../components";
import { ICategory } from "../../../@types/Category";
import CategoryService from "../../../services/CategoryService";

export default function UpdateContact() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [contact, setContact] = useState<IContact>();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const loadContact = async () => {
      if (id) {
        try {
          const contactData = await ContactsService.showContact(id);
          setContact(contactData);
        } catch (error) {
          console.error("Erro ao carregar contato", error);
        }
      }
    };
    loadContact();
  }, [id]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CategoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    };
    loadCategories();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/contacts/${contact?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (!response.ok) throw new Error(`Erro: status ${response.status}`);

      const updatedContact = await response.json();
      setContact(updatedContact);
      alert("Contato atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar contato", error);
      alert("Erro ao atualizar contato");
    }
  };

  if (!contact) return <p>Carregando...</p>;

  return (
    <>
      <form onSubmit={handleUpdate}>
        <Input
          value={contact.name || ""} // 🔹 Evita erro se `contact.name` for `undefined`
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <Input
          value={contact.email || ""} // 🔹 Evita erro se `contact.email` for `undefined`
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <Input
          value={contact.phone || ""} // 🔹 Evita erro se `contact.phone` for `undefined`
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        
        <label htmlFor="category">
          Categories
          <select
            name="category"
            id="category"
            value={contact.category_id || ""}
            onChange={(e) =>
              setContact({ ...contact, category_id: e.target.value }) 
            }
          >
            <option value="" disabled>
              ---
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        
        <Input type="submit" value="Atualizar Contato" />
      </form>
    </>
  );
}
