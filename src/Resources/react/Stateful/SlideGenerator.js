import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Image from '../Stateless/Image';
import Text from '../Stateless/Text';
import Title from '../Stateless/Title';

import * as Slideshow from '../../assets/slideshow/initialize';
import slideManager from '../../assets/admin/slideManager';

const loader = document.querySelector('#loader');
const sManager = slideManager.getManager();

class SlideGenerator extends Component {
  constructor(props) {
    super(props);

    this.constructSlideImage = this.constructSlideImage.bind(this);
    this.constructSlideText = this.constructSlideText.bind(this);
    this.constructSlideTitle = this.constructSlideTitle.bind(this);
    this.extractSlides = this.extractSlides.bind(this);
    this.fetchSlides = this.fetchSlides.bind(this);

    this.state = {
      images            : [],
      load              : {
        slides   : false,
        title    : false
      },
      slides            : [],
      texts             : [],
      title             : [],
    };
  }

  componentDidMount() {
    const me = this;

    me.fetchSlides();
    me.fetchTitle();
  }

  componentDidUpdate() {
    const me = this;

    if(me.state.load.slides === false || me.state.load.title === false) {
      let slides = me.extractSlides();

      me.constructSlideText(slides.texts);
      me.constructSlideTitle(me.state.title);
      me.constructSlideImage(slides.images);
      if(me.state.load.slides === false && me.state.load.title === false) {
        me.setState({ load: { slides: true, title: true } });
      }
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

  constructSlideTitle(text) {
    const me = this;
    let title =
      <Title title={ text } />
    ;

    me.setState({ title: title });
  }

  extractSlides() {
    const me = this;
    let slides = {
        images: [],
        texts: []
      },
      slides_extract = me.state.slides;

    for(let i = 0; i < slides_extract.length; i++) {
      let slide = slides_extract[i];

      slides.images.push(slide.image);
      slides.texts.push(slide.title);
    }

    return slides;
  }

  fetchSlides() {
    const me = this,
      slides_firebase = sManager.getSlides();
    let slides_extract = [];


    slides_firebase.then(e => {
      let slide = e.val();

      Object.keys(slide).forEach(key => {
        slides_extract.push(slide[key]);
      });

      me.setState({ slides: slides_extract });
    });
  }

  fetchTitle() {
    const me = this,
      title_firebase = sManager.getSlideTitle();

    title_firebase.then(e => {
      me.setState({ title: e.val() });
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
      texts = me.state.texts,
      title = me.state.title;

    return (
      <div>
        { images }
        { texts }
        { title }
      </div>
    );
  }

  render() {
    if(this.state.load.slides === true && this.state.load.title === true) {
      return this.render_dynamic();
    } else {
      return this.loading();
    }
  }
} export default SlideGenerator;
