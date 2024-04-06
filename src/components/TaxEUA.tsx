const mainTax = {
  LosAngeles: 9.55,
  SanFrancisco: 8.63,
  Dallas: 8.25,
  Orlando: 6.5,
  Miami: 7,
  NovaYork: 8.88,
  Filadelfia: 8,
  Chicago: 10.25,
  Cleveland: 8,
  Atlanta: 8.9,
};

interface TaxaProps {
  titulo: string;
  taxas: { [estado: string]: number };
}
function TaxasPorEstado(props: TaxaProps) {
  return (
    <>
      <h2>{props.titulo}</h2>
      {Object.entries(props.taxas).map(([estado, taxa]) => (
        <div key={estado}>
          {estado} {taxa}%
        </div>
      ))}
    </>
  );
}

export function TaxEUA() {
  return (
    <div className="mt-[60px] p-2 max-h-72 text-white border-2 rounded-lg bg-[#00AB63] border-[#008B57]">
      <TaxasPorEstado
        titulo="Principais taxas de cidades dos EUA"
        taxas={mainTax}
      />
    </div>
  );
}
