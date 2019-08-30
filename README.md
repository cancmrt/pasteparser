# pasteparser
Tiny pure javascript library for pasted data to categorize and convert on html page

Usage without options:
```javascript
        PasteParser("#area",null,function(categorizedData){
            console.log(categorizedData)
        });
```
![alt text](https://i.ibb.co/RhJkYyv/1.png)




Usage with options:
```javascript
var forExcelParseOptions = {
            FirstColumnIsHeader: true,
        };
        PasteParser("#area",forExcelParseOptions,function(categorizedData){
            console.log(categorizedData)
        });
```
![alt text](https://i.ibb.co/RHVQQsr/3.png)






```javascript
var forExcelParseOptions = {
            FirstColumnIsHeader: false,
            InjectThisHeader:['A','B','C']
        };
        PasteParser("#area",forExcelParseOptions,function(categorizedData){
            console.log(categorizedData)
        });
```

![alt text](https://i.ibb.co/cFB1GG2/2.png)
