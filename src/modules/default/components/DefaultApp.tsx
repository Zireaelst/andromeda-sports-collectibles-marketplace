"use client";
import { APP_ENV } from "@/appEnv";
import { Layout } from "@/modules/common/layout";
import DiscoverPageClient from "@/modules/discover/components/DiscoverPageClient";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { updateConfig } from "@/zustand/app";
import { Box, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { FC, useEffect } from "react"
import ClientOnly from "@/components/ClientOnly";
import { safeLocalStorage } from "@/utils/safeStorage";

interface Props {
}

const DefaultApp: FC<Props> = (props) => {
    const { } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const chainId = useAndromedaStore(state => state.chainId)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)
    const toast = useToast();

    useEffect(() => {
        initiateKeplr();
    }, []);

    useEffect(() => {
        // Safe localStorage access
        const autoconnect = safeLocalStorage.getItem(KEPLR_AUTOCONNECT_KEY);
        
        if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            if (!isConnected || (isConnected && chainId !== APP_ENV.DEFAULT_CONFIG.chainId)) {
                connectAndromedaClient(APP_ENV.DEFAULT_CONFIG.chainId)
                    .catch(err => {
                        toast({
                            title: "Connection Error",
                            description: "Failed to connect to wallet. Please try again.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: "top-right"
                        });
                    });
            }
        }
    }, [keplr, isConnected, isLoading, chainId, toast]);

    useEffect(() => {
        updateConfig(APP_ENV.DEFAULT_CONFIG);
    }, [])

    return (
        <ClientOnly
            fallback={
                <Layout>
                    <Center py={20}>
                        <Box textAlign="center">
                            <Spinner size="xl" color="blue.500" mb={4} />
                            <Text fontSize="lg" fontWeight="medium">Loading application...</Text>
                        </Box>
                    </Center>
                </Layout>
            }
        >
            <Layout>
                {isLoading ? (
                    <Center py={20}>
                        <Box textAlign="center">
                            <Spinner size="xl" color="blue.500" mb={4} />
                            <Text fontSize="lg" fontWeight="medium">Loading your sports collectibles...</Text>
                        </Box>
                    </Center>
                ) : (
                    <DiscoverPageClient />
                )}
            </Layout>
        </ClientOnly>
    )
}

export default DefaultApp