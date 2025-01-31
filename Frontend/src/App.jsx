import { Box, Button, Text } from "@chakra-ui/react";

function App() {
  return (
    <Box textAlign="center" p="10">
      <Text fontSize="2xl" fontWeight="bold" color="teal.500">Welcome to Chakra UI</Text>
      <Button colorScheme="teal" size="lg" mt="4">Click Me</Button>
    </Box>
  );
}

export default App;
