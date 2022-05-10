import { ArrowBackIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
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
import { FlowNode } from "../../types";
import { InputField } from "../Inputs/InputField";

interface ProgressPopoverProps {
  close: () => void;
  isOpen: boolean;
  currNode: FlowNode;
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProgress?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      progress: number;
    }>
  >;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressPopover: React.FC<ProgressPopoverProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {});

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={props.isOpen}
        onClose={props.close}
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
            <PopoverBody>
              <Box>
                {typeof props.currNode.id === "string"
                  ? props.milestones[props.currNode.id.split("-")[1]]
                  : null}
              </Box>
            </PopoverBody>

            <PopoverFooter d="flex" justifyContent="center">
              <ButtonGroup size="sm">
                <Button
                  onClick={() => {
                    props.setIsOpen(!props.isOpen);
                    props.setNewProgress({
                      id: props.currNode.id,
                      progress: 1,
                    });
                  }}
                  background="#F26D51"
                >
                  not started!
                </Button>
                <Button
                  onClick={() => {
                    props.setIsOpen(!props.isOpen);
                    props.setNewProgress({
                      id: props.currNode.id,
                      progress: 2,
                    });
                  }}
                  background="#6097F8"
                >
                  in progress
                </Button>
                <Button
                  onClick={() => {
                    props.setIsOpen(!props.isOpen);
                    props.setNewProgress({
                      id: props.currNode.id,
                      progress: 3,
                    });
                    props.setShowAlert(true);
                  }}
                  background="#3EE76D"
                >
                  all done!
                </Button>
              </ButtonGroup>
            </PopoverFooter>
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
                Completion date:
                {typeof props.currNode.id === "string"
                  ? props.milestoneDates[props.currNode.id.split("-")[1]].split(
                      " 00"
                    )[0]
                  : null}
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
            <Formik
              initialValues={{ milestone: "" }}
              onSubmit={async ({ milestone }) => {}}
            >
              {({ isSubmitting }) => (
                <Form>
                  <PopoverBody>
                    <Box>
                      <InputField
                        label=""
                        name="milestone"
                        placeholder="Actuallyyyy I think I'm gonna..."
                        isField={true}
                      />
                    </Box>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      type="submit"
                      w={"100%"}
                      isLoading={isSubmitting ? true : false}
                    >
                      <CheckIcon />
                    </Button>
                  </PopoverFooter>
                </Form>
              )}
            </Formik>
          </PopoverContent>
        )}
      </Popover>
    </>
  );
};

export default ProgressPopover;
