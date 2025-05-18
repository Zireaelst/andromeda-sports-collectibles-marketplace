import React, { FC, useMemo } from "react";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721CollectionRow from "@/modules/cw721/components/CollectionRow";
import Cw20CollectionRow from "@/modules/cw20/components/CollectionRow";
import { Box, Flex, Heading, Text, Badge, Icon, useColorModeValue, Button } from "@chakra-ui/react";
import { FiExternalLink, FiUsers, FiPackage, FiBarChart2 } from "react-icons/fi";
import Link from "next/link";
import { LINKS } from "@/utils/links";

interface CollectionRowProps {
  collectionId: string;
}

const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const collection = useGetCollection(collectionId);
  
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgHover = useColorModeValue("gray.50", "gray.700");
  
  // Collection type to display text and icon mapping
  const collectionTypeInfo = useMemo(() => {
    switch (collection?.type) {
      case ICollectionType.AUCTION:
        return { label: "Auction", icon: FiBarChart2, color: "orange" };
      case ICollectionType.MARKETPLACE:
        return { label: "Marketplace", icon: FiPackage, color: "blue" };
      case ICollectionType.CROWDFUND:
        return { label: "Crowdfund", icon: FiUsers, color: "green" };
      case ICollectionType.EXCHANGE:
        return { label: "Exchange", icon: FiExternalLink, color: "purple" };
      default:
        return { label: "Collection", icon: FiPackage, color: "gray" };
    }
  }, [collection?.type]);

  // Render the appropriate collection component wrapped with enhanced UI
  const renderCollectionContent = () => {
    if (!collection) return null;
    
    let CollectionComponent = null;
    
    if (collection.type === ICollectionType.EXCHANGE) {
      CollectionComponent = <Cw20CollectionRow collectionId={collectionId} />;
    } else {
      // All CW721 types (AUCTION, MARKETPLACE, CROWDFUND)
      CollectionComponent = <Cw721CollectionRow collectionId={collectionId} />;
    }
    
    return (
      <Box>
        <Flex 
          mb={4} 
          justify="space-between" 
          align="center"
          flexWrap="wrap"
          gap={2}
        >
          <Flex align="center">
            <Box 
              mr={3} 
              bg={`${collectionTypeInfo.color}.100`} 
              color={`${collectionTypeInfo.color}.700`}
              p={2} 
              borderRadius="md"
            >
              <Icon as={collectionTypeInfo.icon} boxSize={6} />
            </Box>
            <Box>
              <Heading as="h3" size="md">
                {collection.name}
              </Heading>
              <Flex align="center" mt={1}>
                <Badge colorScheme={collectionTypeInfo.color} mr={2}>
                  {collectionTypeInfo.label}
                </Badge>
                <Text fontSize="sm" color="gray.500">
                  ID: {collection.id.substring(0, 8)}...
                </Text>
              </Flex>
            </Box>
          </Flex>
          
          <Link href={LINKS.collection(collection.id)} passHref>
            <Button
              size="sm"
              colorScheme={collectionTypeInfo.color}
              variant="outline"
              rightIcon={<FiExternalLink />}
            >
              View Collection
            </Button>
          </Link>
        </Flex>
        
        <Box
          borderTop="1px"
          borderColor={borderColor}
          pt={4}
        >
          {CollectionComponent}
        </Box>
      </Box>
    );
  };

  if (!collection) return null;

  return (
    <Box 
      p={5} 
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{ bg: bgHover }}
    >
      {renderCollectionContent()}
    </Box>
  );
};

export default CollectionRow;
