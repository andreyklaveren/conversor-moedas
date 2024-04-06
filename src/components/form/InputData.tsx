import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  nome: string;
  placeholder: string;
}

export function InputData(props: InputProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="text-neutral text-lg">{props.nome}</h2>
      <input
        {...props}
        className="w-44 p-4 focus:outline-none border border-[#D7E0EB]  rounded drop-shadow-xl"
        type="number"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}
