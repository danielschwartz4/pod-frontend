import {
  ArrowBackIcon,
  CheckIcon,
  EditIcon,
  CalendarIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
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
import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FlowNode } from "../../types";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";
import formatDate from "../../utils/formatDate";

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
  setNewMilestone?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      text: string;
    }>
  >;
  updatedMilestones?: string[];
  setNewMilestoneDate?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      date: string;
    }>
  >;
  updatedMilestoneDates?: string[];
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressPopover: React.FC<ProgressPopoverProps> = (props) => {
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

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

        {!isEditingText && !isEditingDate ? (
          <PopoverContent backgroundColor={"white"}>
            <PopoverHeader fontWeight="semibold">Progress update</PopoverHeader>
            <PopoverCloseButton cursor={"pointer"} />
            <PopoverBody>
              <Box>
                {typeof props.currNode.id === "string"
                  ? props.updatedMilestones[props.currNode.id.split("-")[1]]
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
                ml={".3em"}
                colorScheme={"tomato"}
                variant="outline"
                cursor={"pointer"}
                w={6}
                h={6}
              >
                <DeleteIcon />
              </Button>
              <Button
                margin={".3em"}
                colorScheme={"tomato"}
                variant="outline"
                cursor={"pointer"}
                w={6}
                h={6}
                onClick={() => {
                  setIsEditingText(true);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                w={6}
                h={6}
                variant="outline"
                colorScheme={"tomato"}
                cursor={"pointer"}
                onClick={() => {
                  setIsEditingDate(true);
                }}
              >
                <CalendarIcon />
              </Button>
              <Box ml={"auto"} mr={"1em"}>
                Target date:{" "}
                {typeof props.currNode.id === "string"
                  ? formatDate(
                      String(
                        props.updatedMilestoneDates[
                          props.currNode.id.split("-")[1]
                        ]
                      )
                    )
                  : null}
              </Box>
            </Flex>
          </PopoverContent>
        ) : (
          <PopoverContent backgroundColor={"white"} width={"350px"}>
            <Flex>
              <Button
                onClick={() => {
                  setIsEditingText(false);
                  setIsEditingDate(false);
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

              <PopoverCloseButton cursor={"pointer"} />
            </Flex>
            <Formik
              initialValues={
                isEditingText ? { milestone: "" } : { milestoneDate: "" }
              }
              onSubmit={async ({ milestone, milestoneDate }) => {
                if (isEditingText) {
                  props.setNewMilestone({
                    id: props.currNode.id,
                    text: milestone,
                  });
                  setIsEditingText(false);
                }
                if (isEditingDate) {
                  props.setNewMilestoneDate({
                    id: props.currNode.id,
                    date: String(milestoneDate),
                  });
                  setIsEditingDate(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <PopoverBody>
                    {isEditingText ? (
                      <Box>
                        <InputField
                          label=""
                          name="milestone"
                          placeholder="Actuallyyyy I think I'm gonna..."
                          isField={true}
                        />
                      </Box>
                    ) : (
                      <Box mr={8}>
                        <DatePickerInput
                          name={"milestoneDate"}
                          label=""
                          placeholder="Choose a new Date"
                          showTimeSelect
                        />
                        <ErrorMessage
                          name={"milestoneDate"}
                          component="div"
                          className="field-error"
                        />
                      </Box>
                    )}
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      type="submit"
                      w={"100%"}
                      isLoading={isSubmitting ? true : false}
                      cursor={"pointer"}
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
