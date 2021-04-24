 
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

 let compilerCode = (req , res ) => {
    
	var code = req.body.code;	
	var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    console.log("code",req.body.code)
    console.log("input",req.body.input)
    console.log("inputRadio",req.body.inputRadio)
    console.log("lang",req.body.lang)
    if((lang === "C") || (lang === "C++"))
    {        
        if(inputRadio === "true")
        {    
        	var envData = { OS : "windows" , cmd : "g++"};	   	
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
                    console.log("data.error",data.error)
        			res.send(data.error);    		
        		}
        		else
        		{
                    console.log("Output",data.output)
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {
	   	
	   	var envData = { OS : "windows" , cmd : "g++"};	   
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
                console.log("data.error 1",data.error)
        		res.send(data.error);
        	}    	
        	else
        	{
                console.log("Output 1",data.output)
        		res.send(data.output);
        	}
    
            });
	   }
    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "windows"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "windows"};
            compiler.compilePython(envData , code , function(data){
                res.send(data);
            });
        }
    }

}

module.exports = {
    compilerCode
}