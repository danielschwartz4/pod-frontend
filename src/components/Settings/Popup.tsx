import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FocusLock from "react-focus-lock";
import { ProjectQuery, useUpdatePhoneMutation } from "../../generated/graphql";
import { COUNTRIES } from "../Inputs/countries";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import PhoneNumber2 from "../Inputs/PhoneNumber2";

interface PopupProps {
  projectData: ProjectQuery;
}

const Popup: React.FC<PopupProps> = ({ children, projectData }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form projectData={projectData} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

const Form = ({ projectData }) => {
  const [phone, setPhone] = useState(null);
  const [updatePhone] = useUpdatePhoneMutation();
  const countryOptions = COUNTRIES.map(({ name, iso }) => ({
    label: name,
    value: iso,
  }));

  return (
    <Box>
      <PhoneNumber
        country="US"
        options={countryOptions}
        placeholder="Enter phone number"
        setPhone={setPhone}
      />

      <Button
        w={"100px"}
        mt={"8"}
        ml={2}
        bgColor="gainsboro"
        cursor={"pointer"}
        onClick={async () => {
          if (phone) {
            await updatePhone({
              variables: {
                updatePhoneId: projectData?.project?.project?.userId,
                phone: phone,
              },
            });
          }
        }}
      >
        Change
      </Button>
    </Box>
  );
};

export default Popup;
