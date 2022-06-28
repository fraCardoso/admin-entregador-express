import Script from 'next/script'

export default function Layout(props) {
      
    return (
        <div className={`flex h-screen w-screen`}>           
            <div className={`
                flex flex-col w-full h-full  
                bg-gray-300 dark:bg-gray-800 
            `}>
               
                <hr/>
                <div className={`
                    flex flex-col mt-4
                    dark:text-gray-200 p-2
                `}>
                    {props.children}
                    <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0QDt6SPY2NE6wCAxVhA2cupgqnVRGFUE&libraries=places"></Script>
                </div>
            </div>
        </div>
    )
       
}