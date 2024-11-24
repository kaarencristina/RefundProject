//selecionando os elementos
const form=document.querySelector("form")
const amount=document.getElementById("amount")
const expense=document.getElementById("expense")
const category=document.getElementById("category")


//seleciona os elementos da lista

const expenseList=document.querySelector("ul")
const expensesQuantity=document.querySelector("aside header p span")

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
// add um novo item na lista
const expenseADD = (NewExpense) => {
    try {
        //cria o elemento de li para add o item na lista(ul)
        const expenseItem=document.createElement("li")
        expenseItem.classList.add("expense")// add a classe na li


        //cria o icone da categoria
        const expenseIcon=document.createElement("img")
        expenseIcon.setAttribute("src",`img/${NewExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", NewExpense.category_namee)

        //cria a info da despesa
        const expenseInfo=document.createElement("div")
        expenseInfo.classList.add("exense-info")

        //criar o nome da despesa
        const expenseName=document.createElement("strong")
        expenseName.textContent=NewExpense.expense

        //cria a categoria da despesa
        const expenseCategory=document.createElement("span")
        expenseCategory.textContent=NewExpense.category_namee

        //add name e category na div das informacooes da despesa
        expenseInfo.append(expenseName,expenseCategory)


        //cria o valor da despesa
        const expenseAmount=document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML=`<small>R$</small>${NewExpense.amount.toUpperCase().replace("R$","")}`

        //cria o icone de remover
        const removeIcon=document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src","img/remove.svg")
        removeIcon.setAttribute("alt", "remover")


        //add as informacoes no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        //add o item na lista
        expenseList.append(expenseItem)

        //atualiza os totais
        updateTotals()
    } catch (error) {
        alert("não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
};

const updateTotals=()=>{
    try {
        // recupera os itens da lista
        const items=expenseList.children
        //atualiza a qtd de itens da lista
        expensesQuantity.textContent=`${items.length} ${items.length>1?"despesas": "despesa"}`
    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais")
    }
}