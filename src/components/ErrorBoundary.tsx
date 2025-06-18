"use client";
import React from 'react';
import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button, VStack } from '@chakra-ui/react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} maxW="container.md" mx="auto" mt={16}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="lg"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Something went wrong!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We encountered an unexpected error. Please try refreshing the page.
            </AlertDescription>
            <VStack mt={4} spacing={2}>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
              <Button
                variant="ghost"
                onClick={() => this.setState({ hasError: false })}
              >
                Try Again
              </Button>
            </VStack>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
