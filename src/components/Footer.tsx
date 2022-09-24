import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="#EB3F3F"
      color="#EDEDED"
      py={4}
      textAlign="left"
      px="2em"
      mt="auto"
    >
      <Text>
        Created with{" "}
        <Text fontWeight="bold" display="inline">
          joy
        </Text>{" "}
        by Wesley-M
      </Text>
    </Box>
  );
}
