"use client";
import { useEffect, useState } from 'react';
import { Center, Spinner, Box } from '@chakra-ui/react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <Center h="50vh">
        {fallback || <Spinner size="xl" color="blue.500" />}
      </Center>
    );
  }

  return <>{children}</>;
}
