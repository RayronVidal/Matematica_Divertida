document.addEventListener("DOMContentLoaded", function () {

    let Btn_Pegar_valores = document.getElementById('btn_start');
    Btn_Pegar_valores.addEventListener('click', Pegar_Operacoes);

    const Operacoes = [
        { nome: "Adição", ativo: false },
        { nome: "Subtração", ativo: false },
        { nome: "Multiplicação", ativo: false },
        { nome: "Divisão", ativo: false }
    ];

    const Nivel = [
        { nome: "facil", ativo: false },
        { nome: "dificil", ativo: false }
    ];

    let Escolhas = [];

    function Pegar_Operacoes() {

        Operacoes[0].ativo = document.getElementById('add').checked;
        Operacoes[1].ativo = document.getElementById('sub').checked;
        Operacoes[2].ativo = document.getElementById('mult').checked;
        Operacoes[3].ativo = document.getElementById('divis').checked;

        Nivel[0].ativo = document.getElementById('facil').checked;
        Nivel[1].ativo = document.getElementById('dificil').checked;

        Verificar_Escolhas();
    }

    function Verificar_Escolhas() {

        Escolhas = []; // 🔥 limpa antes de adicionar

        for (let i = 0; i < Operacoes.length; i++) {
            if (Operacoes[i].ativo) {
                Escolhas.push(Operacoes[i].nome);
            }
        }

        // validações
        if (Escolhas.length === 0) {
            alert("Escolha pelo menos uma operação!");
            return;
        }

        if (!Nivel[0].ativo && !Nivel[1].ativo) {
            alert("Escolha um nível!");
            return;
        }

        console.log("Operações:", Escolhas);
        Gerar_Contas();
    }

    function Gerar_Contas() {

        let questoes = [];

        for (let i = 0; i < 5; i++) {

            let operacao = Escolhas[Math.floor(Math.random() * Escolhas.length)];

            let numero1, numero2; // 🔥 fora do if

            // nível
            if (Nivel[0].ativo) {
                numero1 = Math.floor(Math.random() * 10);
                numero2 = Math.floor(Math.random() * 10);
            }
            else if (Nivel[1].ativo) {
                numero1 = Math.floor(Math.random() * 90) + 10;
                numero2 = Math.floor(Math.random() * 90) + 10;
            }

            // evitar negativo na subtração
            if (operacao === "Subtração" && numero1 < numero2) {
                [numero1, numero2] = [numero2, numero1];
            }

            // corrigir divisão
            if (operacao === "Divisão") {
                if (numero2 === 0) numero2 = 1;

                // garante divisão exata
                numero1 = numero1 * numero2;
            }

            questoes.push({
                n1: numero1,
                n2: numero2,
                op: operacao
            });
        }

        localStorage.setItem("questoes", JSON.stringify(questoes));
        localStorage.setItem("indice", 0);

        window.location.href = "src/Questao.html";
    }

});