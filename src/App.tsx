import { Header } from "./components/Header";
import { CurrencyConverter } from "./components/form/CurrencyConverter";
import bg from "./assets/Mask-min.webp";

export function App() {
  return (
    <div
      className="p-16 bg-cover bg-right bg-no-repeat"
      style={{
        backgroundImage: `url(${bg})`, // Dolars backgroun image fixed
        height: "100vh",
        backgroundSize: "contain",
      }}
    >
      <Header />
      <CurrencyConverter />
    </div>
  );
}
