import { Heading, Image, Text, VStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
    <Link to={`/coin/${id}`}>
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

            <Heading size={'md'} noOfLines={1}>{symbol}</Heading>

            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
        </VStack>
    </Link>

)


export default CoinCard
