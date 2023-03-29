import Replicate from 'replicate';

import config from '../config/index.js';
import { MOCK_TEXT_OK } from '../constants/mock.js';

const replicate = new Replicate({
  auth: config.REPLICATE_API_TOKEN,
});

class Image {
  url;

  constructor({
    url,
  }) {
    this.url = url;
  }
}

/**
 * @param {Object} param
 * @param {string} param.prompt
 * @returns {Promise<Image>}
 */
const generateImage2 = async ({
  prompt,
  size,
}) => {
  if (config.APP_ENV !== 'production') return new Image({ url: MOCK_TEXT_OK });
  
  let url = '';
  try {
    let prediction = await replicate.predictions.create({
      version: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      input: {
        prompt,
        num_inference_steps: 500,
        guidance_scale: 20
      },
    });
    prediction = await replicate.wait(prediction, {});
    url = prediction.output[0]
    console.log('prompt:' + prompt + ' draw:' + url)
  } catch (e) {
    console.error(e);
  }

  return new Image({url});
};

export default generateImage2;
