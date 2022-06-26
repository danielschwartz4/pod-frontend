import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import flowImage from "../../images/Samples/flow.png";
import invitesImage from "../../images/Samples/invites.png";
import joinPodImage from "../../images/Samples/pod.png";
import progressImage from "../../images/Samples/progress.png";
import smsImage from "../../images/Samples/sms.png";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export const Samples: React.FC = ({}) => {
  return (
    <Box mx={"auto"}>
      <CaptionCarousel />
    </Box>
  );
};

interface SamplesProps {
  // slider: Slider | null;
  // setSlider: React.Dispatch<React.SetStateAction<Slider | null>>;
  // top: string;
  // side: string;
  cards: { title: string; text?: string; image: string }[];
}

const CaptionCarousel: React.FC = () => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: "Enter project milestones or task dates for plan",
      // text: "Enter your milestone dates and estimated completion dates to build a flow",
      image: flowImage.src,
    },
    {
      title: "Join a 2-4 person pod with your friends or at random!",
      // text: "Pods can hold up to 4 members (I can increase the limit if people want)",
      image: invitesImage.src,
    },
    {
      title: "Watch your pod members' progress in real time",
      // text: "See them accomplish their goals",
      image: joinPodImage.src,
    },
    {
      title: "Update your project progress to motivate yourself + others",
      // text: "Alert your pod members when you reach a milestone",
      image: progressImage.src,
    },
    {
      title: "Receive sms when pod members are close to goals",
      // text: "Receive text notifications when your pod members are close to their goals for some extra motivation",
      image: smsImage.src,
    },
  ];

  return (
    <Box
      position={"relative"}
      height={["550px", "750px"]}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        cursor={"pointer"}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        cursor={"pointer"}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Flex
            alignItems={"center"}
            key={index}
            mt={8}
            width={"100%"}
            height={"100%"}
            overflow={"hidden"}
          >
            <Box spacing={6}>
              <VStack mr={4} my={"auto"} textAlign={"center"}>
                <Heading
                  color={"#4c5e81"}
                  fontFamily={"serif"}
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                >
                  {card.title}
                </Heading>
                {/* <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.text}
                </Text> */}
              </VStack>
              <Flex>
                <Image
                  mx={"auto"}
                  width={{ base: "100%", sm: "500px", md: "750px" }}
                  src={card.image}
                ></Image>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Slider>
    </Box>
  );
};
