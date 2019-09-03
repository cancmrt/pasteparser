# pasteparser
PasterParser.js



Tiny pure javascript library for pasted data to categorize and convert on html page

You can include to your project using npm

```javascript
npm i pasteparser-js
```

or you can directly include your page using:

```javascript
<script src="https://unpkg.com/pasteparser-js@1.0.1/pasteparser.min.js"></script>
```

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
