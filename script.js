var documento = "PROVA REALIZADA EM " + new Date() + "\n\n---QUESTÕES---\n\n";

var started = false;
var paused = false;

var min = 0;
var seg = 0;

var mintotal = 0;
var segtotal = 0;

var interval;

var qNum = 1;

function next() {
    if (started) {
        total();
        renderTable();
        min = 0;
        seg = 0;
        qNum++;
    }

}

function total() {
    segtotal += seg;
    mintotal += min;

    mintotal += Math.floor(segtotal / 60);
    segtotal = segtotal % 60;




}

function renderTable() {
    let strmin = min;
    let strseg = seg;

    if (strmin < 10) {
        strmin = "0" + strmin;
    }
    if (strseg < 10) {
        strseg = "0" + strseg;
    }

    documento += qNum + "º QUESTAO: " + strmin + ":" + strseg + "\n";

    $('#status').html($('#status').html() + "<tr><td><center>" + qNum + "º</center></td><td><center>" + strmin + ":" + strseg + "</center></td></tr>");

    strmin = mintotal;
    strseg = segtotal;

    if (strmin < 10) {
        strmin = "0" + strmin;
    }
    if (strseg < 10) {
        strseg = "0" + strseg;
    }
    $('#total').html(strmin + ":" + strseg)
}

function startAndStop() {
    if (!started) {
        $("#btnNext").show();
        $("#btnPause").show();

        $("#btnStart").addClass("btn-danger");
        $("#btnStart").removeClass("btn-success");
        $("#btnStart").html("<i class='fas fa-stop'> </i> Parar");


        console.log("Starting...");
        interval = setInterval(push, 1000);
        started = true;
    } else {
        if (confirm("Tem certeza que deseja encerrar a prova?")) {
            finish();
        }

    }

}

function finish() {
    clearInterval(interval);

    if (confirm("Prova finalizada com sucesso, deseja salvar as informações?")) {
        let strmin = mintotal;
        let strseg = segtotal;

        if (strmin < 10) {
            strmin = "0" + strmin;
        }
        if (strseg < 10) {
            strseg = "0" + strseg;
        }

        documento += "\n\nTEMPO DE PROVA FINAL -> " + strmin + " minutos e " + strseg + " segundos\n";

        let mediaSegundos = Math.floor(((mintotal * 60) + segtotal) / (qNum - 1));
        let mediaMinutos = Math.floor(mediaSegundos / 60);
        mediaSegundos = mediaSegundos % 60;

        strmin = mediaMinutos;
        strseg = mediaSegundos;

        if (strmin < 10) {
            strmin = "0" + strmin;
        }
        if (strseg < 10) {
            strseg = "0" + strseg;
        }

        documento += "\nTEMPO MÉDIO POR QUESTÃO -> " + strmin + " minutos e " + strseg + " segundos\n";


        var saveData = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (data, fileName) {
                blob = new Blob([data], { type: "octet/stream" }),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());

        var data = documento,
            fileName = "prova.txt";

        saveData(data, fileName);
    }
}

function push() {

    if (seg == 60) {
        seg = 0;
        min++;
    } else {
        seg++;
    }
    renderClock();
}

function renderClock() {
    let strmin = min;
    let strseg = seg;

    if (strmin < 10) {
        strmin = "0" + strmin;
    }
    if (strseg < 10) {
        strseg = "0" + strseg;
    }


    $(".clock").html(strmin + ":" + strseg);

}





function pause() {
    if (!paused) {
        console.log("Pausing...");
        clearInterval(interval);
        $('#btnPause').html("<i class='fas fa-play'> </i> Voltar");

        paused = true;


    } else {
        console.log("Starting...");
        interval = setInterval(push, 1000);
        $('#btnPause').html("<i class='fas fa-pause'> </i> Pausar");


        paused = false;

    }



}

$('body').keypress(function (e) {
    switch (e.which) {
        case 32: next(); break;
        case 112: pause(); break;
        case 13: startAndStop(); break;
    }
    console.log(e.which);
});
