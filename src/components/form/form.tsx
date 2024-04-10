import { useEffect, useState } from "react";
import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import { api } from "../../services/api";
import ArrowLeft from "../../assets/arrow-left.svg";
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
  const [showResult, setShowResult] = useState(false);
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
  async function calculate(event: { preventDefault: () => void }) {
    event.preventDefault(); // Impede a atualização da página

    // Realize os cálculos necessários
    const calculatedResultUser =
      parseFloat(convertedValueUSDToBRL) * userValueDollar;

    const calculatedResultWithStateTax = parseFloat(
      calculatePercent(calculatedResultUser, userValueStateTax).toFixed(2)
    );

    const calculatedTotalAmount =
      calculatedResultUser + calculatedResultWithStateTax;

    setFinalValue(
      calculatePercent(totalAmount, selectedOption === "dinheiro" ? 1.1 : 6.4) +
        totalAmount
    );

    // Atualize os estados com os resultados dos cálculos
    setResultUser(calculatedResultUser);
    setResultWithStateTax(calculatedResultWithStateTax);
    setTotalAmount(calculatedTotalAmount);

    // Exiba a seção de resultados
    setShowResult(true);
  }
  // Função para calcular porcentagem
  function calculatePercent(value1: number, value2: number) {
    return (value1 * value2) / 100;
  }
  useEffect(() => {
    setFinalValue(
      calculatePercent(totalAmount, selectedOption === "dinheiro" ? 1.1 : 6.4) +
        totalAmount
    );
  }, [totalAmount, selectedOption]);

  return (
    <>
      <form
        onSubmit={calculate}
        className={`mt-28 mb-28 ${showResult ? "hidden" : ""}`}
      >
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
        </section>
        <ConvertBtn type="submit" />
      </form>
      <section className={`mt-28 mb-28 max-w-80 ${showResult ? "" : "hidden"}`}>
        <button
          className="flex align-center gap-4 mb-8 p-4 rounded-lg border border-solid border-secondary bg-white"
          onClick={() => setShowResult(false)}
        >
          <img
            src={ArrowLeft}
            alt="Flecha para esquerda dentro do botão voltar"
          />
          <p>Voltar</p>
        </button>
        <div className="mb-8">
          <h2 className="mb-8">O resultado do cálculo é</h2>
          <h1 className="text-[#00AB63] font-medium text-6xl">
            R$ {finalValue.toFixed(2)}
          </h1>
        </div>
        <section className="text-secondary">
          Cotação do dólar: {convertedValueUSDToBRL} <br />
          Resultado com a taxa do estado: {totalAmount} <br />
          Taxa fixa na compra em dinheiro: 1.1% <br />
          Taxa fixa na compra com cartão: 6.4% <br />
        </section>
      </section>
    </>
  );
}
