"use client"
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { safeLocalStorage } from "@/utils/safeStorage";
import React, { FC, ReactNode, useEffect, useLayoutEffect } from "react"

interface Props {
    children?: ReactNode;
    chainId: string;
}

const Providers: FC<Props> = (props) => {
    const { children, chainId } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)
    const connectedChainId = useAndromedaStore(state => state.chainId)

    useLayoutEffect(() => {
        initiateKeplr();
    }, []);

    useLayoutEffect(() => {
        // Safe localStorage access
        const autoconnect = safeLocalStorage.getItem(KEPLR_AUTOCONNECT_KEY);
        if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            if (!isConnected || (isConnected && connectedChainId !== chainId)) {
                connectAndromedaClient(chainId);
            }
        }
    }, [keplr, isConnected, isLoading, chainId, connectedChainId]);

    return (
        <>
            {children}
        </>
    )
}

export default Providers