import useApp from "@/lib/app/hooks/useApp";
import { ICollectionCw721 } from "@/lib/app/types";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import FallbackImage from "@/modules/common/ui/Image/FallbackImage";
import Cw721TokenAction from "@/modules/cw721/token/TokenAction";
import { LINKS } from "@/utils/links";
import { 
  Box, 
  GridItem, 
  SimpleGrid, 
  Text, 
  VStack, 
  useToken, 
  Heading, 
  Badge, 
  Flex, 
  Icon, 
  useColorModeValue, 
  Button, 
  Skeleton,
  HStack,
  Tooltip
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { FiAward, FiEye, FiHeart, FiInfo, FiUser } from "react-icons/fi";

interface FeaturedItemProps {
  collection: ICollectionCw721;
}
const FeaturedItem: FC<FeaturedItemProps> = (props) => {
  const { collection } = props;
  const { data: token, loading: isLoading } = useGetCw721Token(collection.cw721, collection.featured || "");
  const [primary] = useToken("colors", ["primary.300"]);
  
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const subtleText = useColorModeValue("gray.600", "gray.400");
  
  if (!collection.featured) return null;
  
  return (
    <Box 
      borderRadius="xl" 
      overflow="hidden" 
      bg={cardBg} 
      boxShadow="xl"
      borderWidth="1px"
      borderColor={borderColor}
      position="relative"
    >
      <Badge 
        position="absolute" 
        top="4" 
        right="4" 
        colorScheme="purple" 
        fontSize="sm"
        px="3"
        py="1"
        borderRadius="full"
        zIndex="1"
      >
        <Flex align="center">
          <Icon as={FiAward} mr="1" />
          Featured
        </Flex>
      </Badge>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="0">
        <GridItem>
          <Flex justifyContent="center" alignItems="center" height="100%" p={{ base: 4, md: 8 }} bg={useColorModeValue("gray.50", "gray.900")}>
            <Link href={LINKS.cw721Token(collection.id, collection.featured)}>
              {isLoading ? (
                <Skeleton height="350px" width="350px" borderRadius="lg" />
              ) : (
                <Box
                  position="relative"
                  overflow="hidden"
                  borderRadius="lg"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.03)",
                  }}
                >
                  <FallbackImage
                    src={token?.metadata?.image}
                    alt={token?.metadata?.name || "Featured NFT"}
                    borderRadius="lg"
                    maxW="350px"
                    boxShadow="lg"
                    cursor="pointer"
                    _hover={{
                      boxShadow: `0px 0px 0px 4px ${primary}`,
                    }}
                  />
                </Box>
              )}
            </Link>
          </Flex>
        </GridItem>
        
        <GridItem p={6}>
          <VStack align="stretch" spacing={4}>
            {isLoading ? (
              <>
                <Skeleton height="32px" width="80%" />
                <Skeleton height="20px" width="60%" />
                <Skeleton height="100px" />
              </>
            ) : (
              <>
                <Box>
                  <Heading as="h3" size="lg" mb={2} isTruncated>
                    {token?.metadata?.name || "Untitled"}
                  </Heading>
                  <HStack spacing={3}>
                    <Badge colorScheme="blue">{collection.name}</Badge>
                    <Text fontSize="sm" color={subtleText}>#{collection.featured}</Text>
                  </HStack>
                </Box>

                <Text fontSize="md" color={subtleText} noOfLines={3}>
                  {token?.metadata?.description || "No description available"}
                </Text>

                <HStack spacing={4} py={2}>
                  <Tooltip label="Views">
                    <Flex align="center">
                      <Icon as={FiEye} mr={1} color={subtleText} />
                      <Text fontSize="sm" color={subtleText}>235</Text>
                    </Flex>
                  </Tooltip>
                  <Tooltip label="Likes">
                    <Flex align="center">
                      <Icon as={FiHeart} mr={1} color={subtleText} />
                      <Text fontSize="sm" color={subtleText}>42</Text>
                    </Flex>
                  </Tooltip>
                  <Tooltip label="Owner">
                    <Flex align="center">
                      <Icon as={FiUser} mr={1} color={subtleText} />
                      <Text fontSize="sm" color={subtleText} isTruncated maxW="120px">
                        {token?.extension?.publisher ? 
                          `${token.extension.publisher.slice(0, 6)}...${token.extension.publisher.slice(-4)}` : 
                          "Unknown"}
                      </Text>
                    </Flex>
                  </Tooltip>
                </HStack>
              </>
            )}
            
            <Box mt={4}>
              <Cw721TokenAction
                collection={collection}
                tokenId={collection.featured}
              />
            </Box>
            
            <Flex justify="space-between" mt={2}>
              <Button variant="outline" leftIcon={<FiInfo />} size="sm">
                Details
              </Button>
              <Button colorScheme="blue" size="sm">
                View Collection
              </Button>
            </Flex>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

interface Props {
}

const Featured: FC<Props> = (props) => {
  const { } = props;
  const { config } = useApp();
  
  const featuredCollections = config.collections.filter(col => "featured" in col && col.featured && col.featured.length > 0);
  
  if (featuredCollections.length === 0) {
    return (
      <Box 
        p={8} 
        textAlign="center" 
        borderRadius="lg" 
        bg={useColorModeValue("gray.50", "gray.800")} 
        borderWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Text fontSize="lg">No featured items available at the moment.</Text>
      </Box>
    );
  }
  
  return (
    <VStack alignItems="stretch" gap={8}>
      {featuredCollections.map(col => (
        <FeaturedItem key={col.id} collection={col as ICollectionCw721} />
      ))}
    </VStack>
  )
}

export default Featured
