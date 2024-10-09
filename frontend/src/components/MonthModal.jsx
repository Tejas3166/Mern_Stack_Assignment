import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  Box,
  Center,
} from "@chakra-ui/react";
import { STATE, Totalsold, Totalunsold } from "../Redux/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SelectTag from "./SelectTag";
const MonthModal = () => {
  const dispatch = useDispatch();
  const stats = useSelector((items) => {
    return items.TransactionData;
  }, shallowEqual);
  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleChange(e) {
    onOpen();
    dispatch(STATE(e.target.value));
    dispatch(Totalsold(e.target.value));
    dispatch(Totalunsold(e.target.value));
  }
  
  return (
    <>
      <SelectTag name="Statistic" fun={handleChange} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <HStack spacing="1.5rem">
                <Box h="2.5rem" fontWeight="700">
                  Total sale :{" "}
                </Box>
                <Box h="2.5rem">
                  {stats.stats.length > 0 && stats.stats[0].total}
                </Box>
              </HStack>
            </Center>
            <Center>
              <HStack spacing="1.5rem">
                <Box h="2.5rem" fontWeight="700">
                  Total sold items :
                </Box>
                <Box h="2.5rem">{stats.stats.length > 0 && stats.solditems}</Box>
              </HStack>
            </Center>
            <Center>
              <HStack spacing="1.5rem">
                <Box h="2.5rem" fontWeight="700">
                  Total unsold items :
                </Box>
                <Box h="2.5rem">
                  {stats.stats.length > 0 && stats.unsolditems}
                </Box>
              </HStack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MonthModal;
