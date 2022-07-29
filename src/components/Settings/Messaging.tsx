import {
  Box,
  Button,
  Checkbox,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  MeDocument,
  MeQuery,
  useUpdateMessagingSettingsMutation,
} from "../../generated/graphql";
import Section from "./Section";

interface MessagingProps {
  meData: MeQuery;
}

const Messaging: React.FC<MessagingProps> = ({ meData }) => {
  const currentSettings = meData?.me?.messagingSettings;
  const toast = useToast();

  const [checkedItems, setCheckedItems] = React.useState<{} | undefined>({
    email:
      currentSettings?.email != null
        ? Object.values(currentSettings?.email)
        : [],
    phone:
      currentSettings?.phone != null
        ? Object.values(currentSettings?.phone)
        : [],
  });

  useEffect(() => {
    setCheckedItems({
      email:
        currentSettings?.email != null
          ? Object.values(currentSettings?.email)
          : [],
      phone:
        currentSettings?.phone != null
          ? Object.values(currentSettings?.phone)
          : [],
    });
  }, [currentSettings]);

  const [updateMessagingSettings, { loading }] =
    useUpdateMessagingSettingsMutation();

  return (
    <Section>
      <Box mt={-4}>
        <Text fontSize={24} textColor={"gray.500"}>
          <b>MESSAGING (not functional, coming soon)</b>
        </Text>
      </Box>
      <Flex p={2} justify={"space-between"}>
        <Box>
          <CheckBoxes
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            parent="email"
          />
        </Box>
        <Box>
          <CheckBoxes
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            parent="phone"
          />
        </Box>
      </Flex>
      <Button
        mt={4}
        w={"150px"}
        textColor={"gainsboro"}
        bg={"gray.600"}
        cursor={"pointer"}
        isLoading={loading}
        loadingText="Saving..."
        onClick={async () => {
          const updated = await updateMessagingSettings({
            variables: {
              messagingSettings: {
                email: {
                  podMilestonCompletion: checkedItems["email"][2],
                  milestoneApproaching: checkedItems["email"][1],
                  websiteUpdates: checkedItems["email"][0],
                },
                phone: {
                  podMilestonCompletion: checkedItems["phone"][2],
                  milestoneApproaching: checkedItems["phone"][1],
                  websiteUpdates: checkedItems["phone"][0],
                },
              },
            },
          });

          if (updated) {
            toast({
              title: "Success",
              description: "Messaging settings updated",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        }}
      >
        <Text>save</Text>
      </Button>
    </Section>
  );
};

interface CheckBoxesProps {
  parent: string;
  checkedItems: { [key: string]: boolean[] };
  setCheckedItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean[] }>
  >;
}

const CheckBoxes: React.FC<CheckBoxesProps> = ({
  parent,
  checkedItems,
  setCheckedItems,
}) => {
  const allChecked = checkedItems[parent].every(Boolean);
  const isIndeterminate = checkedItems[parent].some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) =>
          setCheckedItems({
            email:
              parent == "email"
                ? [e.target.checked, e.target.checked, e.target.checked]
                : [
                    checkedItems["email"][0],
                    checkedItems["email"][1],
                    checkedItems["email"][2],
                  ],
            phone:
              parent == "phone"
                ? [e.target.checked, e.target.checked, e.target.checked]
                : [
                    checkedItems["phone"][0],
                    checkedItems["phone"][1],
                    checkedItems["phone"][2],
                  ],
          })
        }
      >
        {parent}
      </Checkbox>
      <Stack pl={6} mt={4} spacing={4}>
        <Checkbox
          isChecked={checkedItems[parent][0]}
          onChange={(e) =>
            setCheckedItems({
              email: [
                parent == "email" ? e.target.checked : checkedItems["email"][0],
                checkedItems["email"][1],
                checkedItems["email"][2],
              ],
              phone: [
                parent == "phone" ? e.target.checked : checkedItems["phone"][0],
                checkedItems["phone"][1],
                checkedItems["phone"][2],
              ],
            })
          }
        >
          Pod members' milestone completion
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[parent][1]}
          onChange={(e) =>
            setCheckedItems({
              email: [
                checkedItems["email"][0],
                parent == "email" ? e.target.checked : checkedItems["email"][1],
                checkedItems["email"][2],
              ],
              phone: [
                checkedItems["phone"][0],
                parent == "phone" ? e.target.checked : checkedItems["phone"][1],
                checkedItems["phone"][2],
              ],
            })
          }
        >
          Milestone approaching
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[parent][2]}
          onChange={(e) =>
            setCheckedItems({
              email: [
                checkedItems["email"][0],
                checkedItems["email"][1],
                parent == "email" ? e.target.checked : checkedItems["email"][2],
              ],
              phone: [
                checkedItems["phone"][0],
                checkedItems["phone"][1],
                parent == "phone" ? e.target.checked : checkedItems["phone"][2],
              ],
            })
          }
        >
          Website updates
        </Checkbox>
      </Stack>
    </>
  );
};

export default Messaging;
