import styled from 'styled-components'
import { ButtonSmall } from "~/components"

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const Backdrop = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.35;
  z-index: 1;
`

export const Content = styled.div`
  width: 100%;
  max-width: 520px;
  background: #FFFFFF;
  z-index: 2;
  border-radius: 20px;
  padding: 15px;
  box-sizing: border-box;
`

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h3`
  color: #333;
`

export const Body = styled.div`
  margin-bottom: 25px;
`

export const Footer = styled.div`
  display: flex;
  gap: 15px;
`

export const Action = styled(ButtonSmall)`
  &:first-child {
    margin-left: auto;
  }
`