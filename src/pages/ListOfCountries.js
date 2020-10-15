import React, { useState, useEffect } from "react"
import styled from "styled-components/macro";
import { ListItem } from "components/ListItem.js"
import Background from "images/coinsbackground.jpg"

const Wrapper = styled.main`
display: flex;
flex-direction: column;
align-items: center;
height: 400px;
padding: 130px;
overflow: scroll;
background-image: url(${Background});
background-repeat: no-repeat;
  background-size: cover;
`;

const CountryList = styled.section`
width: 300px;
overflow: scroll;
border: 10px solid #95b391;
display: flex;
flex-direction: column;
align-items: center;
  `;

const Cashin = styled.section`
width:300px;
background:#95b391;
padding: 10px;
text-align: center;
display:flex;
align-items: center;
flex-direction:column;
align-content:center;
`;

const CashinPut = styled.div`
background:#f7f2f2;
width:200px;
height:2.5rem;
width: inherit;
input{
font-size:2rem;
text-align: center;
width: 295px;
}
`;


export const ListOfCountries = () => {
    const [countries, setCountries] = useState([])
    const [amount, SetAmount] = useState(100)
    const ALL_URL = "https://restcountries.eu/rest/v2/all"

    const HandleSetAmount = (e) => {
        e.preventDefault();
        SetAmount(e.target.value);
    }

    useEffect(() => {
        const CountriesList = async () => {
            const res = await fetch(ALL_URL)
            const jsonRes = await res.json()
            setCountries(jsonRes)
        }
        CountriesList()
    }, []);

    return (
        <Wrapper>
            <Cashin>
                <h1>How much is your cash worth in the different countries, enter SEK &#8595; </h1>
                <CashinPut> <input type="number" value={amount} onChange={HandleSetAmount}
                /></CashinPut>
            </Cashin>
            <CountryList>
                {countries.map(country =>
                    <ListItem key={country.name}{...country} amount={amount} />
                )}
            </CountryList>
        </Wrapper>
    )
}

