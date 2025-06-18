"use client";
import dynamic from 'next/dynamic';
import { Spinner, Center } from '@chakra-ui/react';

// Dynamic import to prevent SSR issues
const DiscoverPageComponent = dynamic(
  () => import('./DiscoverPage'),
  {
    ssr: false,
    loading: () => (
      <Center h="50vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    )
  }
);

export default DiscoverPageComponent;
