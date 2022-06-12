import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { RecurringTaskQuery, SingleTasksQuery } from "../../generated/graphql";
import { dayIdxMapper } from "../../utils/dayIdxMapper";

interface RecurringTaskProgressProps {
  taskData: RecurringTaskQuery;
  singleTasksData: SingleTasksQuery;
}

export const RecurringTaskProgress: React.FC<RecurringTaskProgressProps> = ({
  taskData,
  singleTasksData,
}) => {
  if (!singleTasksData?.singleTasks?.singleTasks) {
    return <Box>Loading...</Box>;
  }

  console.log(singleTasksData?.singleTasks?.singleTasks);
  return (
    <Box>
      <Flex className="days">
        {Object.keys(singleTasksData?.singleTasks?.singleTasks).map(
          (key, index) => (
            <Box mx={[1, 2]} key={index} day={key}>
              <Circle
                day={singleTasksData?.singleTasks?.singleTasks[parseInt(key)]}
                // days={days}
                // setDays={setDays}
              />
            </Box>
          )
        )}
      </Flex>
    </Box>
  );
};

const Circle: React.FC<{ day: {} }> = (day) => {
  const dayIdx = day?.day["actionDay"];
  const dayMapping = dayIdxMapper(day?.day["actionDay"]);
  return (
    <Box width={["36px", "48px"]} height={["36px", "48px"]}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill={"#7e9cd6"} strokeWidth={"3"} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontFamily="auto"
          fontSize={12}
          strokeWidth="1px"
          fill="gainsboro"
          dy=".3em"
        >
          {dayMapping["abr"]}
        </text>
      </svg>
    </Box>
  );
};
