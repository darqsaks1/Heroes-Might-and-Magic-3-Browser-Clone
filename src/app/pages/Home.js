import React from "react";

import { WOW } from "wowjs";

import Sticky from "react-stickynode";
import Title from "../components/title/title";
import About from "../components/about/About";
import SwiperBlock from "../components/swiper/swiper";
import Video from "../components/videos/video";
import Header from "../components/header/header";

class Home extends React.Component {
  componentDidMount() {
    const wow = new WOW({
      offset: 100,
      mobile: false,
      live: true,
    });

    wow.init();
  }

  render() {
    return (
      <div>
        <Sticky enabled top={0} bottomBoundary={0} innerZ={2}>
          <Header />
        </Sticky>
        <Title />
        <About />
        <SwiperBlock />
        <Video />
      </div>
    );
  }
}

export default Home;
