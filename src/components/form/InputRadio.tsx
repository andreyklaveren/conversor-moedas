interface InputRadioProps {
  metodoPagamento: string;
  name: string;
}

export function InputRadio(props: InputRadioProps) {
  return (
    <div className="flex">
      <div className="flex gap-2">
        <input
          className="size-6 cursor-pointer"
          type="radio"
          name={props.name}
          id=""
        />
        <p className="">{props.metodoPagamento}</p>
      </div>
    </div>
  );
}
