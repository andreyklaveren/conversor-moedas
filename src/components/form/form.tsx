import { useEffect, useState } from "react";
import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import { api } from "../../services/api";

export function Form() {
  const [userValue, setUserValue] = useState(0);
  const [valueTax, setValueTax] = useState(0);
  const [result, setResult] = useState(0);
  const [convertedValueUSD_to_BRL, setConvertedValueUSD_to_BRL] = useState("");

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
  function calculate(event: { preventDefault: () => void }) {
    event.preventDefault();
    setResult(parseFloat(convertedValueUSD_to_BRL) * userValue);
  }
  return (
    <form onSubmit={calculate} className="mt-28 mb-28">
      <section className="flex gap-6">
        <InputData
          nome="Dólar"
          placeholder="$ 1,00"
          onChange={(e) => setUserValue(parseFloat(e.target.value))}
        />
        <InputData
          nome="Taxa do estado"
          placeholder="%"
          onChange={(e) => setValueTax(parseFloat(e.target.value))}
        />
      </section>
      <section className="mt-8">
        <h2 className="text-lg mb-4">Tipo de compra</h2>
        <div className="flex gap-4">
          <InputRadio name="Dinheiro" metodoPagamento="Dinheiro" />
          <InputRadio name="Cartao" metodoPagamento="Cartão" />
        </div>
      </section>
      <ConvertBtn type="submit" />
    </form>
  );
}
