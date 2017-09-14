
var fs = require("fs"); path = require("path");
var p = "./data"; 
var fileNames = []; 
var allData = []; 

//get all the file names, read all files, and store each file's path and info to allData. 
fs.readdirSync(p)
    .map(function (file) {
        return path.join(p, file);
    }) //combine dir name and file name; 
    .filter(function (file) {
        return path.extname(file) === ".txt";
    }) //filter files with extention of .txt
    .forEach(file => {
        fileNames.push(file);
    });

fileNames.forEach((filename)=>{
    var text = fs.readFileSync(filename,"utf-8"); //use Sync method  
    allData.push([filename,text]); 
}); //a nested array that contains each file's information in one string; 


//categorize each file's data into name, year, and returns, and store the info in an object.  
var formatOneData = (string) => {
    let split = string.split("\n"); 
    let result = {}; 
    result.length = split.length; 
    result.Name = split[0]; 
   	result.Year = split[1]; 
    if(split[2]){
    	result.returnData = split[2].split(",").map((str)=> Number(str)); 
    }
    return result; 
};

//check, calculate and store results in an object. 
var checkAndFormatSolution = (data) => {
    var Pass = true; 
    var formatted = formatOneData(data[1]); 
    var result = {}; 

    //check if each file contains three lines, and each line item reflects the expected content. data[0] is the path of the file; data[1] is the content. 
    if(data[1] === "") {
       	console.log("Data is empty, check ",data[0]); 
       	Pass = false;  
    }
    else if(formatted.length!==3) {
       	console.log("file should have three lines, check ", data[0]); 
       	Pass = false; 
    }
    else {
	   	var Name = formatted.Name; 
	   	var Year = formatted.Year; 
        var returnData = formatted.returnData;            
	   	if(isNaN(Number(Year))) {
	   		console.log("Year data is wrong, check ", data[0]); 
	   		Pass = false; 
	   	}
	   	if(returnData.length !==12) {
	   		console.log("return data is not equal to 12, check ", data[0]); 
	   		Pass = false; 
	   	}
	   	returnData.forEach(num => isNaN(Number(num))? (console.log("return data not all numbers, check ", data[0]), Pass = false): null);
    }

    //calculate and format data
    if(Pass) {
        result.Name = Name.trim(); 
        result.Year = Number(Year); 
        result["Cumulative Return"] = ((returnData.reduce((a,b) => {return a*(1+b/100);}, 1)-1)*100).toFixed(2) + "%"; 
     	result["% Positive Months"] = ((returnData.filter(num => num>=0).length/12 * 100)).toFixed(2) + "%"; 
     	result["Best Month"] = Math.max.apply(null,returnData).toFixed(2) + "%"; 
     	return result; 
    }
};

//print out final solution
var allDataSolution = (allData) =>{
    let holder = []; 
    let result = [];
    let final = []; 
    allData.forEach((data) => {
        let solution = checkAndFormatSolution(data); 
        holder.push(solution); 
    });
    
    holder.forEach((obj) => {
        for(var k in obj){
            if(k==="Name"){result.push(obj[k]);}else{
                result.push(k.concat(": ", obj[k]));
            }             
        }
    }); 
    for(var i=5;i<result.length+5;i+=5){
        final.push(result.slice(i-5,i)); 
    }
    for(var j=1;j<=final.length;j++){
        console.log(final[j-1].join("\n")+"\n"); 
    }
};

allDataSolution(allData); 

