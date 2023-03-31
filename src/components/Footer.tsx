import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="secondary.main"
      color="#EDEDED"
      py={4}
      textAlign="left"
      px="2em"
      mt="auto"
    >
      <Text>
        Created with{" "}
        <Text as="span" fontWeight="bold" display="inline">
          ChakraUI & React
        </Text>{" "}
        by Wesley-M
      </Text>
    </Box>
  );
}
