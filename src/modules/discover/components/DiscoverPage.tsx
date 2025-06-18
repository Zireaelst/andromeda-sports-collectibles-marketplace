import { useAppUtils } from "@/lib/app/hooks";
import {
  Box,
  Text,
  Heading,
  Flex,
  useColorModeValue,
  Container,
  Button,
  SimpleGrid,
  Icon,
  Divider,
  Badge,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import React, { FC, useMemo, useState, useEffect } from "react";
import CollectionRow from "./CollectionRow";
import Featured from "./Featured";
// Import each icon individually to avoid bundling issues
import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { FiStar } from "react-icons/fi";

interface DiscoverPageProps {}
const DiscoverPage: FC<DiscoverPageProps> = (props) => {
  const {} = props;
  const { getCollections } = useAppUtils();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Handle hash navigation
  useEffect(() => {
    // Check if there's a hash in the URL to scroll to the correct section
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Set active category if it's in the hash
      if (id === 'explore-basketball') {
        setActiveCategory('basketball');
      } else if (id === 'explore-football') {
        setActiveCategory('football');
      } else if (id === 'explore-baseball') {
        setActiveCategory('baseball');
      } else if (id === 'explore-hockey') {
        setActiveCategory('hockey');
      }
    }
  }, []);

  // Get all collections
  const allCollections = useMemo(() => {
    return getCollections();
  }, [getCollections]);

  // Filter collections based on active category
  const filteredCollections = useMemo(() => {
    if (activeCategory === "all") {
      return allCollections;
    }

    // In a real app, you would filter based on category metadata
    // This is a simulation for demo purposes
    const categoryMappings: Record<string, string[]> = {
      basketball: ["embeddables-auction-1"], // Example: map basketball category to specific collection IDs
      football: [],
      baseball: [],
      hockey: [],
    };

    const collectionIds = categoryMappings[activeCategory] || [];
    return allCollections.filter((col) => collectionIds.includes(col.id));
  }, [allCollections, activeCategory]);

  const bgGradient = useColorModeValue(
    "linear(to-r, blue.50, purple.50)",
    "linear(to-r, blue.900, purple.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const categories = [
    { id: "all", name: "All Collections" },
    { id: "basketball", name: "Basketball" },
    { id: "football", name: "Football" },
    { id: "baseball", name: "Baseball" },
    { id: "hockey", name: "Hockey" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        py={12}
        px={6}
        borderRadius="lg"
        mb={10}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient:
            "radial(circle at 20% 30%, rgba(255, 255, 255, 0.15), transparent 40%)",
          bgSize: "8px 8px",
          opacity: 0.6,
          zIndex: 0,
        }}
      >
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
          >
            <Box
              maxW={{ base: "100%", md: "60%" }}
              mb={{ base: 6, md: 0 }}
              order={{ base: 2, md: 1 }}
            >
              <Heading
                as="h1"
                size="2xl"
                mb={4}
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
              >
                Collect Digital Sports Memorabilia
              </Heading>
              <Text fontSize="xl" mb={6}>
                Discover, collect, and trade exclusive athlete NFTs powered by
                Andromeda Protocol
              </Text>
              <Flex gap={4}>
                <Button 
                  colorScheme="blue" 
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('explore');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Collections
                </Button>
              </Flex>
            </Box>
            <Box
              width={{ base: "100%", md: "35%" }}
              height="300px"
              position="relative"
              overflow="hidden"
              borderRadius="lg"
              boxShadow="xl"
              order={{ base: 1, md: 2 }}
            >
              {/* Featured collection visual placeholder */}
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgGradient="linear(to-br, blue.400, purple.600)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundImage="repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)"
              >
                <Text
                  fontSize="xl"
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  p={4}
                >
                  Featured Collection
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Search and Filter Section */}
      <Flex
        mb={8}
        p={4}
        borderRadius="md"
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={4}
        id="explore"
      >
        <Flex align="center" gap={2}>
          <Icon as={FiSearch} />
          <Text fontWeight="medium">Quick Search</Text>
        </Flex>

        <Flex
          gap={4}
          overflowX="auto"
          py={2}
          flex={1}
          justify="center"
          css={{
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "blue.400",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              size="sm"
              variant={activeCategory === category.id ? "solid" : "ghost"}
              colorScheme="blue"
              onClick={() => setActiveCategory(category.id)}
              id={`explore-${category.id}`}
            >
              {category.name}
            </Button>
          ))}
        </Flex>

        <Button leftIcon={<FiFilter />} variant="outline" size="sm">
          Filters
        </Button>
      </Flex>

      {/* Collections Section */}
      <Box mb={12} id="collections">
        <Flex align="center" mb={4}>
          <Icon as={FiGrid} mr={2} color="blue.500" />
          <Heading as="h2" size="lg">
            Explore{" "}
            {activeCategory !== "all"
              ? categories.find((c) => c.id === activeCategory)?.name
              : ""}{" "}
            Collections
            <Badge ml={2} colorScheme="blue" fontSize="md">
              {filteredCollections.length}
            </Badge>
          </Heading>
        </Flex>

        {filteredCollections.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {filteredCollections.map((col) => (
              <Box
                key={col.id}
                bg={cardBg}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                }}
              >
                <CollectionRow collectionId={col.id} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box
            bg={cardBg}
            borderRadius="lg"
            p={8}
            textAlign="center"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="lg"
              py={6}
              bg="transparent"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertDescription maxWidth="md" mt={4} fontSize="lg">
                Currently there are no collectibles available for{" "}
                {activeCategory !== "all"
                  ? categories.find((c) => c.id === activeCategory)?.name
                  : "this category"}.
              </AlertDescription>
            </Alert>
            <Button
              mt={6}
              colorScheme="blue"
              leftIcon={<FiInfo />}
              onClick={() => setActiveCategory("all")}
            >
              View All Collections
            </Button>
          </Box>
        )}
      </Box>

      <Divider my={8} />

      {/* Featured Section */}
      <Box mb={12} id="featured">
        <Flex align="center" mb={4}>
          <Icon as={FiStar} mr={2} color="blue.500" />
          <Heading as="h2" size="lg">
            Featured Collectibles
          </Heading>
        </Flex>
        <Featured />
      </Box>

      <Divider my={8} />

      {/* Trending Section - NEW SECTION */}
      <Box mb={12} id="trending">
        <Flex align="center" mb={4}>
          <Icon as={FiTrendingUp} mr={2} color="blue.500" />
          <Heading as="h2" size="lg">
            Trending Collectibles
          </Heading>
        </Flex>
        <Box
          bg={cardBg}
          borderRadius="lg"
          p={8}
          textAlign="center"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex direction="column" align="center" justify="center">
            <Icon as={FiAward} color="blue.400" boxSize={16} mb={4} />
            <Heading as="h3" size="md" mb={2}>
              This Week&apos;s Top Collectibles
            </Heading>
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} mb={6}>
              Discover the most popular sports memorabilia trending this week
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="100%">
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  borderWidth="1px"
                  borderColor={borderColor}
                  bg={useColorModeValue("white", "gray.700")}
                  p={4}
                >
                  <Flex align="center" justify="center" height="150px" bg={useColorModeValue("gray.100", "gray.800")} borderRadius="md" mb={4}>
                    <Text fontSize="lg" fontWeight="bold">Trending Item #{item}</Text>
                  </Flex>
                  <Heading as="h4" size="sm" mb={2} noOfLines={1}>Popular Collectible {item}</Heading>
                  <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                    This item is currently trending among collectors.
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
            <Button colorScheme="blue" mt={8}>
              View All Trending Items
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default DiscoverPage;
