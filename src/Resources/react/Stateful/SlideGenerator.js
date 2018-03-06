import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Image from '../Stateless/Image';
import Text from '../Stateless/Text';

import * as Slideshow from '../../assets/slideshow/initialize';
import slideManager from '../../assets/admin/slideManager';

const loader = document.querySelector('#loader');

class SlideGenerator extends Component {
  constructor(props) {
    super(props);

    this.constructSlides = this.constructSlides.bind(this);
    this.constructSlideImage = this.constructSlideImage.bind(this);
    this.constructSlideText = this.constructSlideText.bind(this);
    this.fetchSlides = this.fetchSlides.bind(this);

    this.state = {
      images            : [],
      load              : false,
      slides            : [],
      slides_extract    : [],
      texts             : [],
    };
  }

  componentDidMount() {
    const me = this;

    me.fetchSlides();
  }

  componentDidUpdate() {
    const me = this;

    if(me.state.load === false) {
      let slides = me.constructSlides();

      me.constructSlideText(slides.texts);
      me.constructSlideImage(slides.images);
      me.setState({ load: true });
    } else {
      Slideshow.init();
    }
  }

  constructSlideImage(images) {
    const me = this;
    let images_dyn = [];

    for(let i = 0; i < images.length; i++) {
      images_dyn.push( <Image key={ 'image slide '+ i } src={ images[i] } /> );
    }

    me.setState({ images: images_dyn });
  }

  constructSlideText(texts) {
    const me = this;
    let texts_dyn = [];

    for(let i = 0; i < texts.length; i++) {
      texts_dyn.push( <Text key={ 'text '+ texts[i] } title={ texts[i] } /> );
    }

    me.setState({ texts: texts_dyn });
  }

  constructSlides() {
    const me = this;
    let slides = {
        images: [],
        texts: []
      },
      slides_extract = me.state.slides_extract;

    for(let i = 0; i < slides_extract.length; i++) {
      let slide = slides_extract[i];

      slides.images.push(slide.image);
      slides.texts.push(slide.title);
    }

    return slides;
  }

  fetchSlides() {
    const me = this;
    let slides_extract = [];

    let sManager = slideManager.getManager();
    const slides_firebase = sManager.getSlides();

    slides_firebase.then((e) => {
      let slide = e.val();

      Object.keys(slide).forEach(key => {
        slides_extract.push(slide[key]);
      });

      me.setState({ slides_extract: slides_extract });
    });

  }

  loading() {
    let template =
      <div className="Loader"></div>
    ;

    return ReactDOM.createPortal(template, loader);
  }

  render_dynamic() {
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

  render() {
    if(this.state.load === true) {
      return this.render_dynamic();
    } else {
      return this.loading();
    }
  }
} export default SlideGenerator;
