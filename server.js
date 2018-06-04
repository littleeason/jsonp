var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]


var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  if(path === '/'){
    var string = fs.readFileSync('./a.html','utf8')
    /*第33节课添加的代码*/
    var amount = fs.readFileSync('./db.txt', 'utf8')
    string = string.replace('&&&amount&&&',amount)

    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/pay'){
    var amount = fs.readFileSync('./db.txt','utf8')
    var newAmount = amount - 1
    fs.writeFileSync('./db.txt',newAmount)
    response.setHeader('Content-Type','application/javascript')
    response.statusCode = 200
    response.write(`
    amount.innerText = amount.innerText -1`)
    response.end()
  } else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)