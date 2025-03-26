import { useEffect, useState } from "react";
import { Input } from "../../../components";
import { ICategory } from "../../../@types/Category";
import CategoryService from "../../../services/CategoryService";
import style from "./style.module.css";

export default function CreateContact() {
  const [categories, setCategory] = useState<ICategory[]>([]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    category_id: "",
  });

  const loadCategory = async () => {
    try {
      const categories = await CategoryService.getCategories();
      setCategory(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const handleStore = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erro: status ${response.status}`);
      }

      alert("Contato criado com sucesso!");
      setContact({ name: "", email: "", phone: "", category_id: "" });
    } catch (error) {
      console.error("Erro ao criar contato:", error);
      alert("Erro ao criar contato.");
    }
  };

  return (
    <>
      <form onSubmit={handleStore}>
        <label className={style.label} htmlFor="name">
          Name:
          <Input
            id="name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </label>
        <label className={style.label} htmlFor="email">
          Email:
          <Input
            type="email"
            id="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </label>
        <label className={style.label} htmlFor="phone">
          Phone:
          <Input
            type="tel"
            id="phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </label>
        <label className={style.label} htmlFor="category">
          Categories
          <select
            name="category"
            id="category"
            value={contact.category_id}
            onChange={(e) => setContact({ ...contact, category_id: e.target.value })}
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
        <Input type="submit" value="Criar Contato" />
      </form>
    </>
  );
}
