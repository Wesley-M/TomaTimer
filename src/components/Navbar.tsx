import { Box, Flex, HStack, Text } from "@chakra-ui/react";

export default function Simple() {
  return (
    <>
      <Box bg="#EB3F3F" color="#EDEDED" px="2em">
        <Flex h="10vh" alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Text fontSize="1.5em" fontFamily="Anton, sans-serif">
              TomaTimer
            </Text>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
