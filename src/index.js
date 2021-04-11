const QrCode = require('qrcode-reader')
const request = require('request').defaults({encoding: null});
const jimp = require('jimp');

exports.decodeUri = async (url, callback) => {
  if (!url)
    callback('Url decode is required, please insert url to params decode')

    request(url, function (error, response, body) {
      if (error)
        return callback(error)

      let data = response.body;
      jimp.read(data, async (err, image) => {
        if (err) 
          return callback(`Can't convert url to image, please check url respon is image preview !`)

        if (!image.bitmap)
          return callback(`Can't convert url to image, please check url respon is image preview !`)
        
        var qr = new QrCode();
        
        const decode = await new Promise((resolve, reject) => {
          qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
          qr.decode(image.bitmap);
        })
  
        let result = {
          data: decode.result,
          url_params: url
        }
  
        return callback(null, result)
      })
    });
}