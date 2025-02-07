export const getData = async (url: string) => {
    const response = await fetch(`/Users/igorrangelkonvictus/crm/frontend/src/app/api/${url}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            
    }})
    if (!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to post data')
    }
    return response.json()
}


export const patchData = async (data:any , url:string) => {
    const response = await fetch (`/Users/igorrangelkonvictus/crm/frontend/src/app/api/${url}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to patch data')
    }
        return response.json()
    }
    export const postData = async (data: any, url: string) => {
        const fullUrl = `/app/api/${url}`;
        console.log("📌 Fazendo POST para:", fullUrl);
    
        try {
            const response = await fetch(fullUrl, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                console.error("❌ Erro na requisição:", response.status, response.statusText);
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Erro na API: ${response.status}`);
            }
    
            return await response.json();
        } catch (error) {
            console.error("🔥 Erro ao enviar os dados:", error);
            throw new Error( 'Falha na comunicação com o servidor.');
        }
    };

    export const deleteData = async(data:any, url:string) => {
        const response = await fetch(`/Users/igorrangelkonvictus/crm/frontend/src/app/api/${url}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to delete data')
        }
        return response.json()
    }