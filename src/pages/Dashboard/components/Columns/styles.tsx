import styled, { css, keyframes } from "styled-components"

const stylesByStatus: { [key in RegistrationStatuses]: { bg: string; color: string } } = {
  REVIEW: { bg: "#FDF8E9", color: "#EFC24D" },
  APROVED: { bg: "#EEEEFD", color: "#4242DF" },
  REPROVED: { bg: "#FBEDF6", color: "#CE2893" },
}

const rotation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`
export const TitleColumn = styled.h3`
  margin: 0px;
  margin: 24px;

  svg {
    color: #241c15;
    margin-left: 8px;
    width: 14px;
    height: 14px;

    animation: ${rotation} 1s linear infinite;
  }
`

export const Column = styled.div<{ $status: RegistrationStatuses, $isFetching?: boolean }>`
  height: auto;
  background-color: ${({ $status }) => stylesByStatus[$status].bg};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;

  ${TitleColumn} {
    color: ${({ $status }) => stylesByStatus[$status].color};
    ${({ $isFetching }) => !$isFetching && css`
      svg {
        display: none;
      }
    `};
  }
`

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`

/* color: ${({ status }) => stylesByStatus[status].title}; */