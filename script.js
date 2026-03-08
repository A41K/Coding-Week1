const button = document.querySelector(".bleh")
const progress = document.querySelector("progress")
const calculator = document.querySelector(".input")

counter = 0

button.addEventListener("click", () => {
    button.textContent = "Clicked!"
    counter += 1
    progress.value = counter * 5
    if (counter == 5){
        button.textContent = ("Really Clicked")
        button.style.backgroundColor= "blue"
    }
    if (counter == 10){
        button.textContent = ("Really Really Clicked")
        button.style.backgroundColor= "purple"
    }
    if (counter == 20){
        button.textContent = ("Seriously Really Really Clicked")
        button.style.backgroundColor = "orange"
    }
    if (counter == 30){
        button.textContent = ("You are really really really really clicking")
        button.style.backgroundColor = "red"
    }
    if (counter == 40){
        button.textContent = ("You are really really really really really clicking")
        button.style.backgroundColor = "green"
    }
    if (counter == 50){
        button.textContent = ("You are really really really really really really clicking")
        button.style.backgroundColor = "yellow"
    }
    if (counter == 60){
        button.textContent = ("You are really really really really really really really clicking")
        button.style.backgroundColor = "black"
    }
    if (progress.value == 250){
        document.querySelector(".win").style.display = "block"
    }
})

calculator.addEventListener("input", () => {
    calculator.value = calculator.value.replace(/[^0-9+\-*/().]/g, "")
})

calculator.addEventListener("change", () => {
    try {
        const result = eval(calculator.value)
        if (result !== undefined) {
            calculator.value = result
        }
    } catch (e) {
        calculator.value = "Error"
    }
})
