import styled, { css } from 'styled-components'
import { g, colors, rgba } from '../../core'

export const SpecificityHeading = styled.div`
  margin-right: ${g(2)};
`
export const SpecificityName = styled.div``
export const SpecificityPoints = styled.div``
export const SpecificityEffects = styled.div`
  color: ${colors.primary1};
`
export const SpecificityDescription = styled.div`
  white-space: pre-line;
`

export const SpecificityItem = styled.div`
  margin-bottom: ${g(2)};
  padding-bottom: ${g(2)};
  opacity: 0.8;
  border-bottom: 1px solid ${rgba(colors.white, 0.8)};

  &:last-child {
    border-bottom: 0;
  }
`
export const SpecificityContentName = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: ${g(2)};
`
export const ActionPoints = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background: ${colors.neutral2};
  padding: ${g(1.5)};
  border-top: 2px solid ${rgba(colors.primary1, 0.6)};
`
export const ActionPoint = styled.div`
  position: relative;
  width: ${g(3)};
  height: ${g(3)};
  border-radius: ${g(3)};
  background: ${colors.neutral2};
  border: 1px solid ${rgba(colors.primary1, 0.3)};

  &:after {
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    border-radius: ${g(1)};
    box-shadow: 0 0 ${g(1)} ${g(1)} ${rgba(colors.neutral1, 0.6)};
    content: '';
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${rgba(colors.primary1, 0.6)};
      &:after {
        box-shadow: 0 0 ${g(1)} ${g(1)} rgba(50, 185, 50, 0.6);
      }
    `}
`

export const LifeBar = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  left: 2px;
  height: 4px;
  background: ${rgba('#af1717', 0.6)};
  border-radius: 4px;
  overflow: hidden;

  &:before {
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    box-shadow: inset -1px -1px 3px 0px rgba(0, 0, 0, 0.8);
  }

  &:after {
    background: #af1717;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    content: '';
    border-radius: 1px;

    ${({ current, max }) => css`
      width: ${(current / max) * 100}%;
    `}
  }
`
