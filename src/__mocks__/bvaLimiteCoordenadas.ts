// src/tests/fixtures/geoFixtures.ts
import { BvaGeoCase } from '@/types/BvaGeoCase';

// BVA para Latitude (Lembrando que no Sul, -16.05 é "menor" que -15.5)
export const bvaLatitudeCasos: BvaGeoCase[] = [
  { valor: -15.4999, esperado: false, descricao: 'fora do DF ao Norte' },
  { valor: -15.5000, esperado: true,  descricao: 'limite exato Norte' },
  { valor: -16.0500, esperado: true,  descricao: 'limite exato Sul' },
  { valor: -16.0501, esperado: false, descricao: 'fora do DF ao Sul' },
];

// BVA para Longitude
export const bvaLongitudeCasos: BvaGeoCase[] = [
  { valor: -48.3001, esperado: false, descricao: 'fora do DF a Oeste' },
  { valor: -48.3000, esperado: true,  descricao: 'limite exato Oeste' },
  { valor: -47.3333, esperado: true,  descricao: 'limite exato Leste' },
  { valor: -47.3332, esperado: false, descricao: 'fora do DF a Leste' },
];