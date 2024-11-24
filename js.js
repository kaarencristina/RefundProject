//selecionando os elementos
const form=document.querySelector("form")
const amount=document.getElementById("amount")
const expense=document.getElementById("expense")
const category=document.getElementById("category")


//seleciona os elementos da lista

const expenseList=document.querySelector("ul")

amount.oninput=()=>{
    let value=amount.value.replace(/\D/g,"")

    //tranformar o valor em centavos
    value=Number(value)/100

    //remover letras do input
   amount.value=formatCurrencyBR(value)
}

function formatCurrencyBR(value){
//formatar para real
value=value.toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL",
})

return value

}

form.onsubmit=(event)=>{ //captura o evento de submit do form
    event.preventDefault()// previne recarregar a pag


    //cria o obj com os detalhes da despesa
    const NewExpense={
        id:new Date().getTime(),
        expense:expense.value,
        category_id:category.value,
        category_namee:category.options[category.selectedIndex].text,
        amount:amount.value,
        created_at:new Date()
    }
    //chama a funcao que ira add o item do objeto na lista
    expenseADD(NewExpense)
}

const expenseADD = (NewExpense) => {
    try {
        //cria o elemento de li para add o item na lista(ul)
        const expenseItem=document.createElement("li")
        expenseItem.classList.add("expense")// add a classe na li


        //cria o icone da categoria
        const expenseIcon=document.createElement("img")
        expenseIcon.setAttribute("src",`img/${NewExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", NewExpense.category_namee)


        //add as informacoes no item
        expenseItem.append(expenseIcon)
        //add o item na lista
        expenseList.append(expenseItem)
    } catch (error) {
        alert("não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
};