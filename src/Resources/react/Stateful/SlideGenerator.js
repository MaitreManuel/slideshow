import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Description from '../Stateless/Description';
import Image from '../Stateless/Image';
import Link from '../Stateless/Link';
import Text from '../Stateless/Text';

import * as Slideshow from '../../assets/slideshow/initialize';
import slideManager from '../../assets/admin/slideManager';

const loader = document.querySelector('#loader');
const sManager = slideManager.getManager();

class SlideGenerator extends Component {
  constructor(props) {
    super(props);

    this.constructSlideDescription = this.constructSlideDescription.bind(this);
    this.constructSlideImage = this.constructSlideImage.bind(this);
    this.constructSlideLink = this.constructSlideLink.bind(this);
    this.constructSlideTitle = this.constructSlideTitle.bind(this);
    this.extractSlides = this.extractSlides.bind(this);
    this.fetchSlides = this.fetchSlides.bind(this);

    this.state = {
      descriptions      : [],
      images            : [],
      links             : [],
      load              : {
        slides: false
      },
      slides            : [],
      titles             : [],
    };
  }

  componentDidMount() {
    const me = this;

    me.fetchSlides();
  }

  componentDidUpdate() {
    const me = this;

    if(me.state.load.slides === false) {
      let slides = me.extractSlides();

      me.constructSlideTitle(slides.titles);
      me.constructSlideLink(slides.links, slides.titles);
      me.constructSlideDescription(slides.descriptions);
      me.constructSlideImage(slides.images, slides.id);
      if(me.state.load.slides === false) {
        me.setState({ load: { slides: true } });
      }
    } else {
      Slideshow.init();
    }
  }

  constructSlideDescription(descriptions) {
    const me = this;
    let descriptions_dyn = [];

    for(let i = 0; i < descriptions.length; i++) {
      descriptions_dyn.push( <Description key={ 'description slide '+ i } description={ descriptions[i] } /> );
    }

    me.setState({ descriptions: descriptions_dyn });
  }

  constructSlideImage(images, id) {
    const me = this;
    let images_dyn = [];

    for(let i = 0; i < images.length; i++) {
      images_dyn.push( <Image key={ 'image slide '+ i } src={ images[i] } id={ id[i] } /> );
    }

    me.setState({ images: images_dyn });
  }

  constructSlideLink(links, titles) {
    const me = this;
    let links_dyn = [];

    for(let i = 0; i < links.length; i++) {
      links_dyn.push( <Link key={ 'link slide '+ i } link={ links[i] } title={ titles[i] } /> );
    }

    me.setState({ links: links_dyn });
  }

  constructSlideTitle(titles) {
    const me = this;
    let titles_dyn = [];

    for(let i = 0; i < titles.length; i++) {
      titles_dyn.push( <Text key={ 'title '+ titles[i] } title={ titles[i] } /> );
    }

    me.setState({ titles: titles_dyn });
  }

  extractSlides() {
    const me = this;
    let slides = {
        descriptions: [],
        id: [],
        images: [],
        links: [],
        titles: []
      },
      slides_extract = me.state.slides;

    for(let i = 0; i < slides_extract.length; i++) {
      let slide = slides_extract[i];

      slides.descriptions.push(slide.description);
      slides.id.push(slide.id);
      slides.images.push(slide.image);
      slides.links.push(slide.link);
      slides.titles.push(slide.title);
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
        slide[key]['id'] = key;
        slides_extract.push(slide[key]);
      });

      me.setState({ slides: slides_extract });
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
      links = me.state.links,
      titles = me.state.titles,
      descriptions = me.state.descriptions;

    return (
      <div>
        {/* { descriptions } */}
        {/* { links } */}
        {/* { images } */}
        { titles }
      </div>
    );
  }

  render() {
    if(this.state.load.slides === true) {
      return this.render_dynamic();
    } else {
      return this.loading();
    }
  }
} export default SlideGenerator;
