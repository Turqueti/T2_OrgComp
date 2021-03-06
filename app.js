var QuizTitle = "Quiz Game OrgComp";
// var Quiz = [];

var currentquestion = 0;
var score = 1;



fetch('./Perguntas.json')
    .then(response => 
        {
            console.log(response);
            return response.json();
        }
    )
    .then(parsed => {
        console.log(parsed);
        Quiz = parsed;
        QuizHandler();
    });



function QuizHandler(){
    
    console.log(score);

    if (currentquestion < Quiz.length) {
        
        QuestionHandler(currentquestion,Quiz);
        currentquestion++;
        
    }else{
        FinishQuizSetFinishDOM();
    }
}


function QuestionHandler(currentquestion,Quiz) {
    SetDOM(currentquestion,Quiz.length);
    selectOption();

    let submtbtn = document.querySelector('#submitbutton');
    submtbtn.addEventListener('click',function(){

        if (this.classList.contains('Next-Question')) {
            clearDom();
            QuizHandler(); 
            // QuestionHandler(currentquestion+1,Quiz);
            submtbtn.classList.remove('Next-Question');
            
            

        }else{
            CheckAwnser(Quiz,currentquestion);
            submtbtn.textContent = 'próxima pergunta';
            submtbtn.classList.add('Next-Question');
        }
        


    });

}

function clearDom() {
    let Frame = document.querySelector("#Frame");
    Frame.innerHTML = '';
}

function CheckAwnser(Quiz,currentquestion) {
    let opt = document.querySelector(".selected");
    let correct = document.querySelector(".X");
    let chosen = opt.getAttribute('data-index');
    let explicacao = document.querySelector('#explanation');

    
    explicacao.style.display='block';

    if (Quiz[currentquestion]['choices'][chosen] == Quiz[currentquestion]['correct']) {
        opt.classList.add('correct');
        explicacao.innerHTML='<span class="correct">CORRECT!</span> ' + Quiz[currentquestion]['explanation'];
        score++;
    }else{
        opt.classList.remove('selected');
        opt.classList.add('incorrect');
        correct.classList.add('correct');
        explicacao.innerHTML='<span class="incorrect">INCORRECT!</span> ' + Quiz[currentquestion]['explanation'];
    }
    
}

function SetDOM(currentquestion,QuizLength) {
    let Frame = document.querySelector("#Frame");
    appendTitle(QuizTitle,Frame);
    
    let pager = atualizaPagerDOM(currentquestion,QuizLength);
    Frame.appendChild(pager);

    let questionJson = Quiz[currentquestion];
    let question = new Question(questionJson['question'],questionJson['choices'],questionJson['image'],questionJson['correct'],questionJson['explanation']);

    let questionDOM = question.createDOMelement();
    Frame.appendChild(questionDOM);

    let submitBtn = criaElementoFacilitador('div','choice-box','submitbutton');
    submitBtn.textContent = '- CHECA RESPOSTA -';
    Frame.appendChild(submitBtn);
}

function criaElementoFacilitador(tipo,classe,id) {
    var elemento = document.createElement(tipo);
    elemento.classList.add(classe);
    elemento.setAttribute('id',id);
    return elemento;
}

function appendTitle(QuizTitle,Frame) {
    
    if (QuizTitle == undefined) {
        QuizTitle = "Quiz"
    }

    var Title = document.createElement("h2");
    Title.textContent = QuizTitle;

    Frame.appendChild(Title);

}

function selectOption(){
    let btns = document.querySelectorAll('.choice');
    for (btn of btns) {
        btn.addEventListener('click',function(){
            //tira a classe selected de todos os elementos
            btns.forEach(function(element){element.classList.remove('selected')});
            //coloca a classe selected no selecionado
            this.classList.add('selected');
        })

    }
}

function atualizaPagerDOM(currentquestion,QuizLength) {
    let pager = document.createElement('p');
    pager.textContent = 'Questão ' + (currentquestion + 1) + ' de ' + QuizLength;
    return pager;
}

function atualizImagem() {
    var Imagem = document.querySelector('#question-image');
    if (Quiz[currentquestion].hasOwnProperty('image') && Quiz[currentquestion]['image'] != '' ) {
        if (Imagem.style.display == 'none') {
            Imagem.style.display = 'block';
        }
        
        Imagem.setAttribute('src',Quiz[currentquestion]['image']);
    }else{
        Imagem.style.display = 'none';
    }
}

function FinishQuizSetFinishDOM(){
    let Frame = document.querySelector("#Frame");


    let divFim = criaElementoFacilitador('div','div-Fim','div-Fim');

    let scorediv = criaElementoFacilitador('h3','Score','Score');
    scorediv.classList.add('acertos')
    scorediv.textContent = 'Você acertou ' + score + ' de ' + Quiz.length;
    divFim.appendChild(scorediv);

    let percentage = criaElementoFacilitador('h4','score','score');
    percentage.textContent = Math.round(score/Quiz.length * 100) + '%';
    divFim.appendChild(percentage);

    Frame.append(divFim);

}