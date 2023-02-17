import React from 'react'
import styled from 'styled-components'

const ParametresText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    height: 70vh;
`

const Parametres: React.FunctionComponent = () => {
    return (
        <ParametresText>Paramètres</ParametresText>
    )
}

export default Parametres
