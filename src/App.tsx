import { Header } from "./components/Header";
import { CurrencyConverterForm } from "./components/form/CurrencyConverterForm";
import bg from "./assets/bg.svg";
export function App() {
  return (
    <div
      className="p-16 bg-cover bg-right bg-no-repeat"
      style={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
        backgroundSize: "contain",
      }}
    >
      <Header />

      <CurrencyConverterForm />
    </div>
  );
}
