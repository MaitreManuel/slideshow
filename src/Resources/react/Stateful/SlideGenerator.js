import React, { Component } from 'react';

import Image from '../Stateless/Image';
import Text from '../Stateless/Text';

// import SLIDES_JSON from '../../datas/data';

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
    let slides = me.fetchSlides();

    me.constructSlideImage(slides.images);
    me.constructSlideText(slides.texts);

    me.setState({ slides: slides });
  }

  constructSlideImage(images) {
    const me = this;
    let images_dyn = [];

    for(let i = 0; i < images.length; i++) {
      images_dyn.push( <Image src={ images[i] } /> );
    }

    me.setState({ images: images_dyn });
  }

  constructSlideText(texts) {
    const me = this;
    let texts_dyn = [];

    for(let i = 0; i < texts.length; i++) {
      texts_dyn.push( <Text title={ texts[i] } /> );
    }

    me.setState({ texts: texts_dyn });
  }

  // fetchSlides() {
  //   let slides = {
  //     images: [],
  //     texts: []
  //   };
  //
  //   // waiting for dynamic fixtures
  //   for(let i = 0; i < SLIDES_JSON.length; i++) {
  //     let slide = SLIDES_JSON[i];
  //
  //     slides.images.push(slide.src);
  //     slides.texts.push(slide.title);
  //   }
  //
  //   return slides;
  // }

  render() {
    const me = this,
      images = me.state.images,
      texts = me.state.texts;

    return (
      <div>
        { images }
        { texts }
      </div>
    );
  }
} export default SlideGenerator;
