var QuizTitle = "Titulo maneirão";
var Quiz = [
    {
        "question"      :   "Question: Who came up with the theory of relativity?",
        "image"         :   "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
        "choices"       :   [
                                "Sir Isaac Newton",
                                "Nicolaus Copernicus",
                                "Albert Einstein",
                                "Ralph Waldo Emmerson"
                            ],
        "correct"       :   "Albert Einstein",
        "explanation"   :   "Albert Einstein drafted the special theory of relativity in 1905."
    },
    {
        "question"      :   "Question: Who is on the two dollar bill?",
        "image"         :   "http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/US_%242_obverse-high.jpg/320px-US_%242_obverse-high.jpg",
        "choices"       :   [
                                "Thomas Jefferson",
                                "Dwight D. Eisenhower",
                                "Benjamin Franklin",
                                "Abraham Lincoln"
                            ],
        "correct"       :   "Thomas Jefferson",
        "explanation"   :   "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note."
    },
    {
        "question"      :   "Question: What event began on April 12, 1861?",
        "image"         :   "",
        "choices"       :   [
                                "First manned flight",
                                "California became a state",
                                "American Civil War began",
                                "Declaration of Independence"
                            ],
        "correct"       :   "American Civil War began",
        "explanation"   :   "South Carolina came under attack when Confederate soldiers attacked Fort Sumter. The war lasted until April 9th 1865."
    }

];

var currentquestion = 0, score = 0, submt=true, picked;

init(QuizTitle,Quiz);

function init(QuizTitle,Quiz) {
    var Frame = document.querySelector("#Frame");
    appendTitle(QuizTitle,Frame);
    
    var pager = document.createElement('p');
    pager.classList.add('pager');
    pager.setAttribute('id','pager');
    pager.textContent = 'questão 1 de ' + Quiz.length;
    Frame.appendChild(pager);

    var question = document.createElement('h3');
    question.classList.add('question');
    question.setAttribute('id','question');
    question.textContent = Quiz[0]['question'];
    Frame.appendChild(question);

    if (Quiz[0].hasOwnProperty('image') && Quiz[0]['image'] != "") {
        var image = document.createElement('img');
        image.classList.add('question-image');
        image.setAttribute('id','question-image');
        image.setAttribute('src',Quiz[0]['image']);
        image.setAttribute('alt',Quiz[0]['image']);        
        Frame.appendChild(image);
    }

    var explanation = criaElementoFacilitador('p','explanation','explanation');
    Frame.appendChild(explanation);

    var choiceBlock = criaElementoFacilitador('ul','choice-block','choice-block')
    Frame.appendChild(choiceBlock);
    addChoices(Quiz[0]['choices']);

    var submitBtn = criaElementoFacilitador('div','choice-box','submitbutton');
    submitBtn.textContent = '- CHECA RESPOSTA -';
    Frame.appendChild(submitBtn);    

    setupButons();
}

function addChoices(choices) {
    if (choices != undefined) {
        var choiceBlock = document.querySelector('#choice-block');
        choiceBlock.innerHTML = '';

        for (let i = 0; i < choices.length; i++) {
            var btntemp = criaElementoFacilitador('li',"choice-box",'btn'+i);
            btntemp.classList.add('btn');
            btntemp.classList.add('choice');
            btntemp.setAttribute('data-index',i);
            btntemp.textContent = choices[i];
            choiceBlock.appendChild(btntemp);

            
        }
    }
    
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

function setupButons(){
    var btns = document.querySelectorAll('.choice');
    for (btn of btns) {
        btn.addEventListener('click',function(){
            picked = this.getAttribute('data-index');
            
            //tira o css de todos os elementos
            btns.forEach(function(element){element.style.cssText = ''});
            //coloca uma borda verde no selecionado
            this.style.cssText = "font-weight:bold; border-color:#51a351; color:#51a351";

        })

    }
    var submtbtn = document.querySelector('#submitbutton');
    submtbtn.addEventListener('click',function(){
        processQuestion(picked);
    });
    
    
   
}

function processQuestion(choice) {
    var respUser = Quiz[currentquestion]['choices'][choice];
    var respCerta = Quiz[currentquestion]['correct'];

    var explicacao = document.querySelector('#explanation');
    var btnescolhido = document.querySelector('#btn'+choice);
    // console.log(btnescolido);

    if (respUser == respCerta) {
        btnescolhido.classList.add('btn-success');
        btnescolhido.style.cssText = "font-weight:bold; border-color:#51a351; color:#fff";
        explicacao.style.display='block';
        explicacao.innerHTML='<span class="correct">CORRECT!</span> ' + Quiz[currentquestion]['explanation'];
        score++;
    }else{
        btnescolhido.classList.add('btn-danger');
        btnescolhido.style.cssText="font-weight:bold; border-color:red; color:#fff";
        
        explicacao.style.display='block';
        explicacao.innerHTML='<span class="incorrect">INCORRECT!</span> ' + Quiz[currentquestion]['explanation'];
    }
    

    if (currentquestion < Quiz.length) {
        var submtbtn = document.querySelector('#submitbutton');
        submtbtn.textContent = "PRÓXIMA PERGUNTA";
        submtbtn.addEventListener('click',function(){
            currentquestion++;
            explicacao.style.display='none';
            nextQuestion();
        });

    }
}

function nextQuestion() {
    var question = document.querySelector("#question");
    var pager = document.querySelector("#pager");

    question.textContent =  Quiz[currentquestion]['question'];

    atualizaPager(pager);
    atualizImagem();
    addChoices(Quiz[currentquestion]['choices']);
    setupButons();

}

function atualizaPager(Pager) {
    pager.textContent = 'Question ' + currentquestion + ' of ' + Quiz.length;
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