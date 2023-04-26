import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface LoginPageProps{
    loadingSetter: Dispatch<SetStateAction<boolean>>
}   

const LoginPage: FunctionComponent<LoginPageProps> = () =>{
    
    return (
        <div className="LoginPage">
            <form onSubmit={(event)=>{
                event.preventDefault();
                console.log('login')
            }}>
                <input type="text" placeholder="email"></input>
                <input type="password" placeholder="senha"></input>
                <button type="submit">entrar</button>
                <a href="/signup"><button type="button">cadastrar</button></a>
            </form>
        </div>
    )
}

export default LoginPage;