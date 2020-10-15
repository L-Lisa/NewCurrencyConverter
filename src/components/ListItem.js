import React, { useState } from "react"
import styled from "styled-components/macro";

const ListSection = styled.article`
width: 280px;
background: #f7f2f2;
padding: 10px;
`;

const Info = styled.div`
color:#1c1c1c;
`;

const Country = styled.div`
width: auto;
text-align: left;
padding: 10px;
font-size: 25px;
border-radius: 2px;
margin: 3px;
background: lightgray;
`;
const PayPara = styled.p`
background:red;
`;

const Sum = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
`;
const YourMoney = styled.p`
font-weight: 700;
background: #8bc34a78;
padding: 10px;
border-radius: 3px;
`;


export const ListItem = ({ amount, name, currencies, population, flag, capital }) => {
    const [showInfo, setShowInfo] = useState(false)
    const [TheXchangeRate, setTheXchangeRate] = useState()

    const bucks = `${currencies[0].code}`.toString()

    const GetMoney = () => {

        const GetHttpSRate = async () => {
            const res = await fetch(`https://v6.exchangerate-api.com/v6/547f5391104d30d830f55442/latest/SEK`)
            const jsonSweRes = await res.json()
            setTheXchangeRate(jsonSweRes.conversion_rates[`${bucks}`])
        }

        GetHttpSRate()

    }

    const handlecountryClick = () => {
        setShowInfo(!showInfo)
        if (!showInfo) { GetMoney() }

    }

    const EasyCalc = amount * TheXchangeRate
    const ShortEasyCalc = Number(EasyCalc).toFixed(2)
    return (

        < ListSection >
            <Country onClick={handlecountryClick}>{name}</Country>
            {showInfo && <Info>
                <h2>Capital city: {capital}</h2>
                <p>Total Population: {population}</p>
                <Sum>Your SEK is worth: {TheXchangeRate ? (<YourMoney>{ShortEasyCalc}  {bucks}</YourMoney>) : (<PayPara> Please pay developer for full access including all currencies and calculations about your money</PayPara>)}</Sum>
            </Info>}
        </ ListSection>
    )
}

