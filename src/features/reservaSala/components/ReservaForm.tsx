/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSalas } from "@/features/classRegister/hooks/useSalas";
import { useInsumos } from "@/features/InsumosRegistro/hooks/useInsumos";
import { useState } from "react";
import { Insumo } from "@/features/InsumosRegistro/types/insumo";

interface InsumoSelecionado {
  id_insumos: number;
  nome_insumo: string;
  unidade_medida_insumo: string;
  quantidade_utilizada: number;
  estoque_disponivel: number;
}

interface Props {
  onSubmit: (data: any, insumos: InsumoSelecionado[]) => void;
  onReset: () => void;
}

export default function ReservaForm({ onSubmit, onReset }: Props) {
  const { salas } = useSalas();
  const { insumos } = useInsumos();
  const [selectedInsumos, setSelectedInsumos] = useState<InsumoSelecionado[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addInsumo = (insumo: Insumo) => {
    if (selectedInsumos.find(i => i.id_insumos === insumo.id_insumos)) return;
    setSelectedInsumos([...selectedInsumos, {
      id_insumos: insumo.id_insumos,
      nome_insumo: insumo.nome_insumo,
      unidade_medida_insumo: insumo.unidade_medida_insumo,
      quantidade_utilizada: 1,
      estoque_disponivel: parseFloat(insumo.quantidade_estoq_insumo),
    }]);
    setShowSelector(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);

    onSubmit(data, selectedInsumos);
  };

  return (
    <div className="card_reserva">
      <div className="card_header">
        <h3><i className="fas fa-calendar-plus"></i> Nova Reserva</h3>
      </div>
      <div className="card_body">
        <form onSubmit={handleSubmit} id="reserva-form">
          <div className="form-row">
            <div className="form-group">
              <label>Data *</label>
              <input type="date" name="data_reserva" required min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Hora Início *</label>
              <input type="time" name="hora_inicio_reserva" required />
            </div>
            <div className="form-group">
              <label>Hora Término *</label>
              <input type="time" name="hora_termino_reserva" required />
            </div>
          </div>

          <div className="form-group">
            <label>Sala *</label>
            <select name="id_sala" required>
              <option value="">Selecione uma sala...</option>
              {salas.map(sala => (
                <option key={sala.id_sala} value={sala.id_sala}>
                  {sala.nome_sala} ({sala.capacidade_sala} pessoas)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Observação (opcional)</label>
            <textarea name="observacao_reserva" rows={2} placeholder="Ex: Aula de Biologia com 20 alunos" />
          </div>

          <div className="insumos-section">
            <h4><i className="fas fa-box"></i> Insumos Necessários</h4>
            <div id="insumos-list">
              {selectedInsumos.map((item, i) => (
                <div key={i} className="insumo-item">
                  <span>{item.nome_insumo} ({item.unidade_medida_insumo})</span>
                  <input
                    type="number"
                    name="qtd_insumo"
                    id="qtd_insumo"
                    min="0.001"
                    max={item.estoque_disponivel}
                    step="0.001"
                    defaultValue="1"
                    onChange={(e) => {
                      const qty = parseFloat(e.target.value) || 0;
                      if (qty > item.estoque_disponivel) alert('Estoque insuficiente!');
                      item.quantidade_utilizada = qty;
                    }}
                  />
                  <button type="button" style={{ color: '#ef4444', background: 'none', border: 'none' }} onClick={() => setSelectedInsumos(selectedInsumos.filter((_, idx) => idx !== i))}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className="btn-small" onClick={() => setShowSelector(true)}>
              <i className="fas fa-plus"></i> Adicionar Insumo
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-modal cancel" onClick={onReset}>Limpar</button>
            <button type="submit" className="btn-modal">Reservar</button>
          </div>
        </form>

        {showSelector && (
          <div className="modal-overlay show" onClick={() => setShowSelector(false)}>
            <div className="modal_default" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
              <div className="modal_header">
                <button className="btn_close" onClick={() => setShowSelector(false)}>×</button>
                <div className="modal_title">Selecionar Insumo</div>
              </div>
              <div className="modal_body">
                {insumos.map(insumo => (
                  <div key={insumo.id_insumos} className="insumo-option mb-3" onClick={() => addInsumo(insumo)}>
                    <div>
                      <strong>{insumo.nome_insumo}</strong><br />
                      <small>Estoque: {insumo.quantidade_estoq_insumo} {insumo.unidade_medida_insumo}</small>
                    </div>
                    <button type="button" className="btn-small">Adicionar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}