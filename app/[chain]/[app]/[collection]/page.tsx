"use client";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import CollectionRouter from "@/modules/collection/components/Router";
import { notFound } from 'next/navigation'
import React, { FC } from "react"
import dynamic from 'next/dynamic';
import ErrorBoundary from "@/components/ErrorBoundary";

// Dynamically import with SSR disabled to prevent hydration issues
const DynamicCollectionRouter = dynamic(() => import("@/modules/collection/components/Router"), {
    ssr: false,
    loading: () => (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            Loading collection...
        </div>
    )
});

interface Props {
    params: {
        collection: string;
    }
}

const Page: FC<Props> = (props) => {
    const { params: { collection: collectionId } } = props;
    
    // Add error boundary for collection fetching
    try {
        const collection = useGetCollection(collectionId);
        if (!collection) {
            return notFound()
        }

        return (
            <ErrorBoundary>
                <DynamicCollectionRouter collectionId={collectionId} />
            </ErrorBoundary>
        )
    } catch (error) {
        console.error('Error loading collection:', error);
        return notFound();
    }
}

export default Page