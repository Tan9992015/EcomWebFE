import styled from "styled-components";
import { Upload } from "antd";
export const WrappperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    margin: 0 auto;
    width: 560px;
    padding: 30px;
    border-radisus: 10px;
    gap: 20px;
`
export const WrapperLabel = styled.label`
    color: #000;
    font-size: 30px;
    font-weight: 600;
    font-size: 12px;
    text-align: left;
    width: 60px;
`
export const WrapperInput = styled.div`
    display: flex;
    gap:10px;
    align-items: center;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none;
    }    
`