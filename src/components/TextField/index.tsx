import { InputHTMLAttributes } from "react";
import * as S from './styles'

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input {...props} />
      <span style={{fontSize: 12, color: 'red'}}>{props.error}</span>
    </div>
  );
};

export default TextField;
