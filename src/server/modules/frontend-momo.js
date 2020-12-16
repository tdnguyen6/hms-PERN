const { v1: uuidv1 } = require('uuid');
const https = require('https');
const express = require('express')
const app = express()

//parameters send to MoMo get get payUrl

/* don't edit this */
var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
var hostname = "https://test-payment.momo.vn"
var path = "/gw_payment/transactionProcessor"
var partnerCode = "MOMO"
var accessKey = "F8BBA842ECF85"
var extraData = "merchantName=;merchantId=" //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store

// This is automatically generated
var orderId = uuidv1()
var requestId = uuidv1() 

// you can edit this
var serectkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
var orderInfo = "pay with MoMo"
// return URL after payment is successful
var returnUrl = `http://localhost:3000`
// Notify URL contains the link that momo server can post to our server
var notifyurl = "https://itchy-bobcat-0.loca.lt/payment/momo"
var amount = "1000"
var requestType = "captureMoMoWallet"

const crypto = require('crypto');
//before sign HMAC SHA256 with format
//partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
function generatePayment() {
    var rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
    //puts raw signature
//    console.log("--------------------RAW SIGNATURE----------------")
//    console.log(rawSignature)

    //signature
    var signature = crypto.createHmac('sha256', serectkey)
    .update(rawSignature)
    .digest('hex');
//    console.log("--------------------SIGNATURE----------------")
//    console.log(signature)
//    
//    console.log("----------------------------------------------")
//    console.log(`requestID: ${requestId}`)
//    console.log(`orderID: ${orderId}`)
//    
//    console.log("----------------------------------------------")
    //json object send to MoMo endpoint
    var body = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        returnUrl : returnUrl,
        notifyUrl : notifyurl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
    })
    
    console.log(`Send this JSON body to momo server: ` + body)
}

// example of check Payment, parameter is not important here
function checkPayment(orderID, reqID) {
    var rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${reqID}&orderId=${orderID}&requestType=transactionStatus`
//    console.log("-----------------RAW  SIGNATURE-----------------")
//    console.log(rawSignature)
    var signature = crypto.createHmac('sha256', serectkey)
    .update(rawSignature)
    .digest('hex');
//    console.log("----------------------------------------------")
//    console.log("-----------------SIGNATURE-----------------")
//    console.log(signature)
    var body = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : reqID,
        amount : amount,
        orderId : orderID,
        orderInfo : orderInfo,
        requestType : 'transactionStatus',
        signature : signature,
    })
    
    console.log(body)
}

// This is notify URL implementation
app.post('returnURL we specify above', 'do some payment stuff in our server')

//Create the HTTPS objects
//var options = {
//  hostname: 'test-payment.momo.vn',
//  port: 443,
//  path: '/gw_payment/transactionProcessor',
//  method: 'POST',
//  headers: {
//    'Content-Type': 'application/json',
//    'Content-Length': Buffer.byteLength(body)
//  }
//};
//
////Send the request and get the response
//console.log("----------------------------------------------")
//console.log("Sending....")
//var req = https.request(options, (res) => {
//  console.log(`Status: ${res.statusCode}`);
//  console.log(`Headers: ${JSON.stringify(res.headers)}`);
//  res.setEncoding('utf8');
//  res.on('data', (body) => {
////    console.log('Body');
////    console.log(body);
//    console.log('payURL');
//    console.log(JSON.parse(body).payUrl);
//  });
//  res.on('end', () => {
//    console.log('No more data in response.');
//  });
//});
//
//req.on('error', (e) => {
//  console.log(`problem with request: ${e.message}`);
//});

// write data to request body
//req.write(body);
//req.end();


// curl -X POST \
//   https://example.com/momo_ipn \
//   -H 'Content-Type: application/x-www-form-urlencoded' \
//   -d 
//   partnerCode=MOMOTUEN20190312
//   accessKey=ZjF6taKUohp7iN8l
//   requestId=1555383430
//   orderId=1555383430    
//   orderInfo=
//   orderType=momo_wallet
//   transId=2302586804
//   errorCode=0
//   message=Success
//   localMessage=Th%C3%A0nh%20c%C3%B4ng
//   payType=qr
//   responseTime=2019-04-09%2014%3A53%3A38
//   extraData=
//   signature=e1da7982cdbc732c172e4f2909d6f70c5e2a5d2dde7e8c02dce866c6b35c9461
//   amount=300000
