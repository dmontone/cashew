import * as S from './styles'

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  return (
    <S.IconButtonStyles {...props}>
      {props.children}
    </S.IconButtonStyles>
  );
};
