import type { FarmerFormData } from "@/interfaces/form.interface";
import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";
import type { FarmerSubmitPayload } from "@/interfaces/payload.interface";

export const mapFormToSubmitPayload = (
  formData: FarmerFormData,
  polygonGeoJSON: GeoJsonPolygonFeature | null,
): FarmerSubmitPayload => {
  return {
    informacoesPessoais: {
      nome: formData.name,
      email: formData.email,
      telefone: formData.phone,
      cpf: formData.cpf,
    },
    perfilProducao: {
      tamanhoPropriedade: formData.propertySize,
      regimeProducao: formData.productionType,
      seguimentoPrincipal: formData.mainCrop,
      seguimentoSecundario: formData.secCrop || null,
      programaSeagri: formData.benefitProgram || null,
      produtos: formData.products.map((product) => ({
        nome: product.name,
        validade: product.expiry,
        quantidade: product.quantity,
        unidade: product.unit,
        preco: product.price,
      })),
    },
    enderecoRural: {
      nomePropriedade: formData.propertyName,
      municipio: formData.municipality,
      estado: formData.state,
      cep: formData.cep || null,
      coordenadas: polygonGeoJSON,
    },
  };
};
