export const getData = async (url: string) => {
    const response = await fetch(`/app/api/${url}`,{
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
    const response = await fetch (`/app/api/${url}`,{
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
export const listData = async (data:any , url:string) => {
    const response = await fetch (`/app/api/${url}`,{
        method: 'LIST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

export const postData = async (data: any, url: string) => {
    try {
        const response = await fetch(`/api/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Se a resposta NÃO estiver OK, capturamos o erro com status adequado
        if (!response.ok) {
            let errorMessage = 'Erro desconhecido ao enviar os dados';

            if (response.status === 400) {
                errorMessage = 'Requisição inválida. Verifique os dados enviados.';
            } else if (response.status === 401) {
                errorMessage = 'Não autorizado. Verifique suas credenciais.';
            } else if (response.status === 403) {
                errorMessage = 'Acesso negado.';
            } else if (response.status === 404) {
                errorMessage = 'Recurso não encontrado. Verifique a URL.';
            } else if (response.status === 500) {
                errorMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
            }

            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || errorMessage);
        }

        return await response.json(); // Retorna os dados da API
    } catch (error) {
        console.error('Erro na requisição:', error);

        // Tratamento para erros de conexão ou problemas inesperados
        throw new Error('Falha na comunicação com o servidor. Tente novamente.');
    }
};

    export const deleteData = async(data:any, url:string) => {
        const response = await fetch(`/api/${url}`,{
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