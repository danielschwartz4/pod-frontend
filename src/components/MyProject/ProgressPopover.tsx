import { ArrowBackIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { InputField } from "../Inputs/InputField";

interface ProgressPopoverProps {
  close: () => void;
  isOpen: boolean;
  completionDate: string;
}

const ProgressPopover: React.FC<ProgressPopoverProps> = ({
  close,
  isOpen,
  completionDate,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {});

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button visibility={"hidden"} colorScheme="pink">
            Popover Target
          </Button>
        </PopoverTrigger>

        {!isEditing ? (
          <PopoverContent backgroundColor={"white"}>
            <PopoverHeader fontWeight="semibold">Progress update</PopoverHeader>
            <PopoverCloseButton />
            {children}
            <Divider variant="dashed" orientation="horizontal" />
            <Flex alignItems={"center"}>
              <Button
                margin={".3em"}
                colorScheme={"tomato"}
                variant="outline"
                cursor={"pointer"}
                w={6}
                h={6}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <EditIcon />
              </Button>
              <Box ml={"auto"} mr={"1em"}>
                Completion date: {completionDate}
              </Box>
            </Flex>
          </PopoverContent>
        ) : (
          <PopoverContent backgroundColor={"white"}>
            <Flex>
              <Button
                onClick={() => {
                  setIsEditing(false);
                }}
                size="xs"
                mt={1}
                ml={1}
                cursor={"pointer"}
              >
                <ArrowBackIcon />
              </Button>
              <PopoverHeader
                width={"100%"}
                mr={8}
                justifyContent={"center"}
                fontWeight="semibold"
              >
                Edit your milestone
              </PopoverHeader>

              <PopoverCloseButton />
            </Flex>
            <PopoverBody>
              <Formik
                initialValues={{ milestone: "" }}
                onSubmit={async ({ milestone }) => {
                  console.log("milestone");
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box>
                      <InputField
                        label=""
                        name="editMilestone"
                        placeholder="Actuallyyyy I think I'm gonna..."
                        isField={true}
                      />
                    </Box>
                  </Form>
                )}
              </Formik>
            </PopoverBody>
            <PopoverFooter>
              <Button w={"100%"}>
                <CheckIcon />
              </Button>
            </PopoverFooter>
          </PopoverContent>
        )}
      </Popover>
    </>
  );
};

export default ProgressPopover;
