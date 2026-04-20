import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProductionSectionProps } from "@/componentes/mobile-form/types";
import styles from "./production-profile.module.css";

export const ProductionProfileSection = ({
  formData,
  setFieldValue,
  addProduct,
  removeProduct,
  updateProduct,
}: ProductionSectionProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.field}>
        <Label htmlFor="propertySize">Area dedicada (hectares) *</Label>
        <Input
          id="propertySize"
          type="number"
          value={formData.propertySize}
          onChange={(event) => setFieldValue("propertySize", event.target.value)}
          placeholder="Ex: 5.5"
          required
        />
      </div>

      <div className={styles.field}>
        <Label htmlFor="productionType">Regime de producao *</Label>
        <Select value={formData.productionType} onValueChange={(value) => setFieldValue("productionType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de producao" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="familiar">Familiar</SelectItem>
            <SelectItem value="organico">Organico</SelectItem>
            <SelectItem value="pequeno-produtor">Pequeno produtor</SelectItem>
            <SelectItem value="agroecologica">Agroecologica</SelectItem>
            <SelectItem value="misto">Misto</SelectItem>
            <SelectItem value="convencional">Convencional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={styles.field}>
        <Label htmlFor="mainCrop">Seguimento Principal *</Label>
        <Select value={formData.mainCrop} onValueChange={(value) => setFieldValue("mainCrop", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cultura principal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hortalicas">Hortalicas</SelectItem>
            <SelectItem value="floricultura">Floricultura</SelectItem>
            <SelectItem value="graos">Graos</SelectItem>
            <SelectItem value="cafeicultura">Cafeicultura</SelectItem>
            <SelectItem value="apiculas">Apiculas</SelectItem>
            <SelectItem value="laticinios">Laticinios</SelectItem>
            <SelectItem value="aveicultura">Aveicultura</SelectItem>
            <SelectItem value="suinocultura">Suinocultura</SelectItem>
            <SelectItem value="bovino">Bovinocultura</SelectItem>
            <SelectItem value="ovinocultura">Ovinocultura</SelectItem>
            <SelectItem value="fruticultura">Fruticultura</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={styles.field}>
        <Label htmlFor="secCrop">Seguimento secundario</Label>
        <Select value={formData.secCrop} onValueChange={(value) => setFieldValue("secCrop", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cultura secundaria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hortalicas">Hortalicas</SelectItem>
            <SelectItem value="floricultura">Floricultura</SelectItem>
            <SelectItem value="graos">Graos</SelectItem>
            <SelectItem value="cafeicultura">Cafeicultura</SelectItem>
            <SelectItem value="apiculas">Apiculas</SelectItem>
            <SelectItem value="laticinios">Laticinios</SelectItem>
            <SelectItem value="aveicultura">Aveicultura</SelectItem>
            <SelectItem value="suinocultura">Suinocultura</SelectItem>
            <SelectItem value="bovino">Bovinocultura</SelectItem>
            <SelectItem value="ovinocultura">Ovinocultura</SelectItem>
            <SelectItem value="fruticultura">Fruticultura</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.secCrop === "outros" ? (
        <div className={styles.field}>
          <Input
            id="secCropOther"
            type="text"
            value={formData.secCropOther}
            onChange={(event) => setFieldValue("secCropOther", event.target.value)}
            placeholder="Especifique o seguimento secundario"
          />
        </div>
      ) : null}

      <div className={styles.field}>
        <Label htmlFor="products">Produtos de retorno</Label>
        <div className={styles.productList}>
          {formData.products.map((product, index) => (
            <div key={`${product.name}-${index}`} className={styles.productCard}>
              <div className={styles.productHeader}>
                <h3>Produto {index + 1}</h3>
                <Button variant="destructive" size="icon" onClick={() => removeProduct(index)}>
                  <X size={16} />
                </Button>
              </div>

              <div className={styles.grid}>
                <div className={styles.field}>
                  <Label htmlFor={`productName_${index}`}>Nome do Produto</Label>
                  <Input
                    id={`productName_${index}`}
                    type="text"
                    value={product.name}
                    onChange={(event) => updateProduct(index, "name", event.target.value)}
                    placeholder="Nome do produto"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <Label htmlFor={`productExpiry_${index}`}>Validade</Label>
                  <Input
                    id={`productExpiry_${index}`}
                    type="text"
                    value={product.expiry}
                    onChange={(event) => updateProduct(index, "expiry", event.target.value)}
                    placeholder="dd / mm / aaaa"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <Label htmlFor={`productQuantity_${index}`}>Quantidade</Label>
                  <div className={styles.quantityRow}>
                    <Input
                      id={`productQuantity_${index}`}
                      type="number"
                      value={product.quantity}
                      onChange={(event) => updateProduct(index, "quantity", event.target.value)}
                      placeholder="0"
                      required
                    />
                    <Select value={product.unit} onValueChange={(value) => updateProduct(index, "unit", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kg" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kg">Kg</SelectItem>
                        <SelectItem value="Tonelada">Tonelada</SelectItem>
                        <SelectItem value="Unidade">Unidade</SelectItem>
                        <SelectItem value="Caixa">Caixa</SelectItem>
                        <SelectItem value="Cabeca">Cabeca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className={styles.field}>
                  <Label htmlFor={`productPrice_${index}`}>Valor (R$)</Label>
                  <Input
                    id={`productPrice_${index}`}
                    type="number"
                    value={product.price}
                    onChange={(event) => updateProduct(index, "price", event.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="button" onClick={addProduct}>
            Adicionar
          </Button>
        </div>
      </div>

      <div className={styles.field}>
        <Label htmlFor="benefitProgram">Escolha o programa ao qual voce participa na Seagri</Label>
        <Select
          value={formData.benefitProgram}
          onValueChange={(value) => setFieldValue("benefitProgram", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o beneficio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desconheco">Desconheco os programas</SelectItem>
            <SelectItem value="papa">PAPA</SelectItem>
            <SelectItem value="paa">PAA</SelectItem>
            <SelectItem value="doacao-insumos">Doacao de Insumos</SelectItem>
            <SelectItem value="fomento-eventos">Fomento em eventos</SelectItem>
            <SelectItem value="pro-rural">PRO-RURAL</SelectItem>
            <SelectItem value="reflorestar">Reflorestar - Doacao de Mudas Nativas</SelectItem>
            <SelectItem value="alevinar">Alevinar - Doacao de alevinos</SelectItem>
            <SelectItem value="rota-fruticultura">Rota da Fruticultura</SelectItem>
            <SelectItem value="porteira-pra-dentro">Servicos de maquinario - Porteira Pra Dentro</SelectItem>
            <SelectItem value="produtor-agua">Produtor de Agua - Pagamento por Servicos Ambientais</SelectItem>
            <SelectItem value="cessao-maquinas">Cessao de uso de maquinas agricolas</SelectItem>
            <SelectItem value="fdr">FDR - Fundo de Desenvolvimento Rural</SelectItem>
            <SelectItem value="dcaa">DCAA - Declaracao de Conformidade de Atividade Agropecuaria</SelectItem>
            <SelectItem value="outros">Outro(s) detalhar a seguir</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
