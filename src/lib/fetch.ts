const baseUrl = import.meta.env.VITE_BASE_URL

export default async function GetApi (){
    const response = await fetch(`${baseUrl}/company-document-responses-v2?page=1&limit=25&company_id=678a080088cd760d7bd74a82 `,{
    method: 'GET',
    headers: {'Content-Type': 'application/json',
        "Authorization":`${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
})

if(!response){
    throw new Error('Failed to fetch data')
}
return response.json()
}