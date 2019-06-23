const http  =   require('http');
const fs    =   require('fs');
const path  =   require('path');    

const hostname  =   "localhost";
const port      =   3000;

const server = http.createServer((req, res) => {

    // console.log(req.headers);

    console.log('request for ' + req.url + 'by ' + req.method);

    // check request method is GET or NOT
    if(req.method == 'GET'){

        //create fuction
        var fileURL;
        // check request url exits any slash character
        if(req.url == '/'){
            fileURL = '/index.html';
        }else {
            fileURL = req.url;
        }
        //now check or find our absolute file path with resolve function
        var filePath = path.resolve('./public'+ fileURL);

        // find file extantion name
        const fileExt   = path.extname(filePath);
        
        //now check file extantion
        if(fileExt == '.html'){
                //now check required file is exists or not
                fs.exists(filePath, (exists)=>{
                    //if not exists
                    if(!exists){
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/html');
                        res.end('<html><body><h2>Error 404. Page Not Found. ' + fileURL + '</h2></body></html>');
                    }else{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');      
                        // By createReadStream filePath data read and convert into stream of bites. through bites one by 
                        // one pipes response. pipes help to response multiple line
                        //we can do also readFile but createReadStream can handle big single lines of codes and by pips response
                        fs.createReadStream(filePath).pipe(res);
                    }
                })
            }else{
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h2>Not HTML file exits. '+ fileURL +'</h2></body></html>');
            }
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h2>Response method not supported. '+ fileURL +'</h2></body></html>');
    }
});

server.listen(port, hostname, () => {
    console.log(`server runtime at http://${hostname}:${port}`);
});
