/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toaster.create({
        description: message,
        type: "error",
        duration: 3000,
        action: {
          label: "X",
        },
      });
    } else {
      toaster.create({
        description: "Product updated successfully",
        type: "success",
        duration: 3000,
        action: {
          label: "X",
        },
      });
    }
  };
  const handleUpdate = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (!success) {
      toaster.create({
        type: "error",
        description: message,
        duration: 3000,
        action: {
          label: "X",
        },
      });
    } else {
      toaster.create({
        description: "Product updated successfully",
        type: "success",
        duration: 3000,
        action: {
          label: "X",
        },
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton colorPalette={"blue"}>
                <CiEdit />
              </IconButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifica Prodotto</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack spacing={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                    }
                  ></Input>
                  <Input
                    placeholder="Price"
                    name="price"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                    }
                  ></Input>
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                    }
                  ></Input>
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Close</Button>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Button colorPalette="blue" onClick={() => handleUpdate(product._id)}>Update</Button>
                  </DialogActionTrigger>  
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
          <IconButton
            colorPalette={"red"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteOutline />
          </IconButton>
        </HStack>
      </Box>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
