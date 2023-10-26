

function aaa() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "helloworld");

    var formdata = new FormData();
    formdata.append("language", "por");
    formdata.append("isOverlayRequired", "false");
    formdata.append("file", document.getElementById('file').files[0], "[PROXY]");
    formdata.append("iscreatesearchablepdf", "false");
    formdata.append("issearchablepdfhidetextlayer", "false");
    formdata.append("OCREngine", "2");
    formdata.append("filetype", "jpeg");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    async function recieve() {
        response = await fetch("https://api.ocr.space/parse/image", requestOptions)
        jponse = response.json();
        jwait = await jponse;
        parsedResults = jwait["ParsedResults"];
        zero = parsedResults[0];
        overlays = zero["TextOverlay"];
        lines = overlays.Lines;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].LineText;

            let isnum = /^\d+$/.test(line);

            if (line.length == 7 && isnum == true) {
                cria = document.createElement('p');
                document.getElementById('form').appendChild(cria);
                cria.innerHTML = line;
                console.log(line);
            }
        }
    }
    recieve();
}