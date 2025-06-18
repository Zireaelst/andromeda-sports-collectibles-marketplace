"use client"
import { apolloClient } from "@/lib/graphql";
import reactQueryClient from "@/lib/react-query/client";
import { GlobalModalProvider } from "@/modules/modals";
import theme, { ThemeStorageManager } from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient } from "@cosmjs/stargate";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react"
import ErrorBoundary from "@/components/ErrorBoundary";

interface Props {
    children?: ReactNode;
}

const Providers: FC<Props> = (props) => {
    const { children } = props;

    return (
        <ErrorBoundary>
            <QueryClientProvider client={reactQueryClient}>
                <ApolloProvider client={apolloClient}>
                    <CacheProvider>
                        <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
                            <GlobalModalProvider>
                                {children}
                            </GlobalModalProvider>
                        </ChakraProvider>
                    </CacheProvider>
                </ApolloProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}

export default Providers