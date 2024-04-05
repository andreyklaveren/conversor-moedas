import { ConvertBtn } from "./ConvertBtn";
import { InputData } from "./InputData";
import { InputRadio } from "./InputRadio";
import axios from "axios";

axios
  .get("https://economia.awesomeapi.com.br/last/USD-BRL")
  .then(function (response) {
    // manipula o sucesso da requisição
    console.log(response.data.USDBRL.ask);
  });

export function CurrencyConverterForm() {
  return (
    <form className="mt-28">
      <section className="flex gap-6">
        <InputData nome="Dólar" placeholder="$ 1,00" />
        <InputData nome="Taxa do estado" placeholder="%" />
      </section>
      <section className="mt-8">
        <h2 className="text-lg mb-4">Tipo de compra</h2>
        <div className="flex gap-4">
          <InputRadio name="Dinheiro" metodoPagamento="Dinheiro" />
          <InputRadio name="Cartao" metodoPagamento="Cartão" />
        </div>
      </section>
      <ConvertBtn />
    </form>
  );
}
