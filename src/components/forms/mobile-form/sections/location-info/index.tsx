import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapComponent } from "@/components/MapComponent";
import type { LocationSectionProps } from "@/components/forms/mobile-form/types";
import styles from "./location-info.module.css";

export const LocationInfoSection = ({
  formData,
  setFieldValue,
  polygonPointsCount,
}: LocationSectionProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.field}>
        <Label htmlFor="propertyName">Nome da propriedade *</Label>
        <Textarea
          id="propertyName"
          value={formData.propertyName}
          onChange={(event) => setFieldValue("propertyName", event.target.value)}
          placeholder="Inserir nome do espaco ou propriedade rural"
          required
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <Label htmlFor="municipality">Municipio *</Label>
          <Input
            id="municipality"
            type="text"
            value={formData.municipality}
            onChange={(event) => setFieldValue("municipality", event.target.value)}
            placeholder="Municipio"
            required
          />
        </div>

        <div className={styles.field}>
          <Label htmlFor="state">Estado *</Label>
          <Select value={formData.state} onValueChange={(value) => setFieldValue("state", value)}>
            <SelectTrigger>
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              {[
                "AC",
                "AL",
                "AP",
                "AM",
                "BA",
                "CE",
                "DF",
                "ES",
                "GO",
                "MA",
                "MT",
                "MS",
                "MG",
                "PA",
                "PB",
                "PR",
                "PE",
                "PI",
                "RJ",
                "RN",
                "RS",
                "RO",
                "RR",
                "SC",
                "SP",
                "SE",
                "TO",
              ].map((stateUf) => (
                <SelectItem key={stateUf} value={stateUf}>
                  {stateUf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={styles.field}>
        <Label htmlFor="cep">CEP</Label>
        <Input
          id="cep"
          type="text"
          value={formData.cep}
          onChange={(event) => setFieldValue("cep", event.target.value)}
          placeholder="00000-000"
        />
      </div>

      <div className={styles.field}>
        <Label htmlFor="map">Localizacao no Mapa *</Label>
        <MapComponent />
        {polygonPointsCount > 0 ? (
          <p className={styles.helper}>Poligono definido com {polygonPointsCount} pontos.</p>
        ) : null}
      </div>
    </div>
  );
};
