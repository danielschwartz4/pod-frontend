import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";

interface PodNotCreatedProps {
  podSize: number;
  setPodSize: React.Dispatch<React.SetStateAction<number>>;
  joinPod?;
  updateProjectGroupSizeFunc?;
}

export const PodNotCreated: React.FC<PodNotCreatedProps> = ({
  podSize,
  setPodSize,
  children,
}) => {
  return (
    <Box>
      <Menu>
        <MenuButton bg={"#7e9cd6"} as={Button} rightIcon={<ChevronDownIcon />}>
          {podSize == null ? "Select pod size" : podSize}
        </MenuButton>
        <MenuList>
          <MenuItem
            value={2}
            onClick={(e) => {
              let size = parseInt((e.target as HTMLTextAreaElement).value);
              setPodSize(size);
            }}
          >
            2
          </MenuItem>
          <MenuItem
            value={3}
            onClick={(e) => {
              let size = parseInt((e.target as HTMLTextAreaElement).value);
              setPodSize(size);
            }}
          >
            3
          </MenuItem>
          <MenuItem
            value={4}
            onClick={(e) => {
              let size = parseInt((e.target as HTMLTextAreaElement).value);
              setPodSize(size);
            }}
          >
            4
          </MenuItem>
        </MenuList>
      </Menu>
      {children}
    </Box>
  );
};
