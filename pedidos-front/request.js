export default async function (url){
    const request = new Request(url) 
    return fetch(request)
    .then(response => {
        if(response.status == 200){
            return response.json();
        }else{
            throw new Error('Ops... error')
        }        
    });
}