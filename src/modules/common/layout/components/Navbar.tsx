import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  Button, 
  Stack, 
  Collapse, 
  Icon, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  useColorModeValue, 
  useBreakpointValue, 
  useDisclosure,
  Container,
  Avatar,
  HStack,
  Image,
  useColorMode
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import React, { FC, useMemo } from "react";
import { CollectionDropdown, ConnectWallet } from "@/modules/common/cta";
import useApp from "@/lib/app/hooks/useApp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LINKS } from "@/utils/links";
// Import each icon individually to avoid bundling issues
import { FiGrid } from "react-icons/fi";
import { FiStar } from "react-icons/fi"; 
import { FiTrendingUp } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";
import { useAndromedaStore } from "@/zustand/andromeda";
import { useAppStore } from "@/zustand/app";

interface NavbarProps {}
export const Navbar: FC<NavbarProps> = (props) => {
  const {} = props;
  const { config } = useApp();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const router = useRouter();
  
  // Color mode values
  const navHoverBg = useColorModeValue('gray.100', 'gray.700');
  const popoverBg = useColorModeValue('white', 'gray.800');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  
  // Get current chain and app configuration for routing
  const { chainId } = useAndromedaStore();
  const { config: appConfig } = useAppStore();
  const appId = appConfig?.id || '';
  
  // Always use root homepage for hash navigation to prevent SSR errors on dynamic routes
  const homeRoute = '/';

  // Navigation handler for hash links - always navigate to homepage with hash
  const handleHashNavigation = (hash: string) => {
    if (typeof window !== 'undefined') {
      router.push(`/${hash}`);
    }
  };

  // Generate configured navigation items with hash links for in-page navigation
  const navItems = useMemo(() => {
    return [
      {
        label: 'Explore',
        icon: FiGrid,
        isDropdownOnly: true, // This will prevent the main button from being clickable
        children: [
          {
            label: 'All Collections',
            subLabel: 'Browse all sports collectibles',
            href: `${homeRoute}#explore`,
            icon: FiGrid,
          },
          {
            label: 'Basketball',
            subLabel: 'NBA and other basketball collectibles',
            href: `${homeRoute}#explore-basketball`,
          },
          {
            label: 'Football',
            subLabel: 'NFL and soccer collectibles',
            href: `${homeRoute}#explore-football`,
          },
          {
            label: 'Baseball',
            subLabel: 'MLB and baseball collectibles',
            href: `${homeRoute}#explore-baseball`,
          },
          {
            label: 'Hockey',
            subLabel: 'Hockey collectibles',
            href: `${homeRoute}#explore-hockey`,
          },
        ],
      },
      {
        label: 'Featured',
        icon: FiStar,
        href: `${homeRoute}#featured`,
      },
      {
        label: 'Trending',
        icon: FiTrendingUp,
        href: `${homeRoute}#trending`,
      },
      {
        label: 'Help',
        icon: FiHelpCircle,
        href: `${homeRoute}#help`,
      },
    ];
  }, [homeRoute]);

  return (
    <Box>
      <Container maxW="container.xl">
        <Flex
          py={4}
          align={'center'}
          justify={'space-between'}
        >
          <Flex align={'center'}>
            {/* Mobile menu button */}
            <Flex
              flex={{ base: 1, lg: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', lg: 'none' }}>
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                }
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
                mr={2}
              />
            </Flex>
            
            {/* Logo */}
            <Link href={LINKS.home()} passHref>
              <Flex align="center" cursor="pointer">
                <Image 
                  src="/logo.png"
                  alt="Logo"
                  boxSize="36px"
                  mr={2}
                  display={{ base: 'none', md: 'block' }}
                />
                <Text 
                  fontSize={{ base: 'xl', md: '2xl' }} 
                  fontWeight="bold"
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  bgClip="text"
                >
                  {config.name || "Sports NFTs"}
                </Text>
              </Flex>
            </Link>
          </Flex>

          {/* Desktop Navigation */}
          <HStack
            as={'nav'}
            spacing={6}
            display={{ base: 'none', lg: 'flex' }}
            ml={10}
          >
            {navItems.map((navItem) => (
              <Box key={navItem.label}>
                <Popover trigger={'hover'} placement={'bottom-start'}>
                  <PopoverTrigger>
                    {navItem.isDropdownOnly ? (
                      <Button 
                        p={2}
                        fontSize={'md'}
                        fontWeight={500}
                        variant="ghost"
                        leftIcon={navItem.icon && <Icon as={navItem.icon} />}
                        _hover={{
                          textDecoration: 'none',
                          bg: navHoverBg,
                        }}
                        cursor="default"
                      >
                        {navItem.label}
                        {navItem.children && (
                          <Icon
                            as={ChevronDownIcon}
                            transition={'all .25s ease-in-out'}
                            w={4}
                            h={4}
                            ml={1}
                          />
                        )}
                      </Button>
                    ) : (
                      <Link href={navItem.href ?? homeRoute} passHref>
                        <Button 
                          as="a" 
                          p={2}
                          fontSize={'md'}
                          fontWeight={500}
                          variant="ghost"
                          leftIcon={navItem.icon && <Icon as={navItem.icon} />}
                          _hover={{
                            textDecoration: 'none',
                            bg: navHoverBg,
                          }}
                        >
                          {navItem.label}
                          {navItem.children && (
                            <Icon
                              as={ChevronDownIcon}
                              transition={'all .25s ease-in-out'}
                              w={4}
                              h={4}
                              ml={1}
                            />
                          )}
                        </Button>
                      </Link>
                    )}
                  </PopoverTrigger>

                  {navItem.children && (
                    <PopoverContent
                      border={0}
                      boxShadow={'xl'}
                      bg={popoverBg}
                      p={4}
                      rounded={'xl'}
                      minW={'sm'}>
                      <Stack>
                        {navItem.children.map((child) => (
                          <DesktopSubNav key={child.label} {...child} />
                        ))}
                      </Stack>
                    </PopoverContent>
                  )}
                </Popover>
              </Box>
            ))}
          </HStack>

          {/* Right Side Actions */}
          <Flex alignItems={'center'} gap={2}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              mr={2}
            />
            
            <CollectionDropdown />
            <ConnectWallet />
          </Flex>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav navItems={navItems} />
        </Collapse>
      </Container>
    </Box>
  );
};

const DesktopSubNav = ({ label, href, subLabel, icon }: NavItem) => {
  const hoverBg = useColorModeValue('blue.50', 'gray.700');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const hoverTextColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Link href={href ?? '#'} passHref>
      <Box
        as="a"
        role="group"
        display="block"
        p={2}
        rounded="md"
        _hover={{ bg: hoverBg }}>
        <Stack direction="row" align="center">
          <Box>
            <Flex align="center">
              {icon && <Icon as={icon} mr={2} color={iconColor} />}
              <Text
                transition="all .3s ease"
                _groupHover={{ color: hoverTextColor }}
                fontWeight={500}>
                {label}
              </Text>
            </Flex>
            <Text fontSize="sm" color={textColor}>
              {subLabel}
            </Text>
          </Box>
          <Flex
            transition="all .3s ease"
            transform="translateX(-10px)"
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify="flex-end"
            align="center"
            flex={1}>
            <Icon color={hoverTextColor} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

interface MobileNavProps {
  navItems: Array<NavItem>;
}

const MobileNav: FC<MobileNavProps> = ({ navItems }) => {
  const mobileBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Stack
      bg={mobileBg}
      p={4}
      display={{ lg: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, icon, isDropdownOnly }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      {isDropdownOnly ? (
        <Flex
          py={2}
          justify={'space-between'}
          align={'center'}
          cursor={children ? 'pointer' : 'default'}
        >
          <Flex align="center">
            {icon && <Icon as={icon} mr={2} />}
            <Text
              fontWeight={600}
              color={textColor}>
              {label}
            </Text>
          </Flex>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      ) : (
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Flex align="center">
            {icon && <Icon as={icon} mr={2} />}
            <Text
              fontWeight={600}
              color={textColor}>
              {label}
            </Text>
          </Flex>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      )}

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={borderColor}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href ?? '#'} passHref>
                <Box as="a" py={2}>
                  <Flex align="center">
                    {child.icon && <Icon as={child.icon} mr={2} />}
                    {child.label}
                  </Flex>
                </Box>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  icon?: React.ComponentType;
  isDropdownOnly?: boolean; // New property to indicate dropdown-only items
}

export default Navbar;
