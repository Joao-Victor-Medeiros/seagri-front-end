import type { BeneficiaryDetailDto } from "@/interfaces/beneficiary.interface";
import type { GeoJsonPolygonFeature } from "@/interfaces/map.interface";

const escapeHtml = (value: string | number | null | undefined) =>
  String(value ?? "—").replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const renderPolygon = (feature: GeoJsonPolygonFeature | null) => {
  const ring = feature?.geometry?.coordinates?.[0];
  const points = ring?.filter(
    ([longitude, latitude]) =>
      Number.isFinite(longitude) && Number.isFinite(latitude),
  );

  if (!points || points.length < 3) {
    return '<p class="empty-map">Não há coordenadas suficientes para desenhar o perímetro.</p>';
  }

  const width = 720;
  const height = 340;
  const padding = 28;
  const longitudes = points.map(([longitude]) => longitude);
  const latitudes = points.map(([, latitude]) => latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const longitudeSpan = Math.max(maxLongitude - minLongitude, 0.000001);
  const latitudeSpan = Math.max(maxLatitude - minLatitude, 0.000001);
  const scale = Math.min(
    (width - padding * 2) / longitudeSpan,
    (height - padding * 2) / latitudeSpan,
  );
  const drawnWidth = longitudeSpan * scale;
  const drawnHeight = latitudeSpan * scale;
  const offsetX = (width - drawnWidth) / 2;
  const offsetY = (height - drawnHeight) / 2;
  const polygonPoints = points
    .map(([longitude, latitude]) => {
      const x = offsetX + (longitude - minLongitude) * scale;
      const y = height - offsetY - (latitude - minLatitude) * scale;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return `<svg class="polygon" viewBox="0 0 ${width} ${height}" role="img" aria-label="Perímetro da propriedade">
    <defs>
      <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#e4ebe5" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>
    <polygon points="${polygonPoints}" fill="#b9ddc4" fill-opacity="0.7" stroke="#276343" stroke-width="4" stroke-linejoin="round"/>
  </svg>`;
};

const detail = (label: string, value: string | number | null | undefined) =>
  `<div class="detail"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;

export const buildBeneficiaryReportHtml = (
  beneficiary: BeneficiaryDetailDto,
): string => {
  const { informacoesPessoais, perfilProducao, enderecoRural } = beneficiary;
  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  const products = perfilProducao.produtos
    .map(
      (product) => `<tr>
        <td>${escapeHtml(product.nome)}</td>
        <td>${escapeHtml(product.quantidade)} ${escapeHtml(product.unidade)}</td>
        <td>${escapeHtml(product.validade)}</td>
        <td>R$ ${escapeHtml(product.preco)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Relatório da propriedade - ${escapeHtml(informacoesPessoais.nome)}</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #23342a; font-family: Arial, sans-serif; background: #e9eee9; }
    .sheet { width: 210mm; min-height: 297mm; margin: 16px auto; padding: 14mm; background: #fff; box-shadow: 0 4px 20px #0002; }
    header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding-bottom: 12px; border-bottom: 2px solid #276343; }
    .brand { color: #276343; font-size: 11px; font-weight: 700; letter-spacing: 1.3px; }
    h1 { margin: 5px 0 0; color: #1d3d29; font-size: 22px; }
    .generated { color: #647368; font-size: 10px; text-align: right; }
    section { margin-top: 16px; }
    h2 { margin: 0 0 9px; color: #276343; font-size: 12px; letter-spacing: .5px; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 18px; }
    .detail { display: flex; flex-direction: column; gap: 3px; min-width: 0; padding-bottom: 5px; border-bottom: 1px solid #edf1ed; }
    .detail span { color: #6a786e; font-size: 9px; }
    .detail strong { color: #25372b; font-size: 11px; font-weight: 600; overflow-wrap: anywhere; }
    .polygon { display: block; width: 100%; height: 85mm; border: 1px solid #dfe7e0; border-radius: 4px; }
    .empty-map { display: grid; height: 85mm; margin: 0; place-items: center; border: 1px dashed #cbd6cd; color: #6a786e; font-size: 11px; }
    table { width: 100%; border-collapse: collapse; font-size: 10px; }
    th, td { padding: 6px 8px; border-bottom: 1px solid #e6ece7; text-align: left; }
    th { color: #526357; font-size: 9px; text-transform: uppercase; }
    footer { margin-top: 18px; padding-top: 8px; border-top: 1px solid #dfe7e0; color: #738076; font-size: 9px; }
    @media print {
      html, body { width: 210mm; min-height: 297mm; background: #fff; }
      .sheet { width: 210mm; min-height: 297mm; margin: 0; box-shadow: none; }
    }
    @media screen {
      .sheet { min-height: 297mm; }
    }
  </style>
</head>
<body>
  <main class="sheet">
    <header>
      <div><div class="brand">SEAGRI-DF · GESTÃO RURAL</div><h1>Relatório da propriedade</h1></div>
      <div class="generated">Beneficiário #${escapeHtml(beneficiary.id)}<br>Gerado em ${escapeHtml(generatedAt)}</div>
    </header>
    <section>
      <h2>Dados do beneficiário</h2>
      <div class="grid">
        ${detail("Nome", informacoesPessoais.nome)}
        ${detail("CPF", informacoesPessoais.cpf)}
        ${detail("Contato", informacoesPessoais.telefone)}
        ${detail("E-mail", informacoesPessoais.email)}
      </div>
    </section>
    <section>
      <h2>Dados da propriedade e produção</h2>
      <div class="grid">
        ${detail("Propriedade", enderecoRural.nomePropriedade)}
        ${detail("Município / UF", [enderecoRural.municipio, enderecoRural.estado].filter(Boolean).join(" / "))}
        ${detail("CEP", enderecoRural.cep)}
        ${detail("Área (hectares)", perfilProducao.tamanhoPropriedade)}
        ${detail("Regime de produção", perfilProducao.regimeProducao)}
        ${detail("Segmento principal", perfilProducao.seguimentoPrincipal)}
        ${detail("Segmento secundário", perfilProducao.seguimentoSecundario)}
        ${detail("Programa SEAGRI", perfilProducao.programaSeagri)}
      </div>
    </section>
    <section>
      <h2>Perímetro da propriedade</h2>
      ${renderPolygon(enderecoRural.coordenadas)}
    </section>
    ${
      products
        ? `<section>
      <h2>Produtos cadastrados</h2>
      <table>
        <thead><tr><th>Produto</th><th>Quantidade</th><th>Validade</th><th>Valor</th></tr></thead>
        <tbody>${products}</tbody>
      </table>
    </section>`
        : ""
    }
    <footer>Relatório gerado pelo sistema SEAGRI-DF para impressão.</footer>
  </main>
</body>
</html>`;
};
