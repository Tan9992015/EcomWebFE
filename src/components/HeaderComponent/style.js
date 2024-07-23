import {Row} from 'antd'
import styled from "styled-components"

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
     background-color: rgb(26,148,255);
    flex-wrap: nowrap;
    gap: 16px;
    align-items: center;
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`

export const WrapperHeaderAccount = styled.span`
    display: flex;
    alifn-items: center;
    color: #fff;
    gap: 10px;
`
export const WrapperHeaderCart = styled.span`
display: flex;
     align-items: center;
    color: #fff;
    gap: 10px;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26,148,255);
    }
`