import React, { Component } from 'react';

import Image from '../Stateless/Image';
import Text from '../Stateless/Text';

class SlideGenerator extends Component {
  constructor(props) {
    super(props);

    this.constructSlideImage = this.constructSlideImage.bind(this);
    this.constructSlideText = this.constructSlideText.bind(this);
    this.fetchSlides = this.fetchSlides.bind(this);

    this.state = {
      images:     [],
      slides:     [],
      texts:      [],
    };
  }

  componentDidMount() {
    const me = this;
    let slides = me.fetchSlides(),
      images = me.constructSlideImage(slides.images),
      texts = me.constructSlideText(slides.texts);

    me.setState({
      images:   images,
      slides:   slides,
      texts:    texts,
    });
  }

  constructSlideImage() {
    let images = [];

    return images;
  }

  constructSlideText() {
    let texts = [];

    return texts;
  }

  fetchSlides() {
    let slides = [];

    return slides;
  }

  render() {
    return (
      <div>
        <Image/>
        <Text/>
      </div>
    );
  }
} export default SlideGenerator;
