import { isRouteErrorResponse, useRouteError } from "react-router-dom";

    export default function equipamentBoundary(){
        const error = useRouteError()

        ///se for erro de resposta de rota 404, 401, 500...
        if(isRouteErrorResponse(error)){
            switch(error.status){
                case 404:
                    return <h2>Oops... Usuário não encontrado =(</h2>
                case 401:
                    return <h2>Você não está autorizado a ver essa página.</h2>
                case 400:
                    return <h2>Parece que algo deu errado na requisição</h2>
                case 500:
                    return <h2>Erro interno no servidor</h2>
            }
        }
        return  <h2>Algo deu errado.</h2>
    }