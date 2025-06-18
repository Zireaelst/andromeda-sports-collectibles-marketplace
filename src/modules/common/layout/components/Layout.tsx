"use client";
import { Box, Container, Divider, useColorModeValue } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { Navbar } from "./Navbar"; // This is correct if Navbar.tsx has a named export
import PoweredByLogo from "./PoweredByLogo";
import Footer from "./Footer";
import ClientOnly from "@/components/ClientOnly";

interface LayoutProps {
  children?: ReactNode;
}
const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Box
        position="sticky"
        top="0"
        zIndex="sticky"
        bg={useColorModeValue("white", "gray.800")}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <ClientOnly>
          <Navbar />
        </ClientOnly>
      </Box>
      <Container maxW="container.xl" py={8}>
        <ClientOnly>
          {children}
        </ClientOnly>
      </Container>
      <Divider borderColor={borderColor} />
      <Box py={4} textAlign="center">
        <PoweredByLogo />
      </Box>
      <Box>
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </Box>
    </Box>
  );
};

export default Layout;
