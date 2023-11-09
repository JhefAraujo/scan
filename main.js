function close() {
  document.getElementById("popup").style.pointerEvents = "none";
  document.getElementById("popup").style.opacity = "0";
}

function scan() {
  document.getElementById("load").style.display = "flex";
  var myHeaders = new Headers();

  myHeaders.append("apikey", "helloworld");

  var formdata = new FormData();
  formdata.append("language", "eng");
  formdata.append("isOverlayRequired", "false");
  formdata.append("file", document.getElementById("file").files[0], "[PROXY]");
  formdata.append("iscreatesearchablepdf", "false");
  formdata.append("issearchablepdfhidetextlayer", "false");
  formdata.append("OCREngine", "2");
  formdata.append("filetype", "jpg");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  async function recieve() {
    response = await fetch("https://api.ocr.space/parse/image", requestOptions);
    jponse = response.json();
    jwait = await jponse;
    parsedResults = jwait["ParsedResults"];
    zero = parsedResults[0];
    overlays = zero["TextOverlay"];
    lines = overlays.Lines;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].LineText;
      console.log(line);

      let isnum = /^\d+$/.test(line);

      if (line.length == 7 && isnum == true) {
        cria = document.createElement("p");
        cria.setAttribute("id", "cria");
        document.getElementById("form").appendChild(cria);
        cria.innerHTML = line;
      }
    }
    document.getElementById("load").style.display = "none";
  }
  recieve();
}

async function send() {
  valor = document.getElementById("cria").innerHTML;

  var formdata = new FormData();
  formdata.append("validate", valor);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  await fetch(
    "https://script.google.com/macros/s/AKfycbwqDncX01avy_YRg0G4rTHsoLSwlP6H4j8dmYlbvK78iQPYaqsXCiMMMVcVa2_O2jjF/exec",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => (document.getElementById("os").innerHTML = result))
    .catch((error) => console.log("error", error));

  if (document.getElementById("os").innerHTML != '""') {
    document.getElementById("popup").style.opacity = "1";
    document.getElementById("popup").style.pointerEvents = "auto";
  } else {
    document.getElementById("consertos").style.display = "none";
    document.getElementById("os").innerHTML = "Enviado com sucesso!";
    document.getElementById("popup").style.opacity = "1";
    document.getElementById("popup").style.pointerEvents = "auto";
  }
}

async function form() {
  document.getElementById("confirm").style.display = "flex";
}

async function finish(order) {
  const inputString = document.getElementById("os").innerHTML;
  var numbers = inputString.replace(/\D/g, "");

  if (numbers == order) {

    var formdata = new FormData();
    formdata.append("validate", valor);
    
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbwbutKWoVHD1ZQpYSRDGkEGzIEMz5o3EPHmIknnigfHmMBZhLFbj6i2zrPfsImErAa_/exec",
      requestOptions
    );
    
    document.getElementById("confirmation").style.display = "flex";
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    document.getElementById('label').innerHTML = 'OS incorreta!';
    document.getElementById('label').style.color = 'red';
    setTimeout(() => {
      document.getElementById('label').style.color = 'black';
      document.getElementById('label').innerHTML = 'Ordem de Serviço';
    }, 2500);
  }
}
