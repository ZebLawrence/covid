import React, { Component } from 'react';
import pdfArrayBbuffer from './pdfArrayBuffer.json';
import './home.scss';

class TestMobile extends Component {
  constructor(props){
    super(props);
  }

  
  
  render() {
    const { navigator } = window || {};
    const { userAgent } = navigator || {};
    const [pdfResponse] = pdfArrayBbuffer || [];
    const { data } = pdfResponse || {};
 
    const isMobile = /Android|WebOS/i.test(userAgent);
    // const isMobile = /Android|WebOS|iPhone|iPad|iPod|Mobile|mobile|CriOS/i.test(userAgent);
    if (isMobile) {
      const dataBlob = new Blob([Buffer.from(data)], { type: 'application/pdf'});
      const fileReader = new FileReader();
      fileReader.fileName = 'ThePdfDownload.pdf';
      fileReader.onloadend = (fr, ev) => { 
        fr.fileName = 'ThePdfDownload.pdf';
        window.location = fileReader.result;
      };
      fileReader.readAsDataURL(dataBlob);
    } else {
      const fileObject = new File([Buffer.from(data)], 'TheFile.pdf', { type: 'application/pdf'});
      const objUrl = window.URL.createObjectURL(fileObject);
      window.location = objUrl;
    }

    console.log('The array', [Buffer.from(data)]);

    return (
      <div>
        Just the mobile test
        <p>
          {`isMobile: ${isMobile}`}
        </p>
        <p>
          The user agent string
          {userAgent}
        </p>
        <p>
          File Reader with new
          {/* {JSON.stringify(fileReader.readAsDataURL(new Blob()))} */}
        </p>
      </div>
    );
  }
}

export default (TestMobile);
