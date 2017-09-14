

var fs = require("fs"); path = require("path");
var p = "./data"; 
var fileNames = []; 
var allData = []; 

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
}); //an array with sub-arrays that contains each file's information in one string; 


//categorize each file's data into name, year, and returnData and store in an object.  
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


//check if each file contains three lines, and each line item reflects the expected content. data[0] is the path of the file; data[1] is the content. 
var checkAndFormatSolution = (data) => {
    var Pass = true; 
    var formatted = formatOneData(data[1]); 
    var result = {}; 
    if(data[1] === '') {
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
	   	// console.log('Year',Number(Year)); 
	   	if(Number(Year)===NaN) {
	   		console.log("Year data is wrong, check ", data[0]); 
	   		Pass = false; 
	   	}
	   	if(returnData.length !==12) {
	   		console.log("return data is not equal to 12, check ", data[0]); 
	   		Pass = false; 
	   	}
	   	returnData.forEach(data => Number(data)===NaN? (console.log(`return data not all numbers, check $data[0]`), Pass = false): null);
    }
// console.log(Pass); 
   if(Pass) {
      result.Name = Name.trim(); 
      result.Year = Number(Year); 
      result["Cumulative Return"] = ((returnData.reduce((a,b) => {return a*(1+b/100);}, 1)-1)*100).toFixed(2) + "%"; 
     	result["% Positive Months"] = ((returnData.filter(num => num>=0).length/12 * 100)).toFixed(2) + "%"; 
     	result["Best Month"] = returnData.sort().pop()+"%"; 
     	return result; 
   }

};


var allDataSolution = (allData) =>{
    let holder = []; 
    // let result = [];
    allData.forEach((data) => {
        let solution = checkAndFormatSolution(data); 
        holder.push(solution); 
    });
    
   console.log(holder); 

}
allDataSolution(allData); 




