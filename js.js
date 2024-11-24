const amount=document.getElementById("amount")

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