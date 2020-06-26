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

let currentquestion = 0, score = 0;

QuestionHandler(currentquestion,Quiz);

function QuestionHandler(currentquestion,Quiz) {
    SetDOM(currentquestion,Quiz.length);
    selectOption();

    let submtbtn = document.querySelector('#submitbutton');
    submtbtn.addEventListener('click',function(){

        if (this.classList.contains('Next-Question')) {
            clearDom();
            submtbtn.classList.remove('Next-Question');
            QuestionHandler(currentquestion+1,Quiz);

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
    console.log(opt);
    let chosen = opt.getAttribute('data-index');
    let explicacao = document.querySelector('#explanation');

    
    explicacao.style.display='block';

    if (Quiz[currentquestion]['choices'][chosen] == Quiz[currentquestion]['correct']) {
        opt.classList.add('correct');
        explicacao.innerHTML='<span class="correct">CORRECT!</span> ' + Quiz[currentquestion]['explanation'];
        score++;
    }else{
        opt.classList.add('incorrect');
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