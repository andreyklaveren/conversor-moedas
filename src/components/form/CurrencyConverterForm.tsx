import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

export function CurrencyConverterForm() {
  const [cotacaoDolar, setCotacaoDolar] = useState(0);
  const [valorUsuario, setValorUsuario] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    api.get("USD-BRL").then((response) => {
      const cotacao = parseFloat(response.data.USDBRL.ask);
      if (!isNaN(cotacao)) {
        setCotacaoDolar(cotacao.toFixed(2));
      } else {
        console.error("O valor da cotação do dólar não é um número.");
      }
    });
  }, [cotacaoDolar]);

  const handleSetValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorUsuario(parseInt(event.target.value));
  };

  function calculate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setResult(cotacaoDolar * valorUsuario);
  }

  return (
    <form className="mt-28">
      <section className="flex gap-6">
        <InputData
          onChange={handleSetValor}
          nome="Dólar"
          placeholder="$ 1,00"
        />
        <InputData nome="Taxa do estado" placeholder="%" />
      </section>
      <section className="mt-8">
        <h2 className="text-lg mb-4">Tipo de compra</h2>
        <div className="flex gap-4">
          <InputRadio name="Dinheiro" metodoPagamento="Dinheiro" />
          <InputRadio name="Cartao" metodoPagamento="Cartão" />
        </div>
      </section>
      <ConvertBtn onClick={calculate} />
      {
        <div>
          <section>
            Cotação do dólar:
            {cotacaoDolar}
          </section>
          <section>
            Cotação do dólar:
            {result}
          </section>
        </div>
      }
    </form>
  );
}
