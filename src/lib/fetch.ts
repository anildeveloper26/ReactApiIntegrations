export default async function GetApi (){
    const response = await fetch('https://v2-dev-api.esigns.io/v1.0/company-document-responses-v2?page=1&limit=25&company_id=678a080088cd760d7bd74a82',{
    method: 'GET',
    headers: {'Content-Type': 'application/json',
        "Authorization":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OGEwODAwODhjZDc2MGQ3YmQ3NGE4OSIsImVtYWlsIjoicHJhc2FudGgubUBvcm90cm9uLmNvbSIsImlhdCI6MTc1ODI4MjI5MSwiZXhwIjoxNzU4MzY4NjkxfQ.5j36TKgumHQFUle2izWEzFpHvt51Vrmcdy-OrEvkyCc',
    },
})

if(!response){
    throw new Error('Failed to fetch data')
}
return response.json()

}