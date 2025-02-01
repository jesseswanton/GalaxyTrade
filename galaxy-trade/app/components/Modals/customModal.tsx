import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
    >
      <Box
        background="white"
        padding="4"
        borderRadius="md"
        boxShadow="lg"
        width={{ base: "90%", md: "400px" }}
      >
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Text fontSize="xl" fontWeight="bold">{title}</Text>
          <Button size="sm" onClick={onClose}>X</Button>
        </Flex>
        {children}
        <Flex justifyContent="flex-end" mt="4">
          <Button onClick={onClose} variant="outline" mr="2">Cancel</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CustomModal;
