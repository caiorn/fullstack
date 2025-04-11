export default function loadEquipament({params}) {   
    console.log("string param:" + params.equipamentId);

    //simulando resposta servidor para testar error boundary
    if(!params){
        throw new Response('404 Not found porra', {status: 404})
    }

    //retorna o parametro para poder usar em useLoadData()
    return params
}