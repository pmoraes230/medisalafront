export interface Insumo {
  id_insumos: number;
  nome_insumo: string;
  especificacao_tec_insumo?: string;
  unidade_medida_insumo: 'UN' | 'KG' | 'L' | 'M';
  quantidade_estoq_insumo: string; // string com 3 casas (ex: "10.500")
  validade_insumo: string; // formato YYYY-MM-DD
}