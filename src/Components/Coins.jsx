import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../index'
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader'
import ErrorComponents from './ErrorComponents'
import CoinCard from './CoinCard';

const Coins = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");


    const currencySymbol = currency === 'inr' ? "₹" : currency === 'eur' ? "€" : '$'

    const changePage = (page) => {
        setPage(page);
        setLoading(true)
    }

    const btn = new Array(132).fill(1)

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

                setCoins(data);


                setLoading(false)
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCoins();

    }, [currency, page])

    if (error) return <ErrorComponents message={"Error while exchanges fetching coins"} />

    return (<Container maxW={'container.xl'}>
        {loading ? (<Loader />) : (
            <>

                <RadioGroup value={currency} onChange={setCurrency} padding={'9'}>
                    <HStack spacing={'4'}>
                        <Radio value={'inr'}>₹ inr</Radio>
                        <Radio value={'usd'}>$ DOLLAR</Radio>
                        <Radio value={'eur'}>€ EURO</Radio>
                    </HStack>
                </RadioGroup>

                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {coins.map(i => (
                        <CoinCard
                            id={i.id}
                            key={i.id}
                            name={i.name}
                            price={i.current_price}
                            img={i.image}
                            symbol={i.symbol}
                            currencySymbol={currencySymbol} />
                    ))}
                </HStack>
                <HStack width={'full'} overflowX={'auto'} padding={'8'}>
                    {
                        btn.map((item, index) => (

                            <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)}>{index + 1}</Button>
                        ))
                    }
                </HStack>

            </>)}
    </Container>
    )
}






export default Coins