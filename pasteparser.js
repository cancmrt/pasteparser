var PasteTypeEnum = {
    Microsoft_Excel:"Microsoft_Excel",
    Microsoft_Word:"Microsoft_Word",
    Microsoft_Publisher:"Microsoft_Publisher",
    Microsoft_OneNote:"Microsoft_OneNote",
    OpenOffice_Calc:"OpenOffice_Calc",
    OpenOffice_Writer:"OpenOffice_Writer",
    Html:"Html",
    Unknown:"Unknown"

}
function GetElement(elementName){
    var element;
    if(elementName.search("#") != -1)
    {
        element = document.getElementById(elementName.replace("#",""));
    }
    else if(elementName.search(".") != -1){
        element = document.getElementById(elementName.replace(".",""));
    }
    else{
        element = document.getElementsByTagName(elementName);
    }
    return element;
}
function LookFormat(clipboardData){
    var dataToHtml = clipboardData.getData("text/html");
    if(dataToHtml.search("office:excel") != -1){
        return PasteTypeEnum.Microsoft_Excel;

    }
    else if(dataToHtml.search("office:word") != -1)
    {
        return PasteTypeEnum.Microsoft_Word;
    }
    else if(dataToHtml.search("office:publisher") != -1){
        return PasteTypeEnum.Microsoft_Publisher;
    }
    else if(dataToHtml.search("Microsoft OneNote") != -1)
    {
        return PasteTypeEnum.Microsoft_OneNote;
    }
    else if(dataToHtml.search("OpenOffice") !=-1 && dataToHtml.search("TABLE") != -1 && dataToHtml.search("BODY TEXT") != -1)
    {
        return PasteTypeEnum.OpenOffice_Calc;
    }
    else if(dataToHtml.search("OpenOffice") != -1 && dataToHtml.search("BODY DIR") != -1)
    {
        return PasteTypeEnum.OpenOffice_Writer;
    }
    else if(dataToHtml.search("<html>") != -1){
        return PasteTypeEnum.Html;
    }
    else
    {
        return PasteTypeEnum.Unknown;
    }
    
}
function ExcelPureDataParser(clipboardData)
{
    var dataType = LookFormat(clipboardData);
    if (dataType === PasteTypeEnum.Microsoft_Excel || dataType === PasteTypeEnum.OpenOffice_Calc ) {
        var copiedData = clipboardData.getData("text");
        copiedData = copiedData.trim();
        var copiedDataSplitedNewLine = copiedData.split(String.fromCharCode(13));
        for (var i = 0; i < copiedDataSplitedNewLine.length; i++) {
            copiedDataSplitedNewLine[i] = copiedDataSplitedNewLine[i].trim().split(String.fromCharCode(9));
        }
        return copiedDataSplitedNewLine;
    }
    else {
        Console.error("Excel or Calc format not recognized...");
        return null;
    }
}
function ExcelPureDataHeaderInjector(clipboardData,options)
{
    
    var pureExcelData = ExcelPureDataParser(clipboardData);
    if(options === null)
    {
        return pureExcelData;
    }
    var refinedExcelData = [];
    var Header = null;
    if(options.FirstColumnIsHeader)
    {
        Header = pureExcelData[0];
    }
    else if(options.InjectThisHeader && options.InjectThisHeader.constructor === Array)
    {
        if(options.InjectThisHeader.length != pureExcelData[0].length)
        {
            console.warn("Desited inject on header count: "+ options.InjectThisHeader.length);
            console.warn("Pasted data row cell count: "+options.InjectThisHeader.length);
            console.error("Desired inject on header and pasted data count not suitable for conversation of object array");
            return null;
        }
        else{
            Header = options.InjectThisHeader;
        }
    }
    else{
        return pureExcelData;
    }
    for (var i = 0; i < pureExcelData.length; i++) {
        var newObj = {};
        for (var j = 0; j < Header.length; j++) {
                newObj[Header[j]] = pureExcelData[i][j];
        }
        refinedExcelData.push(newObj);
    }
    return refinedExcelData;
}
function PasteParser(elementName,options,callback){

    GetElement(elementName).addEventListener("paste",function(event){
        var pasteType = LookFormat(event.clipboardData);
        if(pasteType === PasteTypeEnum.Microsoft_Excel){
            var returnObj = {
                type:PasteTypeEnum.Microsoft_Excel,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                pureExcelArray: ExcelPureDataParser(event.clipboardData),
                injectedExcelArray:ExcelPureDataHeaderInjector(event.clipboardData,options),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else if(pasteType === PasteTypeEnum.Microsoft_Word){
            var returnObj = {
                type:PasteTypeEnum.Microsoft_Word,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else if(pasteType === PasteTypeEnum.Microsoft_Publisher){
            var returnObj = {
                type:PasteTypeEnum.Microsoft_Publisher,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else if(pasteType === PasteTypeEnum.Microsoft_OneNote){
            var returnObj = {
                type:PasteTypeEnum.Microsoft_OneNote,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else if(pasteType === PasteTypeEnum.OpenOffice_Calc){
            var returnObj = {
                type:PasteTypeEnum.OpenOffice_Calc,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                pureExcelArray: ExcelPureDataParser(event.clipboardData),
                injectedExcelArray:ExcelPureDataHeaderInjector(event.clipboardData,options),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else if(pasteType === PasteTypeEnum.OpenOffice_Writer){
            var returnObj = {
                type:PasteTypeEnum.OpenOffice_Writer,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else if(pasteType === PasteTypeEnum.Html){
            var returnObj = {
                type:PasteTypeEnum.Html,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html"),
                domHtml: new DOMParser().parseFromString(event.clipboardData.getData("text/html"), "text/html")
            };
            callback(returnObj);
        }
        else{
            var returnObj = {
                type:PasteTypeEnum.Unknown,
                pureText: event.clipboardData.getData("text"),
                pureHtml: event.clipboardData.getData("text/html")
            };
            callback(returnObj);
        }
    });
}