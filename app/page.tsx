"use client";
import { DefaultApp } from "@/modules/default";
import React, { FC } from "react";
import NoSSR from "@/components/NoSSR";
import { Center, Spinner, Text, Box } from "@chakra-ui/react";

interface Props {
}

const Page: FC<Props> = (props) => {
    const { } = props;
    return (
        <NoSSR 
            fallback={
                <Center h="100vh">
                    <Box textAlign="center">
                        <Spinner size="xl" color="blue.500" mb={4} />
                        <Text fontSize="lg" fontWeight="medium">Loading Sports NFT Marketplace...</Text>
                    </Box>
                </Center>
            }
        >
            <DefaultApp />
        </NoSSR>
    )
}

export default Page