import Arrow from "../../assets/arrow.svg";

export function ConvertBtn() {
  return (
    <button className="mt-8 p-4 flex gap-4 rounded-lg border border-[#008B57] bg-[#00AB63] ">
      <img src={Arrow} alt="" />
      <p className="text-white">Converter</p>
    </button>
  );
}
