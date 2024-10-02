import { InputHTMLAttributes } from "react";
import * as S from './styles'

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({label, error, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <S.Input {...props} />
      <span style={{fontSize: 12, color: 'red'}}>{error}</span>
    </div>
  );
};
