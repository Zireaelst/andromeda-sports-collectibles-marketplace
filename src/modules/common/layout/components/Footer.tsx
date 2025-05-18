import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  Image,
  Button,
  IconButton,
  Input,
  Heading,
  Divider,
  Link as ChakraLink,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import useApp from "@/lib/app/hooks/useApp";
import Link from "next/link";
import { FiTwitter, FiInstagram, FiYoutube, FiGithub, FiLinkedin, FiHelpCircle } from "react-icons/fi";
import { LINKS } from "@/utils/links";

interface FooterProps {}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const Footer: FC<FooterProps> = (props) => {
  const {} = props;
  const { config } = useApp();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accordionBg = useColorModeValue('white', 'gray.800');
  const accordionTextColor = useColorModeValue('gray.800', 'white');
  const accordionBorder = useColorModeValue('gray.200', 'gray.600');
  const accordionPanelColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      mt={10}
    >
      {/* Help Section - Added at the top of the footer */}
      <Box id="help" py={12} px={4}>
        <Container maxW="container.xl">
          <Flex 
            direction="column" 
            align="center" 
            justify="center" 
            textAlign="center"
            mb={8}
          >
            <Flex
              align="center"
              justify="center"
              bg={useColorModeValue("blue.100", "blue.900")}
              borderRadius="full"
              w={16}
              h={16}
              mb={4}
            >
              <FiHelpCircle size={30} color={useColorModeValue("blue.600", "blue.200")} />
            </Flex>
            <Heading as="h2" size="xl" mb={4}>
              Need Help?
            </Heading>
            <Text fontSize="lg" maxW="2xl" mb={8} color={useColorModeValue("gray.600", "gray.400")}>
              Find answers to frequently asked questions about our Sports NFT Marketplace
            </Text>
          </Flex>
          
          <Accordion 
            allowToggle 
            maxW="container.md" 
            mx="auto"
          >
            <AccordionItem 
              borderColor={accordionBorder}
              mb={2}
              bg={accordionBg}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <h2>
                <AccordionButton 
                  _expanded={{ bg: useColorModeValue('blue.50', 'blue.900'), color: useColorModeValue('blue.700', 'blue.200') }}
                  color={accordionTextColor}
                  py={3}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    What is an NFT?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color={accordionPanelColor}>
                NFT stands for "Non-Fungible Token" which represents unique digital items on a blockchain. 
                Unlike cryptocurrencies, each NFT is one-of-a-kind or has limited copies, making them scarce 
                digital assets. On our platform, sports NFTs represent collectible digital memorabilia related 
                to athletes and sports events.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              borderColor={accordionBorder}
              mb={2}
              bg={accordionBg}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <h2>
                <AccordionButton 
                  _expanded={{ bg: useColorModeValue('blue.50', 'blue.900'), color: useColorModeValue('blue.700', 'blue.200') }}
                  color={accordionTextColor}
                  py={3}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    How do I connect my wallet?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color={accordionPanelColor}>
                Click on the "Connect Wallet" button in the top right corner of the site. Our platform supports 
                Keplr wallet for Cosmos ecosystem. You'll need to install the Keplr browser extension if you 
                don't already have it, then follow the prompts to connect your wallet to our marketplace.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              borderColor={accordionBorder}
              mb={2}
              bg={accordionBg}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <h2>
                <AccordionButton 
                  _expanded={{ bg: useColorModeValue('blue.50', 'blue.900'), color: useColorModeValue('blue.700', 'blue.200') }}
                  color={accordionTextColor}
                  py={3}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    How do I purchase an NFT?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color={accordionPanelColor}>
                First, make sure your wallet is connected and has sufficient funds. Browse collections, 
                find an NFT you want to purchase, click on it to view details, then click "Buy Now" 
                or place a bid if it's an auction. Confirm the transaction in your wallet when prompted.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              borderColor={accordionBorder}
              mb={2}
              bg={accordionBg}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <h2>
                <AccordionButton 
                  _expanded={{ bg: useColorModeValue('blue.50', 'blue.900'), color: useColorModeValue('blue.700', 'blue.200') }}
                  color={accordionTextColor}
                  py={3}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    What is Andromeda Protocol?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color={accordionPanelColor}>
                Andromeda Protocol is the blockchain technology that powers our NFT marketplace. 
                It's built on the Cosmos ecosystem and provides the secure infrastructure for creating, 
                buying, selling, and trading NFTs with low fees and fast transactions.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem 
              borderColor={accordionBorder}
              mb={2}
              bg={accordionBg}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
            >
              <h2>
                <AccordionButton 
                  _expanded={{ bg: useColorModeValue('blue.50', 'blue.900'), color: useColorModeValue('blue.700', 'blue.200') }}
                  color={accordionTextColor}
                  py={3}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    How can I contact support?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color={accordionPanelColor}>
                For any additional questions or issues, please email us at support@sportsnft.com 
                or use the contact form on our Contact page. Our support team is available 
                Monday through Friday, 9am-5pm EST.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </Box>
      
      <Divider borderColor={borderColor} />
      
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Flex alignItems="center">
              <Image 
                src="/logo.png" 
                boxSize="40px" 
                mr={3} 
                alt="Logo" 
              />
              <Text
                fontWeight="bold"
                fontSize="2xl"
                bgGradient="linear(to-r, blue.500, purple.500)"
                bgClip="text"
              >
                {config.name || "Sports NFTs"}
              </Text>
            </Flex>
            <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
              Discover, collect, and trade exclusive athlete NFTs powered by Andromeda Protocol
            </Text>
            <Stack direction={'row'} spacing={4}>
              <ChakraLink href="#" isExternal>
                <IconButton
                  aria-label="Twitter"
                  icon={<FiTwitter />}
                  size="md"
                  colorScheme="twitter"
                  variant="ghost"
                  rounded="full"
                />
              </ChakraLink>
              <ChakraLink href="#" isExternal>
                <IconButton
                  aria-label="Instagram"
                  icon={<FiInstagram />}
                  size="md"
                  colorScheme="pink"
                  variant="ghost"
                  rounded="full"
                />
              </ChakraLink>
              <ChakraLink href="https://www.youtube.com/@andromedaprotocol" isExternal>
                <IconButton
                  aria-label="Youtube"
                  icon={<FiYoutube />}
                  size="md"
                  colorScheme="red"
                  variant="ghost"
                  rounded="full"
                />
              </ChakraLink>
              <ChakraLink href="https://github.com/andromedaprotocol" isExternal>
                <IconButton
                  aria-label="Github"
                  icon={<FiGithub />}
                  size="md"
                  variant="ghost"
                  rounded="full"
                />
              </ChakraLink>
            </Stack>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link href={LINKS.home()} passHref>Marketplace</Link>
            <Link href={LINKS.home()} passHref>Collections</Link>
            <Link href={LINKS.home()} passHref>Trending</Link>
            <Link href={LINKS.home()} passHref>Create</Link>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Sports</ListHeader>
            <Link href={LINKS.home()} passHref>Basketball</Link>
            <Link href={LINKS.home()} passHref>Football</Link>
            <Link href={LINKS.home()} passHref>Baseball</Link>
            <Link href={LINKS.home()} passHref>Soccer</Link>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <ChakraLink href="#help">Help Center</ChakraLink>
            <ChakraLink href="https://www.andromedaprotocol.io/terms" isExternal>Terms of Service</ChakraLink>
            <ChakraLink href="https://www.andromedaprotocol.io/privacy" isExternal>Privacy Policy</ChakraLink>
            <ChakraLink href="https://www.andromedaprotocol.io/contact" isExternal>Contact Us</ChakraLink>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Stay Updated</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('white', 'gray.800')}
                border={1}
                borderColor={borderColor}
                _focus={{
                  bg: useColorModeValue('white', 'gray.800'),
                  borderColor: 'blue.500',
                }}
              />
              <Button
                colorScheme="blue"
                bg={'blue.400'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Subscribe
              </Button>
            </Stack>
            <Text fontSize="sm" mt={2}>
              Get news about drops & exclusive offers
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      
      <Divider borderColor={borderColor} />
      
      <Box py={6}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: borderColor,
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: borderColor,
            flexGrow: 1,
            ml: 8,
          }}>
          <Tag size={'lg'} bg={useColorModeValue('blue.50', 'blue.900')} color={useColorModeValue('blue.700', 'blue.200')} borderRadius="full">
            Powered by Andromeda
          </Tag>
        </Flex>
        
        <Text pt={6} fontSize={'sm'} textAlign={'center'} color={useColorModeValue('gray.600', 'gray.400')}>
          © {new Date().getFullYear()} {config.name || "Sports NFTs"}. All rights reserved.{' '}
          <ChakraLink href="https://www.andromedaprotocol.io/" isExternal color="blue.400">
            Learn more about Andromeda Protocol
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
