import { useState, useContext} from 'react'
import NumberFormat from 'react-number-format'
import { getAuth, RecaptchaVerifier } from "firebase/auth"
import { app } from '../config/firebase'
import  { AppContext } from '../config/AppContext'


const auth = getAuth();

export default function Signin() {
    const {user} = useContext(AppContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVisivel, setIsVisivel] = useState(false); 
    const [code, setCode] = useState('');

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        }, auth); 
    }

  async function requestOTP(e) {
        e.preventDefault();
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier
        await app.auth().signInWithPhoneNumber(phoneNumber,appVerifier)
        .then((confirmationResult) => {
            setIsVisivel(true);
            window.confirmationResult = confirmationResult;
          }).catch((error) => {
           console.log(error)
          });
    }

    const verificar = () => {
        confirmationResult.confirm(code).then((result) => {
            const user = result.user;
          }).catch((error) => {
           
          });
          
    }
    

    
    
        

    return(
        <div className="px-2 py-4">            
            <div className="mt-5">
               {!isVisivel ?<>
                <div className="font-bold text-xl mb-2">Olá! tudo bem,<br/> Chame um entregador de forma rápida e segura.</div>            
                <NumberFormat
                    onChange={(e)=> setPhoneNumber(e.target.value)}
                    format="+55 ## ##### ####" 
                    type="text"
                    className="form-input mt-1 block w-full px-4 py-4" 
                    placeholder="Informe seu celular"
                />
                 <button 
                    onClick={requestOTP}
                    className="bg-green-400 hover:bg-green-800 w-full
                    text-white px-4 py-3 mt-2">
                    Avançar
                </button></>:<>
                <div className="font-bold text-xl mb-2">Confira o código em seu celular.</div>           
                <input  
                    onChange={(e)=> setCode(e.target.value)}                  
                   className="form-input mt-1 block w-full px-4 py-4"
                    type="text" 
                    placeholder="Confirme o código"
                />
                <button 
                    onClick={verificar}
                    className="bg-green-400 hover:bg-green-800 w-full
                    text-white px-4 py-4 mt-2">
                    Confirmar
                </button>
                 </>}                        
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
}