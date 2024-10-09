import React from "react";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
const TransactionCard = ({
  _id,
  title,
  description,
  image,
  price,
  sold,
  category,
}) => {
  return (
    <Box
      p={6}
      //   className="shadow-custom"
      w={"100%"}
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        borderRadius: "1rem",
      }}
    >
      <Center>
        <Image src={image} height={"150px"} w={"150px"} />
      </Center>
      <Text
        fontWeight={"bold"}
        textAlign={"center"}
        mt={3}
        alignItems={"start"}
      >
        {title}
      </Text>
      <Text mt={3} height={"100px"} overflowY={"hidden"}>
        {description}
      </Text>
      <Text fontWeight={"bold"} textAlign={"center"}>
        Category: {category}
      </Text>

      <Text textAlign={"center"} fontWeight={"bold"} mt={3}>
        Sold Status:{sold ? "Sold" : "UnSold"}
      </Text>
      <Text textAlign={"center"} fontWeight={"bold"} mt={3}>
        Price :${price}
      </Text>
    </Box>
  );
};

export default TransactionCard;
