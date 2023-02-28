const fs = require('fs');

const requestHandler = (request,response) =>{
    const url = request.url;
    method = request.method;
    if(url === '/'){
        response.write('<html>');
    response.write('<head> <title> Enter Message</title></head>');
    response.write('<body><form action ="/message" method ="POST" name = "message"> <input type ="text" name ="message"> <button type = "submit">Send</button></form> </body>');
    response.write('</html>');
    return response.end;
    }
    
    if(url ==='/message'&& method ==='POST'){
        const body = [];
        request.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        request.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message,txt', message, err =>{
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();
            });
       
        });
    }
    // process.exit();
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head> <title> My First Page</title></head>');
    response.write('<body> <h1> Hello from Node.js </h1></body>');
    response.write('</html>');
    response.end;
};

module.exports = {handler:requestHandler, someText:'Some hard coded Text'};

