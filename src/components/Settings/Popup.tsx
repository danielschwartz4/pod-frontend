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
import {
  MeQuery,
  ProjectQuery,
  useUpdatePhoneMutation,
  MeDocument,
} from "../../generated/graphql";
import { COUNTRIES } from "../Inputs/countries";
import { PhoneNumber } from "../Inputs/PhoneNumber";
import PhoneNumber2 from "../Inputs/PhoneNumber2";

interface PopupProps {
  meData: MeQuery;
}

const Popup: React.FC<PopupProps> = ({ children, meData }) => {
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
            <Form onClose={onClose} meData={meData} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

const Form = ({ meData, onClose }) => {
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
          console.log(meData?.me?.id);
          console.log(phone);
          if (phone) {
            await updatePhone({
              variables: {
                updatePhoneId: meData?.me?.id,
                phone: phone,
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.updatePhone?.user,
                  },
                });
              },
            });
          }
          onClose();
        }}
      >
        Change
      </Button>
    </Box>
  );
};

export default Popup;
