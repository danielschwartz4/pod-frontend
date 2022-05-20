import {
  ArrowBackIcon,
  CalendarIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
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
import React, { useState } from "react";
import {
  useUpdateProjectMilestoneDatesMutation,
  useUpdateProjectMilestonesMutation,
  useUpdateProjectProgressMutation,
} from "../../generated/graphql";
import { FlowNode } from "../../types";
import formatDate from "../../utils/formatDate";
import { removeItemByIndex } from "../../utils/removeItem";
import DatePickerInput from "../Inputs/DatePickerInput";
import { InputField } from "../Inputs/InputField";

interface ProgressPopoverProps {
  close: () => void;
  isOpen: boolean;
  currNode: FlowNode;
  projectId: number;
  milestones: string[];
  milestoneDates: string[];
  milestoneProgress: number[];
  setNewMilestone?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      text: string;
    }>
  >;
  setNewMilestoneDate?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      date: string;
    }>
  >;
  setNewProgress?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      progress: number;
    }>
  >;
  setMilestones: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneDates: React.Dispatch<React.SetStateAction<string[]>>;
  setMilestoneProgress: React.Dispatch<React.SetStateAction<number[]>>;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProgressPopover: React.FC<ProgressPopoverProps> = (props) => {
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const [updateProjectMilestoneDates] =
    useUpdateProjectMilestoneDatesMutation();
  const [updateProjectMilestones] = useUpdateProjectMilestonesMutation();
  const [updateProjectProgress] = useUpdateProjectProgressMutation();

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={props.isOpen}
        onClose={props.close}
        placement="bottom"
        closeOnBlur={false}
      >
        {/* !! Put popover triger on each milestone */}
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
                  cursor={"pointer"}
                >
                  not started!
                </Button>
                <Button
                  onClick={async () => {
                    props.setIsOpen(!props.isOpen);
                    props.setNewProgress({
                      id: props.currNode.id,
                      progress: 2,
                    });
                  }}
                  background="#6097F8"
                  cursor={"pointer"}
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
                  cursor={"pointer"}
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
                onClick={async () => {
                  let _milestones = Object.assign(
                    [],
                    props.milestones
                  ) as string[];
                  let _milestoneDates = Object.assign([], props.milestoneDates);
                  let _milestoneProgress = Object.assign(
                    [],
                    props.milestoneProgress
                  );
                  const nodeId = parseInt(props.currNode.id.split("-")[1]);
                  _milestones = removeItemByIndex(_milestones, nodeId);
                  _milestoneDates = removeItemByIndex(_milestoneDates, nodeId);
                  _milestoneProgress = removeItemByIndex(
                    _milestoneProgress,
                    nodeId
                  );
                  const response = await updateProjectMilestones({
                    variables: {
                      updateProjectMilestonesId: props.projectId,
                      milestones: _milestones,
                    },
                  });
                  if (response.data?.updateProjectMilestones) {
                    const response2 = await updateProjectMilestoneDates({
                      variables: {
                        updateProjectMilestoneDatesId: props.projectId,
                        milestoneDates: _milestoneDates,
                      },
                    });
                    if (response2.data?.updateProjectMilestoneDates) {
                    }
                  }
                  const response3 = await updateProjectProgress({
                    variables: {
                      updateProjectProgressId: props.projectId,
                      milestoneProgress: _milestoneProgress,
                    },
                  });
                  if (response3.data?.updateProjectProgress) {
                    props.setMilestones(_milestones);
                    props.setMilestoneDates(_milestoneDates);
                    props.setMilestoneProgress(_milestoneProgress);
                    console.log("success");
                  }
                }}
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
                        props.milestoneDates[props.currNode.id.split("-")[1]]
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
                      <Box mr={8}>
                        <InputField
                          textColor={"black"}
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
                      isloading={isSubmitting ? "true" : "false"}
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
