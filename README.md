# pasteparser
Tiny pure javascript library for pasted data to categorize and convert on html page

Usage without options:
```javascript
        PasteParser("#area",null,function(categorizedData){
            console.log(categorizedData)
        });
```
![alt text](https://ibb.co/s5XdbHm)




Usage with options:
```javascript
var forExcelParseOptions = {
            FirstColumnIsHeader: true,
        };
        PasteParser("#area",forExcelParseOptions,function(categorizedData){
            console.log(categorizedData)
        });
```
![alt text](https://ibb.co/6PMm33D)






```javascript
var forExcelParseOptions = {
            FirstColumnIsHeader: false,
            InjectThisHeader:['A','B','C']
        };
        PasteParser("#area",forExcelParseOptions,function(categorizedData){
            console.log(categorizedData)
        });
```

![alt text](https://ibb.co/HgkGGbw)
