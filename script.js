const campoTarefa = document.getElementById('campo-tarefa');
    const botaoAdicionar = document.getElementById('botao-adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');
    const contadorTarefas = document.getElementById('contador-tarefas');
    const botaoAlternarTema = document.getElementById('botao-alternar-tema');

    let totalDeTarefas = 0;
    
    function adicionarTarefa() {

        const textoTarefa = campoTarefa.value.trim();

        if (textoTarefa === '') {
            alert("digite algo");
            return;
        }

        const itemLista = document.createElement('li');
        itemLista.className = 'item-tarefa';
        itemLista.innerHTML = `
            <span>${textoTarefa}</span>

            <div class="acoes-tarefa">

                <button class="botao-acao concluir">
                    <i class="fa-regular fa-circle-check"></i>
                </button>

                <button class="botao-acao excluir">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        itemLista.querySelector('.concluir').addEventListener('click', () => {
            itemLista.classList.toggle('concluido');
            salvarTarefas();

        });

        itemLista.querySelector('.excluir').addEventListener('click', () => {
            itemLista.remove();
            totalDeTarefas--;
            atualizarContador();
            salvarTarefas();

        });


        listaTarefas.appendChild(itemLista);
        campoTarefa.value = '';
        totalDeTarefas++;
        atualizarContador();
        salvarTarefas();

    }

    function atualizarContador() {

        contadorTarefas.textContent =
            `${totalDeTarefas} ${totalDeTarefas === 1 ? 'tarefa' : 'tarefas'} na lista`;

    }

    function salvarTarefas() {

        const tarefas = [];

        document.querySelectorAll('.item-tarefa').forEach((item) => {
            tarefas.push({

                texto: item.querySelector('span').textContent,
                concluida: item.classList.contains('concluido')

            });

        });

        localStorage.setItem('tarefas', JSON.stringify(tarefas));

    }

    function carregarTarefas() {

        const tarefasSalvas =
            JSON.parse(localStorage.getItem('tarefas')) || [];


        tarefasSalvas.forEach((tarefa) => {

            const itemLista = document.createElement('li');
            itemLista.className = 'item-tarefa';


            if (tarefa.concluida) {
                itemLista.classList.add('concluido');
            }


            itemLista.innerHTML = `
                <span>${tarefa.texto}</span>

                <div class="acoes-tarefa">

                    <button class="botao-acao concluir">
                        <i class="fa-regular fa-circle-check"></i>
                    </button>

                    <button class="botao-acao excluir">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            `;


            itemLista.querySelector('.concluir').addEventListener('click', () => {
                itemLista.classList.toggle('concluido');
                salvarTarefas();

            });


            itemLista.querySelector('.excluir').addEventListener('click', () => {
                itemLista.remove();
                totalDeTarefas--;
                atualizarContador();
                salvarTarefas();
            });

            listaTarefas.appendChild(itemLista);
            totalDeTarefas++;
        });
        atualizarContador();
    }

    botaoAlternarTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-escuro');
        const iconeTema =
            botaoAlternarTema.querySelector('i');
        iconeTema.classList.toggle('fa-moon');
        iconeTema.classList.toggle('fa-sun');

        const modoEscuroAtivo =
            document.body.classList.contains('modo-escuro');

        localStorage.setItem(
            'modoEscuro',
            modoEscuroAtivo
        );

    });

    function carregarTema() {

        const modoEscuro =
            localStorage.getItem('modoEscuro');
        if (modoEscuro === 'true') {

            document.body.classList.add('modo-escuro');
            const iconeTema =
                botaoAlternarTema.querySelector('i');
            iconeTema.classList.remove('fa-moon');
            iconeTema.classList.add('fa-sun');

        }

    }
    botaoAdicionar.addEventListener(
        'click',
        adicionarTarefa
    );

    campoTarefa.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            adicionarTarefa();
        }

    });

    carregarTarefas();
    carregarTema();