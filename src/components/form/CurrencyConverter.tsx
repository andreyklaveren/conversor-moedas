import { TaxEUA } from "../TaxEUA";
import { Form } from "./form";

export function CurrencyConverter() {
  return (
    <section className="flex gap-44">
      <Form />
      <TaxEUA />
    </section>
  );
}
