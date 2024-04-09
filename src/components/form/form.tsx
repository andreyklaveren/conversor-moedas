import { useEffect, useState } from "react";
import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import { api } from "../../services/api";

export function Form() {
  const [convertedValueUSDToBRL, setConvertedValueUSDToBRL] = useState(""); // Valor convertido de USD para BRL
  const [userValueDollar, setUserValueDollar] = useState(0); // Valor inserido pelo usuário em dólares
  const [userValueStateTax, setUserValueStateTax] = useState(0); // Imposto do estado inserido pelo usuário
  const [resultUser, setResultUser] = useState(0); // Resultado do valor convertido para BRL pelo usuário
  const [resultWithStateTax, setResultWithStateTax] = useState(0); // Resultado com o imposto do estado aplicado
  const [totalAmount, setTotalAmount] = useState(0); // Total do valor convertido com imposto

  useEffect(() => {
    api
      .get("USD-BRL")
      .then((response) => {
        setConvertedValueUSDToBRL(
          parseFloat(response.data.USDBRL.ask).toFixed(2) // Pega o valor convertido de USD para BRL
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [convertedValueUSDToBRL]);

  //Usei o 'destruct' para pegar a função de 'evento' que eu precisava
  function calculate(event: { preventDefault: () => void }) {
    event.preventDefault(); // Impede a atualização da página
    resultUser;
    resultWithStateTax;
    const calculatedResultUser =
      parseFloat(convertedValueUSDToBRL) * userValueDollar;

    const calculatedResultWithStateTax = parseFloat(
      calculateStateTax(calculatedResultUser, userValueStateTax).toFixed(2)
    );

    const calculatedTotalAmount =
      calculatedResultUser + calculatedResultWithStateTax;

    setResultUser(calculatedResultUser);
    setResultWithStateTax(calculatedResultWithStateTax);
    setTotalAmount(calculatedTotalAmount);
  }

  // Função para calcular o valor do imposto do estado sob o valor convertido do dolar para BRL setado pelo usuario
  function calculateStateTax(value1: number, value2: number) {
    return (value1 * value2) / 100;
  }

  return (
    <form onSubmit={calculate} className="mt-28 mb-28">
      <section className="flex gap-6">
        <InputData
          nome="Dólar"
          placeholder="$ 1,00"
          required
          onChange={(e) => setUserValueDollar(parseFloat(e.target.value))}
        />
        <InputData
          nome="Imposto do estado"
          placeholder="%"
          required
          onChange={(e) => setUserValueStateTax(parseFloat(e.target.value))}
        />
        <div>{totalAmount}</div>
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
