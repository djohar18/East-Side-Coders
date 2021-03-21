function typeChanged(element) {

    // get elements 
    let selected = element.value;
    let questionDiv = document.getElementById("questionDiv");
    let optionDiv = document.getElementById("optionDiv");
    let textAnswerDiv = document.getElementById("textAnswerDiv");

    let options = document.getElementById("options");
    let addOptionBtn = document.getElementById("addOption");
    let removeOptionBtn = document.getElementById("removeOption");

    // display configuration
    if (selected === "Agree or Disagree") {
        questionDiv.style.display = "block";
        optionDiv.style.display = "none";
        textAnswerDiv.style.display = "none";
    } else if (selected === "MCQ") {
        questionDiv.style.display = "block";
        optionDiv.style.display = "block";
        textAnswerDiv.style.display = "none";
    } else if (selected === "Text") {
        questionDiv.style.display = "block";
        optionDiv.style.display = "none";
        textAnswerDiv.style.display = "block";
    }

    // add option
    addOptionBtn.onclick = function () {
        let newOption = document.createElement("input");
        newOption.setAttribute("type", "text");
        newOption.setAttribute("name", "options[]");
        newOption.setAttribute("class", "survey");
        options.appendChild(newOption);
    }

    // remove option
    removeOptionBtn.onclick = function () {
        let inputChildren = options.getElementsByTagName('input');
        if (inputChildren.length >= 2) {
            options.removeChild(inputChildren[inputChildren.length - 1]);
        }
    }

}