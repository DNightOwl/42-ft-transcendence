
import { checkToken } from '../Helpers';
export default function Tfa(){

    document.title = "Pong - 2FA";
    return (
        <form action="http://localhost:3001/Home">
            <input type="text" />
            <button type='submit'>Conferm</button>
        </form>
    )
}