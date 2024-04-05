import { Header } from "./components/Header";
import { CurrencyConverterForm } from "./components/form/CurrencyConverterForm";

export function App() {
  return (
    <div className="p-16">
      <Header />
      <CurrencyConverterForm />
    </div>
  );
}
