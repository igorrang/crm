export const getData = async (url: string) => {
    const response = await fetch(`/api/${url}`,{
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
    const response = await fetch (`/api/${url}`,{
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
    const response = await fetch (`/api/${url}`,{
        method: 'LIST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

    export const postData = async(data:any , url:string) => {
        const response = await fetch(`/api/${url}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to post data')
        }
        return response.json()
    }

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