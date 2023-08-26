import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader'
import ErrorComponents from './ErrorComponents'

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`)

                setExchanges(data);

                setLoading(false)
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchExchanges();

    }, [])

    if (error) return <ErrorComponents message={"Error while exchanges fetching"} />

    return (<Container maxW={'container.xl'}>
        {loading ? (<Loader />) : (
            <>

                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {exchanges.map(i => (
                        <ExchangeCard
                            key={i.id}
                            name={i.name}
                            img={i.image}
                            rank={i.trust_score_rank}
                            url={i.url} />
                    ))}
                </HStack>

            </>)}
    </Container>
    )
}


const ExchangeCard = ({ name, img, rank, url }) => (
    <a href={url} target={'blank'}>

        <VStack w={'52'} p={'8'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'}
            m={'4'}
            css={{
                "&:hover": {
                    transform: "scale(1.1)"
                }
            }}
        >
            <Image src={img}
                width={'10'}
                height={'10'}
                objectFit={'contain'}
                alt={"Exchanges"} />

            <Heading size={'md'} noOfLines={1}>{rank}</Heading>

            <Text noOfLines={1}>{name}</Text>
        </VStack>

    </a>

)

export default Exchanges
