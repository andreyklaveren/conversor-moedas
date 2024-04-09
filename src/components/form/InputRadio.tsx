import { ComponentProps } from "react";

interface InputRadioProps extends ComponentProps<"input"> {
  metodoPagamento: string;
  name: string;
  value: string;
  selectedOption?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputRadio(props: InputRadioProps) {
  return (
    <div className="flex">
      <div className="flex gap-2">
        <input
          className="size-6 cursor-pointer"
          type="radio"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
        <p className="">{props.metodoPagamento}</p>
      </div>
    </div>
  );
}
