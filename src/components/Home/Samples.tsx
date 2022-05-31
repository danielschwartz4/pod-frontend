import {
  Box,
  Image,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Flex,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import createProject from "../../images/Samples/createProject.gif";
import joinPod from "../../images/Samples/joinPod.gif";
import editProject from "../../images/Samples/editProject.gif";
import flowImage from "../../images/Samples/flow.png";
import createProjectImage from "../../images/Samples/createProject.png";
import joinPodImage from "../../images/Samples/pod.png";
import progressWithAlertImage from "../../images/Samples/progressWithAlert.png";
import friendInvitesImage from "../../images/Samples/friendInvites.png";
import progressWithTextImage from "../../images/Samples/progressWithText.png";

// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

export const Samples: React.FC<SamplesProps> = ({}) => {
  return (
    <Box mx={"auto"}>
      <CaptionCarousel />
    </Box>
  );
};

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

export default function CaptionCarousel() {
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
      title: "Enter your project milestones for an auto-generated flow",
      text: "Enter your milestone dates and estimated completion dates to build a flow",
      image: flowImage.src,
    },
    {
      title: "Join a pod with your friends or at random!",
      text: "Invite friends to join your pod and hold eachother accountable. Pods can hold up to 4 members (I can increase the limit if people want)",
      image: friendInvitesImage.src,
    },
    {
      title: "Watch your pod members' progress in real time",
      text: "Watch as your group members accomplish their goals",
      image: joinPodImage.src,
    },
    {
      title: "Update your project progress and motivate your pod members",
      text: "Alert your pod members when you reach a milestone",
      image: progressWithAlertImage.src,
    },
    {
      title: "Get motivated to achieve your goals",
      text: "Recieve text notifications when your pod members are close to their goals for some extra motivatio ",
      image: progressWithTextImage.src,
    },
  ];

  return (
    <>
      <Box display={{ base: "none", lg: "block" }}>
        <DesktopDisplay
          slider={slider}
          setSlider={setSlider}
          top={top}
          side={side}
          cards={cards}
        />
      </Box>
      <Box display={{ base: "block", lg: "none" }}>
        <MobileDisplay
          slider={slider}
          setSlider={setSlider}
          top={top}
          side={side}
          cards={cards}
        />
      </Box>
    </>
  );
}

interface SamplesProps {
  slider: Slider | null;
  setSlider: React.Dispatch<React.SetStateAction<Slider | null>>;
  top: string;
  side: string;
  cards: { title: string; text: string; image: string }[];
}

const DesktopDisplay: React.FC<SamplesProps> = (props) => {
  return (
    <Box
      m={4}
      borderColor={"#F6793D"}
      position={"relative"}
      height={"600px"}
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
        left={props.side}
        top={props.top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => props.slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={props.side}
        top={props.top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => props.slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider) => props.setSlider(slider)}>
        {props.cards.map((card, index) => (
          <Flex
            alignItems={"center"}
            key={index}
            mt={8}
            width={"100%"}
            height={"100%"}
            overflow={"hidden"}
          >
            <Flex spacing={6}>
              <VStack ml={120} mr={4} my={"auto"} textAlign={"center"}>
                <Heading
                  color={"gray.500"}
                  fontFamily={"serif"}
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                >
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.text}
                </Text>
              </VStack>
              <Box mr={24}>
                <Image width={"750px"} src={card.image}></Image>
              </Box>
            </Flex>
          </Flex>
        ))}
      </Slider>
    </Box>
  );
};

const MobileDisplay: React.FC<SamplesProps> = (props) => {
  return (
    <Box
      // ml={4}
      borderColor={"#F6793D"}
      position={"relative"}
      height={"640px"}
      // overflow={"hidden"}
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
      <Box mt={8}>
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={props.side}
          top={props.top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => props.slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={props.side}
          top={props.top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => props.slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
      </Box>
      <Slider {...settings} ref={(slider) => props.setSlider(slider)}>
        {props.cards.map((card, index) => (
          <Box
            key={index}
            mt={8}
            width={"100%"}
            height={"100%"}
            // overflow={"hidden"}
          >
            <Flex flexDirection={"column"}>
              <Box mr={4} my={"auto"} textAlign={"center"}>
                <Heading
                  color={"gray.500"}
                  fontFamily={"serif"}
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                >
                  {card.title}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                  {card.text}
                </Text>
              </Box>
              <Box>
                <Image
                  m={"auto"}
                  width={{ base: "350px", sm: "500px", md: "700px" }}
                  src={card.image}
                ></Image>
              </Box>
            </Flex>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
