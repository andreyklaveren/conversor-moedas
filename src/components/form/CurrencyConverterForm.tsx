import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

export function CurrencyConverterForm() {
  const [convertedValueUSD_to_BRL, setConvertedValueUSD_to_BRL] = useState("");
  const [userValue, setUserValue] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    api
      .get("USD-BRL")
      .then((response) => {
        setConvertedValueUSD_to_BRL(
          parseFloat(response.data.USDBRL.ask).toFixed(2) // Pega o valor convertido de USD to BRL
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [convertedValueUSD_to_BRL]);

  const handleSetValor = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(parseFloat(value));
  };

  function calculate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setResult(parseFloat(convertedValueUSD_to_BRL) * userValue);
  }

  return (
    <div>
      <form className="mt-28 mb-28">
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
      </form>
      <div className="flex flex-col gap-1">
        <div className="max-w-[90px]">
          <p className="text-xl">Informações</p>
        </div>
        {
          <section className="flex flex-col gap-1 p-4 max-w-[360px] border-2 rounded-lg bg-[#00AB63] border-[#008B57] drop-shadow-2xl">
            <div>
              <p className="text-white">
                <strong>Cotação do dólar:</strong> $1,00 = R$
                {convertedValueUSD_to_BRL}
              </p>
            </div>
            <div>
              <p className="text-white">
                <strong>O resultado do cálculo é</strong> R${result.toFixed(2)}
              </p>
            </div>
          </section>
        }
      </div>
    </div>
  );
}
