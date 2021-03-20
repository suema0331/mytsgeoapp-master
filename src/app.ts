import axios from "axios";
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = "AIzaSyCN5b--2LyEBFYTYPgtnNyicwxDWAYW3qo";

type GoogleGeocoadingResponse ={
    results: {geometry: {location: {lat: number, lng:number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
};

//googleを明示的に教える
//declare var google:any;

function serchAddressHandler(event : Event){
    event.preventDefault(); //HTTPリクエストを受け取らない
    const enteredAddress = addressInput.value;

    //GoogleApiに送信 3rdParthを使う
    //fetch()の代わりにaxiosでHTTPリクエストを送る

    axios.get<GoogleGeocoadingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress,
        )}&key=${GOOGLE_API_KEY}`,
    ).then(response =>{

        if (response.data.status !=='OK'){
            throw new Error('座標を取得できませんでした。。')
        }
        console.log(response);
        const coordinates = response.data.results[0].geometry.location;


        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 16,

        });
        new google.maps.Marker({position: coordinates, map: map,});

    })
        .catch(err =>{
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit',serchAddressHandler);