import React from "react"
import { Text, Box, Column } from "./styled"

const Capability = ({ title, children }) => (
  <Column
    css={{ flexShrink: 0 }}
    title={title}
    height={["16rem", "16rem", "16rem"]}
    width={["100%", "40%", "100%"]}
    justifyContent="center"
    alignItems="center"
    border={2}
    position="relative"
    mb={[5, 0, 5]}
    mr={[0, 7, 0]}
    pt={4}
  >
    <Box position="absolute" top="1rem" left="1.25rem">
      <Text fontSize={4} fontWeight="medium">
        {title}
      </Text>
    </Box>
    {children}
  </Column>
)

export default Capability
