import { useEffect, useState } from "react";
import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import { api } from "../../services/api";

export function Form() {
  const [convertedValueUSDToBRL, setConvertedValueUSDToBRL] = useState(""); // Valor convertido de USD para BRL vindo da API
  //Valores definidos pelo usuário
  const [userValueDollar, setUserValueDollar] = useState(0); // Valor inserido pelo usuário em dólares
  const [userValueStateTax, setUserValueStateTax] = useState(0); // Imposto do estado inserido pelo usuário
  //Valor escolhido pelo usario no input type radio
  const [selectedOption, setSelectedOption] = useState("");
  const [resultUser, setResultUser] = useState(0); // Resultado do valor convertido para BRL pelo usuário
  const [resultWithStateTax, setResultWithStateTax] = useState(0); // Resultado com o imposto do estado aplicado
  //Valor total do calculo
  const [totalAmount, setTotalAmount] = useState(0); // Total do valor convertido com imposto
  const [finalValue, setFinalValue] = useState(0); // State for final value
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
      calculatePercent(calculatedResultUser, userValueStateTax).toFixed(2)
    );

    const calculatedTotalAmount =
      calculatedResultUser + calculatedResultWithStateTax;

    const calculatedFinalValue =
      calculatePercent(totalAmount, selectedOption === "dinheiro" ? 1.1 : 6.4) +
      totalAmount;

    setResultUser(calculatedResultUser);
    setResultWithStateTax(calculatedResultWithStateTax);
    setTotalAmount(calculatedTotalAmount);
    setFinalValue(calculatedFinalValue);
  }

  // Função para calcular porcentagem
  function calculatePercent(value1: number, value2: number) {
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
          <InputRadio
            onChange={(e) => setSelectedOption(e.target.value)}
            name="formaDePagamento"
            value="dinheiro"
            metodoPagamento="Dinheiro"
          />
          <InputRadio
            onChange={(e) => setSelectedOption(e.target.value)}
            name="formaDePagamento"
            value="cartao"
            metodoPagamento="Cartão"
          />
        </div>
        <div>{finalValue.toFixed(2)}</div>
      </section>
      <ConvertBtn type="submit" />
    </form>
  );
}
