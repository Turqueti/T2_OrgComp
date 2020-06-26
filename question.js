class Question{
    
    _question = '';
    get question() {
        return this._question;
    }
    set question(value) {
        this._question = value;
    }
    
    _image = '';
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
    }

    _correct = '';
    get correct() {
        return this._correct;
    }
    set correct(value) {
        this._correct = value;
    }

    _explanation = '';
    get explanation() {
        return this._explanation;
    }
    set explanation(value) {
        this._explanation = value;
    }

    _choices = [];
    get choices() {
        return this._choices;
    }
    set choices(value) {
        this._choices = value;
    }

    constructor(question,choices,image,correct,explanation){
        this.question = question;
        this._choices = choices;
        this.image = image;
        this.correct = correct;
        this.explanation = explanation;
    }

    createDOMelement(){
        let QuestionDiv = this.createElementHelper('div','Question-div','Question-div');
        

        //make question h3 DOM element and append it to the return div
        let Question = this.createElementHelper('h3','question','question');
        Question.textContent = this.question;
        QuestionDiv.appendChild(Question);
        
        //make img DOM element and append it to the return div
        let Image = this.createElementHelper('img','question-img','question-img');
        Image.setAttribute('src',this.image);
        if (this.Image == '') {
            Image.style.display = 'none';
        }
        QuestionDiv.appendChild(Image);

        //make a invisible p DOM element and append it to return div
        let explanation = this.createElementHelper('p','explanation','explanation');
        explanation.textContent = this.explanation;
        explanation.style.display = 'none';
        QuestionDiv.appendChild(explanation);

        //make a ul with all choices then append it to return div
        let choiceBlock = this.createElementHelper('ul','choice-block','choice-block');
        for (let i = 0; i < this.choices.length; i++) {
            let choice = this.createElementHelper('li',"choice-box",'btn'+i);
            if (this.correct == this.choices[i]) {
                choice.classList.add('X');
            }
            choice.classList.add('choice');
            choice.setAttribute('data-index',i);
            choice.textContent = this.choices[i];
            choiceBlock.appendChild(choice);      
        }
        QuestionDiv.appendChild(choiceBlock);
        return QuestionDiv;
    }

    createElementHelper(type, styleClass , id){
        var element = document.createElement(type);
        element.classList.add(styleClass);
        element.setAttribute('id',id);
        return element;
    }

    checkAwnser(usrInput){
        if (usrInput == this.correct) {
            return true;
        }
        return false;
    }

}

// var Frame = document.querySelector("#Frame");
// var questionJson = {
//     "question"      :   "Question: Who came up with the theory of relativity?",
//     "image"         :   "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
//     "choices"       :   [
//                             "Sir Isaac Newton",
//                             "Nicolaus Copernicus",
//                             "Albert Einstein",
//                             "Ralph Waldo Emmerson"
//                         ],
//     "correct"       :   "Albert Einstein",
//     "explanation"   :   "Albert Einstein drafted the special theory of relativity in 1905."
// }

// // var question = new Question(questionJson['question'],questionJson['choices'],questionJson['image'],questionJson['correct'],questionJson['explanation']);

// // var DOMquestion = question.createDOMelement();
// // Frame.appendChild(DOMquestion);