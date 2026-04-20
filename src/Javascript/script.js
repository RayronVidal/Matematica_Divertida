document.addEventListener("DOMContentLoaded", function () {

    let Btn_Pegar_valores = document.getElementById('btn_start');
    Btn_Pegar_valores.addEventListener('click', Pegar_Operacoes);

    const Operacoes = [
        { nome: "Adição", ativo: false },
        { nome: "Subtração", ativo: false },
        { nome: "Multiplicação", ativo: false },
        { nome: "Divisão", ativo: false }
    ];

    const Escolhas = [];

    function Pegar_Operacoes() {

        Operacoes[0].ativo = document.getElementById('add').checked;
        Operacoes[1].ativo = document.getElementById('sub').checked;
        Operacoes[2].ativo = document.getElementById('mult').checked;
        Operacoes[3].ativo = document.getElementById('divis').checked;

        Verificar_Escolhas();

        //window.location.href = "src/Questao.html";
    };

    function Verificar_Escolhas() {
        for (let i = 0; i < Operacoes.length; i++) {
            if (Operacoes[i].ativo) {
                Escolhas.push(Operacoes[i].nome);
                //alert("Fazer " + Operacoes[i].nome);
            }
        }
        console.log(Escolhas);
        Gerar_Contas()
    };


    function Gerar_Contas() {

        if (Escolhas.length === 0) return;

        let questoes = [];

        for (let i = 0; i < 5; i++) {

            let operacao = Escolhas[Math.floor(Math.random() * Escolhas.length)];

            let numero1 = Math.floor(Math.random() * 10);
            let numero2 = Math.floor(Math.random() * 10);

            /*if (operacao === "Subtração" && numero1 < numero2) {
                [numero1, numero2] = [numero2, numero1];
            }*/

            if (operacao === "Divisão" && numero2 === 0) {
                numero2 = 1;
            }

            questoes.push({
                n1: numero1,
                n2: numero2,
                op: operacao
            });
        }

        // salva todas as questões
        localStorage.setItem("questoes", JSON.stringify(questoes));

        // começa na questão 0
        localStorage.setItem("indice", 0);

        window.location.href = "src/Questao.html";
    };


});