import Logo from "../assets/logo.svg";
import moment from "moment";
export function Header() {
  const today = moment().format("DD [de] MMMM [de] YYYY [|] H:mm");
  return (
    <header>
      <nav className="flex items-center gap-12 ">
        <img className="w-40 h-20" src={Logo} alt="" />
        <div className="flex flex-col items-center">
          <h4 className="text-primary  font-medium">{today}</h4>
          <h5 className="text-secondary text-sm font-normal">
            Dados de câmbio disponibilizados pela Morningstar.
          </h5>
        </div>
      </nav>
    </header>
  );
}
