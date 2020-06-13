import React, { Component } from "react";
//import Section from "./Section.js";
import { Button, Row } from "react-onsenui";
// import Logo from "./Logo";
import Text from "./Text";
import Heading from "./Heading";
// import Row from "./Row";
import Box from "./Box";
// import Scrollable from "./Scrollable";
// import Footer from "./Footer";
import Image from "./Image";
import { Link } from "./Button.js";
//import { fontFamily } from "./settings";

import squareLogo from "./logo192.png";
import boosters from "./boosters.png";
import offline_mode from "./offline_mode.png";
import two_types from "./multiplayer1.png";
import create_room from "./multiplayer2.png";
import share_link from "./multiplayer3.png";
import join_game from "./multiplayer5.png";
import lets_play from "./multiplayer6.png";
import end_of_round from "./multiplayer7.png";
import video_call from "./multiplayer8.png";
import enjoy from "./multiplayer9.png";

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div className="flexbox-container-center">
          <img
            src={squareLogo}
            className="sections-squareImg"
            alt="App squareLogo"
          />
        </div>
        <br></br>
        <Row className=" flexbox-container-center flexbox-item-center-noGrow">
          <Button onClick={this.props.openTour}>START TOUR</Button>
        </Row>
        <br></br>
        <Row className="flexbox-container-center">
          <Box center width="100%" data-tut="reactour__socialLinks">
            <Heading h="3">Let us know what you think</Heading>
            <Heading
              h="4"
              color="black"
              style={{ width: "50%", margin: "0 auto 2em" }}
            >
              Follow us :)
            </Heading>
            <Heading h="4">
              <Link color="dark" h="4" href="https://twitter.com/SecondsOnline">
                Twitter
              </Link>
            </Heading>
            <Heading h="4">
              <Link
                color="dark"
                h="4"
                href="https://www.facebook.com/30secondsonline"
              >
                Facebook
              </Link>
            </Heading>
          </Box>
        </Row>
        <Row className="flexbox-container-center">
          <Heading h="1" data-tut="reactour__nav">
            NAVIGATION!
          </Heading>
        </Row>

        <Row>
          <Box>
            <Heading h="2">BOOSTERS</Heading>
            <Text>
              The Booster die is a three-sided die with 0,1,2 on the faces.{" "}
              <br />
              The Booster cards come in MIXED and CATEGORY-SPECIFIC packs. We
              have more than 3000 new words to choose from!
            </Text>
          </Box>
          <Box data-tut="reactour__boosters">
            <Image src={boosters} />
            <Text size=".7em">
              Use Boosters if you have the board game and have either lost your
              die or need new cards to play with.
            </Text>
          </Box>
        </Row>

        <Row>
          <Box align="right">
            <Heading h="2">OFFLINE MODE</Heading>
            <Text>
              This feature can be played even when your device is NOT connected
              to the internet.
            </Text>
          </Box>
          <Box data-tut="reactour__offline">
            <Image src={offline_mode} />
            <Text size=".7em">Use one device and play data-free!</Text>
          </Box>
        </Row>

        <Row>
          <Box>
            <Heading h="2">MULTIPLE PHONES</Heading>
            <Heading h="3">TWO VERSIONS OF THIS FEATURE</Heading>
            <Text>
              If everyone is in the same building, MULTIPLE PHONES will work
              just phone. <br />
              Otherwise, if your people are in different places, enable video
              calling with MULTIPHONE + VIDEO
            </Text>
          </Box>
          <Box data-tut="reactour__two_types">
            <Image src={two_types} />
            <Text size=".7em">
              You can play with multiple devices from MULTIPLE PHONES or
              MULTIPHONE + VIDEO
            </Text>
          </Box>
        </Row>

        <Row>
          <Box align="right">
            <Heading h="3">CREATE ROOM</Heading>
            <Text>
              In this room, you and your people will share the same die, use the
              same cards, the same timer...you get the point.
            </Text>
          </Box>
          <Box data-tut="reactour__create_room">
            <Image src={create_room} />
            <Text size=".7em">Create a ROOM, get people to join!</Text>
          </Box>
        </Row>

        <Row>
          <Box>
            <Heading h="3">SHARE LINK</Heading>
            <Text>Shareable link gives others access to the room.</Text>
          </Box>
          <Box data-tut="reactour__share_link">
            <Image src={share_link} />
            <Text size=".7em">We are almost ready to play!</Text>
          </Box>
        </Row>

        <Row>
          <Box align="right">
            <Heading h="3">JOIN GAME</Heading>
            <Text>
              The link directs receivers to a JOIN page. Punch in your name,
              then you're in!
            </Text>
          </Box>
          <Box data-tut="reactour__join_game">
            <Image src={join_game} />
            <Text size=".7em">Join the Party!</Text>
          </Box>
        </Row>

        <Row>
          <Box>
            <Heading h="3">LET'S PLAY!</Heading>
            <Text>
              Everyone is in the room now. The game has been designed to keep
              everyone in the loop on everything that other players are doing.
            </Text>
          </Box>
          <Box data-tut="reactour__lets_play">
            <Image src={lets_play} />
            <Text size=".7em">See what everyone is doing!</Text>
          </Box>
        </Row>

        <Row>
          <Box align="right">
            <Heading h="3">END OF ROUND</Heading>
            <Text>
              Time is up! Everyone will know about it. A certain alarm bell will
              go off as well. Sorry, cheaters :P!
            </Text>
          </Box>
          <Box data-tut="reactour__end_of_round">
            <Image src={end_of_round} />
            <Text size=".7em">Audit what was on the card!</Text>
          </Box>
        </Row>

        <Row>
          <Box>
            <Heading h="3">VIDEO CALL</Heading>
            <Text>
              In MULTIPHONE + VIDEO, you will see a toggle at the top of your
              screen. You can switch it on to have a video call. This works best
              on PC.
            </Text>
          </Box>
          <Box data-tut="reactour__video_call">
            <Image src={video_call} />
            <Text size=".7em">See your friends while you play!</Text>
          </Box>
        </Row>

        <Box data-tut="reactour__enjoy">
          <Row className="flexbox-container-center">
            <Image src={enjoy} />
          </Row>
        </Box>
      </div>
    );
  }
}

// {
//   /* <Section center>
// <Logo />
// <Heading h="3" data-tut="reactour__copy">
//   Tourist Guide into your React Components
// </Heading>
// <Button h="4" onClick={this.props.openTour}>
//   Try it
// </Button>
// <Link
//   color="dark"
//   h="4"
//   href="https://github.com/elrumordelaluz/reactour"
// >
//   Github
// </Link>
// </Section>
// <Section>
// <Row>
//   <Box center width="100%">
//     <Heading h="1">Expedition into the awesome wildlife</Heading>
//     <Heading
//       data-tut="reactour__style"
//       h="4"
//       color="black"
//       style={{ width: "50%", margin: "0 auto 2em" }}
//     >
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//       Asperiores voluptatibus aperiam minus reprehenderit fugiat?
//       Officia modi quo.
//     </Heading>
//   </Box>
// </Row>

// <Row>
//   <Box data-tut="reactour__goTo">
//     <Link href="https://dribbble.com/shots/2524506-Tweet" nospaces>
//       <Image src="https://cdn.dribbble.com/users/235991/screenshots/2524506/cockatoodr.png" />
//     </Link>
//     <Text size=".7em">
//       Image by{" "}
//       <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
//         Kate Hoolahan
//       </Link>
//     </Text>
//   </Box>
//   <Box>
//     <Heading h="2" data-tut="reactour__position">
//       Tweet
//     </Heading>
//     <Text>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//       Praesentium esse adipisci dolores itaque aliquid vero, officiis
//       ipsam officia, corporis non magnam voluptates reprehenderit
//       impedit quibusdam quo amet, ex rerum. Necessitatibus eum
//       adipisci hic deserunt, ipsam eveniet, vel commodi odit id
//       explicabo autem quibusdam pariatur! Voluptatem blanditiis
//       praesentium architecto, temporibus quaerat?
//     </Text>
//   </Box>
// </Row>

// <Row>
//   <Box align="right">
//     <Heading h="2">{"I'm bringin silver back"}</Heading>
//     <Text>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
//       odio asperiores ex autem impedit consequatur, iste distinctio
//       illum, delectus eius minima? Laudantium labore numquam, nihil.
//     </Text>
//   </Box>
//   <Box>
//     <Link
//       href="https://dribbble.com/shots/2696833-I-m-bringin-silver-back"
//       nospaces
//     >
//       <Image src="https://cdn.dribbble.com/users/235991/screenshots/2696833/giril-01.png" />
//     </Link>
//     <Text size=".7em">
//       Image by{" "}
//       <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
//         Kate Hoolahan
//       </Link>
//     </Text>
//   </Box>
// </Row>

// <Row>
//   <Box>
//     <Link
//       href="https://dribbble.com/shots/3380738-Little-dog"
//       nospaces
//     >
//       <Image src="https://cdn.dribbble.com/users/235991/screenshots/3380738/dog.png" />
//     </Link>
//     <Text size=".7em">
//       Image by{" "}
//       <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
//         Kate Hoolahan
//       </Link>
//     </Text>
//   </Box>
//   <Box>
//     <Heading h="2">Little Dog</Heading>
//     <Text>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//       Asperiores voluptatibus aperiam minus reprehenderit fugiat?
//       Officia modi quo, rerum labore et consectetur minima consequatur
//       rem, animi quis molestias optio facere pariatur cupiditate?
//       Accusamus architecto maiores, beatae earum eaque, autem eius
//       saepe, nesciunt aut, ducimus aliquid sequi itaque fugit veniam
//       non. Suscipit hic, ad aliquid veniam quod veritatis id voluptas
//       similique nemo.
//     </Text>
//   </Box>
// </Row>
// </Section>

// <Section
// data-tut="reactour__state--observe"
// style={{ paddingBottom: "3em" }}
// >
// <Row>
//   <Box center>
//     <Heading h="1">Also its beautiful Buildings</Heading>
//   </Box>
// </Row>
// <Row>
//   <Box data-tut="reactour__action">
//     <Link
//       href="https://dribbble.com/shots/2788237-Tilford-Street"
//       nospaces
//     >
//       <Image src="https://cdn.dribbble.com/users/235991/screenshots/2788237/tilforddr-01.png" />
//     </Link>
//     <Text size=".7em">
//       Image by{" "}
//       <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
//         Kate Hoolahan
//       </Link>
//     </Text>
//   </Box>
//   <Box>
//     <Heading h="2">Tilford Street</Heading>
//     <Text>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//       Asperiores voluptatibus aperiam minus reprehenderit fugiat?
//       Officia modi quo, rerum labore et consectetur minima consequatur
//       rem, animi quis molestias optio facere pariatur cupiditate?
//       Accusamus architecto maiores, beatae earum eaque, autem eius
//       saepe, nesciunt aut, ducimus aliquid sequi itaque fugit veniam
//       non. Suscipit hic, ad aliquid veniam quod veritatis id voluptas
//       similique nemo.
//     </Text>
//   </Box>
// </Row>

// <Row>
//   <Box align="right">
//     <Heading h="2">109 Baptist St</Heading>
//     <Text>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
//       neque vero consequuntur recusandae, dolore. Aut molestiae error
//       enim illum odio vero sunt laborum consectetur minus deleniti
//       pariatur eos quos, earum tenetur architecto veniam voluptatum
//       sit! Optio similique ducimus esse vel inventore eaque earum
//       adipisci quo, sit illum reprehenderit? Fugiat rerum inventore
//       commodi dolores nisi soluta, nulla velit omnis! Quisquam est
//       illo deserunt. Consequatur modi voluptatem consectetur nesciunt,
//       eligendi, natus animi.
//     </Text>
//   </Box>
//   <Box>
//     <Link
//       href="https://dribbble.com/shots/2757736-109-Baptist-St"
//       nospaces
//     >
//       <Image src="https://cdn.dribbble.com/users/235991/screenshots/2757736/terrace3-04.png" />
//     </Link>
//     <Text size=".7em">
//       Image by{" "}
//       <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
//         Kate Hoolahan
//       </Link>
//     </Text>
//   </Box>
// </Row>

// <Box center width="100%">
//   <Button
//     onClick={this.props.toggleShowMore}
//     data-tut="reactour__state"
//   >
//     {this.props.isShowingMore ? "Hide" : "Show"} extra Buildings
//   </Button>
// </Box>

// {this.props.isShowingMore && (
//   <Row>
//     <Box>
//       <Link
//         href="https://dribbble.com/shots/1931264-Lean-Green"
//         nospaces
//       >
//         <Image src="https://cdn.dribbble.com/users/235991/screenshots/1931264/house8.png" />
//       </Link>
//       <Text size=".7em">
//         Image by{" "}
//         <Link
//           href="https://twitter.com/hoolahk"
//           color="dark"
//           nospaces
//         >
//           Kate Hoolahan
//         </Link>
//       </Text>
//     </Box>
//     <Box>
//       <Link
//         href="https://dribbble.com/shots/1972953-Greek-House"
//         nospaces
//       >
//         <Image src="https://cdn.dribbble.com/users/235991/screenshots/1972953/greekhouse.png" />
//       </Link>
//       <Text size=".7em">
//         Image by{" "}
//         <Link
//           href="https://twitter.com/hoolahk"
//           color="dark"
//           nospaces
//         >
//           Kate Hoolahan
//         </Link>
//       </Text>
//     </Box>
//     <Box>
//       <Link
//         href="https://dribbble.com/shots/1919911-House-Fancy"
//         nospaces
//       >
//         <Image src="https://cdn.dribbble.com/users/235991/screenshots/1919911/house_french.png" />
//       </Link>
//       <Text size=".7em">
//         Image by{" "}
//         <Link
//           href="https://twitter.com/hoolahk"
//           color="dark"
//           nospaces
//         >
//           Kate Hoolahan
//         </Link>
//       </Text>
//     </Box>
//   </Row>
// )}
// </Section>

// <Scrollable>
// <Link
//   style={{
//     width: "70%",
//     marginTop: "200vh",
//     marginBottom: "200vh",
//     boxShadow: "0 .5em 3em rgba(0,0,0,.3)"
//   }}
//   data-tut="reactour__scroll--hidden"
//   href="https://dribbble.com/shots/2783174-Funny-little-bird"
//   nospaces
// >
//   <Image src="https://cdn.dribbble.com/users/235991/screenshots/2783174/tweetydr-01.png" />
// </Link>
// </Scrollable>

// <Footer>
// <Logo size="20vw" iso={false} />
// <Text size=".7em">
//   <span data-tut="reactour__scroll">Made with ❤️</span> by{" "}
//   <Link
//     href="https://twitter.com/elrumordelaluz"
//     color="white"
//     nospaces
//   >
//     @elrumordelaluz
//   </Link>{" "}
//   ·{" "}
//   <Link href="https://github.com/elrumordelaluz/reactour" nospaces>
//     Github
//   </Link>
// </Text>
// </Footer> */
// }

// = ({ this.props.openTour, isShowingMore, toggleShowMore }) => (
