const axios = require('axios')
const fs = require('fs')
const path = require('path')

// Use this function to convert an image file from the filesystem to base64
function imageFileToBase64 (imagePath) {
  const imageData = fs.readFileSync(path.resolve(imagePath))
  return Buffer.from(imageData).toString('base64')
}

// Use this function to fetch an image from a URL and convert it to base64
async function imageUrlToBase64 (imageUrl) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  return Buffer.from(response.data, 'binary').toString('base64')
}

// Use this function to convert a list of image URLs to base64
async function imageUrlsToBase64 (imageUrls) {
  return Promise.all(imageUrls.map(url => imageUrlToBase64(url)))
}

const api_key = process.env.SEGMIND_API_KEY;
const url = 'https://api.segmind.com/v1/faceswap-comic';

// Exported controller function for route usage
async function swapFaces (req, res) {
  try {
    const image1 = req.files && req.files.image1
    const image2 = req.files && req.files.image2
    if (!image1 || !image2) {
      return res.render('swap/index', { title: 'Face Swap', outputImage: null, error: 'Both images are required.' })
    }
    const sourceBase64 = image1.data.toString('base64')
    const targetBase64 = image2.data.toString('base64')

    const data = {
      source_image: sourceBase64,
      target_image: targetBase64,
      face_strength: 0.8,
      style_strength: 0.8,
      seed: 63255,
      steps: 10,
      cfg: 1.5,
      output_format: 'jpeg',
      output_quality: 95,
      base64: false
    }

    const response = await axios.post(url, data, {
      headers: { 'x-api-key': api_key },
      responseType: data.base64 ? 'json' : 'arraybuffer'
    })

    const outputPath = path.join(__dirname, '../public/output/output.jpg')
    if (data.base64 && response.data && response.data.image) {
      const imgBuffer = Buffer.from(response.data.image, 'base64')
      fs.writeFileSync(outputPath, imgBuffer)
    } else {
      fs.writeFileSync(outputPath, response.data)
    }
    console.log('Image saved successfully.')
    res.render('swap/index', { title: 'Face Swap', outputImage: '/output/output.jpg', error: null })
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message)
    res.render('swap/index', { title: 'Face Swap', outputImage: null, error: 'Error: ' + (error.response ? error.response.data : error.message) })
  }
}

module.exports = { swapFaces }
