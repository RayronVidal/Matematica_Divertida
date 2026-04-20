document.addEventListener("DOMContentLoaded", function () {

    let num1 = document.getElementById("num1");
    let num2 = document.getElementById("num2");
    let sinalHTML = document.getElementById("sinal");
    let btnVerificar = document.getElementById("verificarConta");

    let CampoAcertos = document.getElementById("CampoAcertos");
    let CampoErros = document.getElementById("CampoErros");

    let Btn_reiniciar = document.getElementById("Btn_reiniciar");
    Btn_reiniciar.addEventListener("click", Reiniciar);

    let questoes = JSON.parse(localStorage.getItem("questoes")) || [];
    let indice = Number(localStorage.getItem("indice")) || 0;

    let atual = questoes[indice];

    let valor1 = atual.n1;
    let valor2 = atual.n2;
    let sinal = atual.op;

    let resultado = 0;

    // 🔥 MOSTRAR NA TELA
    if (num1) {
        num1.innerHTML = valor1;
        num2.innerHTML = valor2;

        if (sinal == "Adição") {
            resultado = valor1 + valor2;
            sinalHTML.innerHTML = "+";
        }
        else if (sinal == "Subtração") {
            resultado = valor1 - valor2;
            sinalHTML.innerHTML = "-";
        }
        else if (sinal == "Multiplicação") {
            resultado = valor1 * valor2;
            sinalHTML.innerHTML = "×";
        }
        else if (sinal == "Divisão") {
            resultado = valor1 / valor2;
            sinalHTML.innerHTML = "÷";
        }
    }

    // 🔥 CARREGAR DADOS SALVOS
    CampoAcertos.innerHTML = localStorage.getItem("acertos") || 0;
    CampoErros.innerHTML = localStorage.getItem("erros") || 0;

    atualizarAproveitamento();

    // EVENTO
    btnVerificar.addEventListener("click", Veriricar_resultado);

    function Veriricar_resultado() {

        let Input_resultado = Number(document.getElementById("Input_resultado").value);

        if (Input_resultado == Number(resultado.toFixed(2))) {

            let acertos = Number(localStorage.getItem("acertos")) || 0;
            acertos++;

            localStorage.setItem("acertos", acertos);
            CampoAcertos.innerHTML = acertos;

            document.body.style.backgroundColor = "lightgreen";

        } else {

            let erros = Number(localStorage.getItem("erros")) || 0;
            erros++;

            localStorage.setItem("erros", erros);
            CampoErros.innerHTML = erros;

            document.body.style.backgroundColor = "lightcoral";
        }

        // 🔥 ATUALIZA APROVEITAMENTO
        atualizarAproveitamento();

        // 🔥 PRÓXIMA QUESTÃO
        setTimeout(() => {
            proximaQuestao();
        }, 1000);
    }

    // 🔥 FUNÇÃO NOVA (CORRETA)
    function atualizarAproveitamento() {
        let campo = document.getElementById('CampoAproveitamento');

        let acertos = Number(localStorage.getItem("acertos")) || 0;
        let total = indice + 1;

        campo.innerHTML = `${acertos}/${total}`;
    }

    function proximaQuestao() {

        let indice = Number(localStorage.getItem("indice")) || 0;
        let questoes = JSON.parse(localStorage.getItem("questoes")) || [];

        indice++;

        if (indice >= questoes.length) {
            alert("🎉 Você terminou!");
            localStorage.removeItem("questoes");
            localStorage.removeItem("indice");
            return;
        }

        localStorage.setItem("indice", indice);

        location.reload();
    }

    function Reiniciar() {
        localStorage.removeItem("acertos");
        localStorage.removeItem("erros");
        localStorage.removeItem("indice");

        CampoAcertos.innerHTML = 0;
        CampoErros.innerHTML = 0;

        //window.location.href = "index.html";
        window.location.href = "../index.html";
    }

});