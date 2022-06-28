import React,{ useState, useRef, useContext, useEffect } from 'react';
import { AppContext } from '../config/AppContext'
import { getAuth, updateProfile } from "firebase/auth";

export default function AdfFrete() {  
    const { user, addfrete } = useContext(AppContext);
    const [name, setName] = useState('');   
    const placeInputRef = useRef(null);
    const [formPgt, setFormPgt] = useState('dinheiro');    
    const [priceFixe, setPriceFixe] = useState(3.5);
    const [price, setPrice] = useState(0);
    const [distance, setDistance] = useState(0);
    const [rota, setRota] = useState([{
        location: '',
        number: '',
        instrucao: ''
        
    }]);

    const resetForm = () => {
       window.location.reload();
    }

    useEffect(()=>{
        if(user.displayName){
            setName(user.displayName)
        }
    },[user])

    
    const atualizar = () =>{
        return somarValor().then(resultSum =>{
            setPrice(resultSum + (priceFixe * rota.length ))            
        }).then(()=>{
            somarDistancia().then(resultSum =>{
                setDistance(resultSum)            
            })
        })
    }

    //soamando o valor do pontos
    const formLocation = () =>{
        return new Promise((resolve, reject) => {            
            let origin = rota[rota.length-2].location;
            let destination = rota[rota.length-1].location;
            const distance = new window.google.maps.DistanceMatrixService();
            distance.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: window.google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
          },response => resolve(response))          
        })
    }
    
    // criando novo formulario
    const newInputRota = ()=>{        
        setRota([...rota, ''])        
    }
    
    // excluir formulario
    const handleRemoveRota = (position)=>{
       setRota([...rota.filter(( _, index ) => index != position)])     
    }

    const handleChange = (e,index) =>{  
       //chamndo a funçâo autocomplete e setandos os valores nop array rota
        initPlaceAPI().then(result =>{             
            const rotaItem = {                
                location: result.formatted_address,               
                number: '',
                instrucao: '',
                price: 0,
                tempo: '',
                distance: 0,
                position:{
                    latitude: result.geometry.location.lat(),
                    longitude: result.geometry.location.lng(),
                },            
                finalTime: '',
                protocolo:'',                  
                status: ''                                
            } 
            rota[index] = rotaItem   
            setRota([...rota])
        });

        let item = rota[index].number 
        let campo = e.target.name
                
        //setando valores dos inputs number e instrucao
        if(item != undefined){
            switch(campo){
                case 'number' : rota[index].number = e.target.value; break;
                case 'instrucao' : rota[index].instrucao = e.target.value; break;
            }                     
        }

        //chamando a funçao de somar e setando os valores no array rota
    if(index>0){
        formLocation().then((result)=>{            
            let pricePerKM = 1.15       	
            let distance = result.rows[0].elements[0].distance.value; 
            var tempo = result.rows[0].elements[0].duration.value;                  
            rota[index].price = (distance/1000)* pricePerKM
            rota[index].distance = (distance/1000)* 1
            rota[index].tempo = tempo           
        })
    }
        atualizar()
    } 
    const somarValor = () =>{
        return new Promise((resolve, reject) => {
            let numbers = rota.map((r)=> r.price )           
            let sum = numbers.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            });
            resolve(sum)
        })
    }

    const somarDistancia = () =>{
        return new Promise((resolve, reject) => {
        let numbers = rota.map((r)=> r.distance )           
        let sum = numbers.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        });
        resolve(sum)
    })
        
    }   

    // buscando o autocomplete
    const initPlaceAPI = () => {  
        return new Promise( (resolve, reject) => {           
        let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
        autocomplete.setComponentRestrictions({country:'br'});        
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
        let place = autocomplete.getPlace();            
        resolve(place)        
        });       
        });
    } 

    async function displayName() {
        const auth = getAuth();
        return await  updateProfile(auth.currentUser, {
            displayName: name
         }).then(()=>{
            resetForm();
         })      
    }

    const Enviar = () => {
       return(
       <div className='container mb-5'>
            <div className='row'>
            <input                                                     
                onChange={(e)=> setName(e.target.value)}    
                value={name}      
                type="text"
                className="form-input mt-1 block w-full px-4 py-4 
                border-solid border-2 border-gray-300 mt-5" 
                placeholder="Informe seu nome"
            />
            </div>
            <button onClick={()=> addfrete(user.uid,price,distance,formPgt,rota)} 
            className="bg-green-400 hover:bg-green-800
                text-white px-4 py-4 mt-2 w-full">
                    {rota.length < 2 ? '' : <>Confirmar frete</>}
            </button>
         </div>
       ) 
    }
    
    return (
        <div className="app-container container">
            {user.displayName ? <>
            <div className="font-bold text-xl mb-2 mt-3">Para chamar um entregador.</div>         
            <div className="app-top">                                             
                {rota.map((rote, index)=>(
                <div  key={index} className="text-left mb-2 mt-3 text-neutral-500">                                              
                    {index === 0 ? <>Adicione Endereço de coleta:</>:<>Endereço de destino {index}: </>}
                    <div className="container">
                        <div className="row">
                            
                            <input
                                ref={placeInputRef}                                               
                                onChange={(e)=> handleChange(e,index)}    
                                name="location"
                                type="text"
                                className="form-input mt-1 block w-full px-4 py-4 border-solid border-2 border-gray-300" 
                                placeholder="Endereço de coleta"
                            />
                          
                        
                            <input                                            
                                onChange={(e)=> handleChange(e,index)}    
                                name="number"
                                type="text"
                                className="form-input mt-1 block w-full px-4 py-4 border-solid border-2 border-gray-300" 
                                placeholder="Complemento bloco/casa/apart..."
                            />
                        </div>                
                        <div className="row">                                
                            <textarea 
                                onChange={(e)=> handleChange(e,index)}    
                                name="instrucao"
                                type="text"
                                className="form-input mt-1 block w-full px-4 py-4 border-solid border-2 border-gray-300" 
                                placeholder="O que fazer neste local?"
                            />                                                       
                        </div>
                                            
                        <div className="text-red-500 mt-2">                  
                            {index > 0 && <a onClick={()=>{handleRemoveRota(index)}} href="#">
                                Excluir este ponto?</a>}
                        </div>   
                    </div>
                </div>
                ))}
                <div className="mt-5">
                    {price > 0 &&                                
                    <div className="box-buttom">
                        <div className="div">Distãncia: <span> {distance}</span> KM
                            <div className="linha-vertical"></div>
                        </div>
                        <div className="div">Pontos: <span> {rota.length}</span>
                            <div className="linha-vertical"></div>
                        </div> 
                        <div className="div">Valor: <span> R${price.toFixed(2)}</span>
                            <div className="linha-vertical"></div>
                        </div>                                                     
                    </div>  
                    }                                                                                            
                </div>                 
                <div className="mt-2 text-right mb-5 mt-5"> 
                    <hr/>                      
                    
                        <a href='#' onClick={()=> resetForm()} className="
                        bg-red-500 hover:bg-red-800
                        text-white px-4 py-4 mt-6">cancelar</a>
                  
                    {rota[0].location != '' && <>
                        {rota.length < 5 && <a className="
                        bg-orange-500 hover:bg-orange-800
                        text-white px-4 py-4 mt-6 ml-2" onClick={newInputRota} href="#prm">
                            + ponto</a>}                        
                        {rota.length === 5 && <div className='text-orange-500 mt-3'>*Esta rota está com o limite de pontos</div>}
                    </>}
                    
                </div>
                {price > 3.5 && <Enviar />}
                <div className="espaco-bar"></div>
                <div className="proximo" id="prm"></div>
            </div> 
           </> :   
            <div className='container mb-5'>
                <div className='row'>
                <input                                                     
                    onChange={(e)=> setName(e.target.value)}                 
                    type="text"
                    className="form-input mt-1 block w-full px-4 py-4 
                    border-solid border-2 border-gray-300 mt-5" 
                    placeholder="Informe seu nome"
                />
                </div>
                <button onClick={()=> displayName()} className="
                    bg-green-400 hover:bg-green-800
                    text-white px-4 py-4 mt-2 w-full">
                        Adicionar seu nome
                </button>
            </div> }
        </div>
    )
}