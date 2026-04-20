import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SectionBaseProps } from "@/componentes/mobile-form/types";
import styles from "./personal-info.module.css";

export const PersonalInfoSection = ({ formData, setFieldValue }: SectionBaseProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.field}>
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(event) => setFieldValue("name", event.target.value)}
          placeholder="Seu nome completo"
          required
        />
      </div>

      <div className={styles.field}>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(event) => setFieldValue("email", event.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className={styles.field}>
        <Label htmlFor="phone">Telefone *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(event) => setFieldValue("phone", event.target.value)}
          placeholder="(11) 99999-9999"
          required
        />
      </div>

      <div className={styles.field}>
        <Label htmlFor="cpf">CPF *</Label>
        <Input
          id="cpf"
          type="text"
          value={formData.cpf}
          onChange={(event) => setFieldValue("cpf", event.target.value)}
          placeholder="000.000.000-00"
          required
        />
      </div>
    </div>
  );
};
