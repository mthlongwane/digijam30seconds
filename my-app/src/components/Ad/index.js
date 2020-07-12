import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='ad'>
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-3749679737195253'
          data-ad-slot='2337623885'
          data-ad-format='auto' 
          data-full-width-responsive="true"
        />
      </div>
    );
  }
}