# Instalation
```
npm install node-qris-generator
```

# Usage
```
var qrisReader = require('node-qris-generator');
```

# Passing image from url
You have to use an external express
1.	You can use `npm install --save express`
```javascript
    var express = require("express");
    var app = express()
    
    app.get('/read-qrcode', async (req,res,next) => {
        let urlEncode = req.query.url;
    
          try {
            qrisReader.decodeUri(urlEncode, (err, result) => {
              if (err)
                return res.json({
                  status: 500,
                  message: `${err}`
                })
        
              return res.json({
                status: 200,
                data: result
              });
            });
          } catch (e) {
            console.log(e);
            return res.json({
              status: 500,
              message: `${e}`
            });
          };
    });
```